import prisma from "@/prisma/prisma-client";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";

import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) return NextResponse.json({ totalAmount: 0, items: [] });

    const userCart = await prisma.cart.findFirst({
      where: { token },
      include: {
        items: {
          orderBy: { createdAt: "desc" },
          include: {
            productItem: { include: { product: true } },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log("[CART_GET] Server error", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);
    const data = (await req.json()) as CreateCartItemValues;

    // 1. Ищем все товары в корзине с таким же ID вариации (пиццы)
    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        ingredients: true,
      },
    });

    // 2. Find among them the one whose set of ingredients exactly matches data.ingredients
    const findCartItem = cartItems.find((item) => {
      const itemIngredientIds = item.ingredients.map((i) => i.id);

      // Если количество ингредиентов разное — это разные товары
      if (itemIngredientIds.length !== (data.ingredients?.length || 0)) {
        return false;
      }

      // Если количество совпадает, проверяем, что все ID из data.ingredients есть в товаре
      return (
        data.ingredients?.every((id) => itemIngredientIds.includes(id)) ?? true
      );
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: { quantity: findCartItem.quantity + 1 },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map((id) => ({ id })),
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);

    resp.cookies.set("cartToken", token);

    return resp;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json(
      { message: "Failed to create cart" },
      { status: 500 },
    );
  }
}
