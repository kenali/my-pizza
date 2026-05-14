import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma-client";
import { stripe } from "@/shared/lib/stripe";
import Stripe from "stripe";
import { OrderStatus } from "@prisma/client";
import { sendEmail } from "@/shared/lib";
import { OrderSuccessTemplate } from "@/shared/components";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") as string;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {

        const order = await prisma.order.update({
          where: { id: Number(orderId) },
          data: {
            status: OrderStatus.SUCCEEDED,
          },
        });

       await sendEmail(
          order.email,
          "My Pizza / Заказ успешно оплачен! 🎉",
          OrderSuccessTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
          }),
        );
      }

    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[WebHook Error]", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 },
    );
  }
}
