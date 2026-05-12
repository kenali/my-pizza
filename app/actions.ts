"use server";
import prisma from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components";
import { CheckoutFormValues } from "@/shared/constants";
import { sendEmail } from "@/shared/lib";
import { stripe } from "@/shared/lib/stripe";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export const createOrder = async (data: CheckoutFormValues) => {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    // 1. Ищем корзину
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("UserCart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    // 2. Создаем заказ в БД
    const order = await prisma.order.create({
      data: {
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
        token: cartToken,
        paymentId: "",
      },
    });

    // 3. Создаем сессию оплаты в Stripe
    const session = await stripe.checkout.sessions.create({
      metadata: {
        orderId: order.id,
      },
      line_items: userCart.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productItem.product.name,
          },
          unit_amount: item.productItem.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?id=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout?error=payment_cancelled`,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: session.id },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    await sendEmail(
      data.email,
      "My Pizza / Оплатите заказ #" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: session.url || "",
      }),
    );

    return session.url;
  } catch (error) {
    console.log("[CreateOrder] Server error", error);
    throw error;
  }
};
