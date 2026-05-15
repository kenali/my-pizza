"use server";
import prisma from "@/prisma/prisma-client";
import {
  PayOrderTemplate,
  VerificationUserTemplate,
} from "@/shared/components";
import { CheckoutFormValues } from "@/shared/constants";
import { sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { stripe } from "@/shared/lib/stripe";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { cookies } from "next/headers";

export const createOrder = async (data: CheckoutFormValues) => {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    // 1. Find cart
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

    // 2. Create order in DB
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

    // 3. Create payment session in Stripe
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
      "My Pizza / Pay for order #" + order.id,
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

export const updateUserInfo = async (body: Prisma.UserUpdateInput) => {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.log("Error [UPDATE_USER]", error);
    throw error;
  }
};

export const registerUser = async (body: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Email not verified");
      }

      throw new Error("User already exists");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "My Pizza / 📝 Registration confirmation",
      VerificationUserTemplate({
        code,
      }),
    );
  } catch (err) {
    console.log("Error [CREATE_USER]", err);
    throw err;
  }
};
