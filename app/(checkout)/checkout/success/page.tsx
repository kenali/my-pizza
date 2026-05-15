import prisma from "@/prisma/prisma-client";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const cartToken = cookies().get("cartToken")?.value;

  if (!searchParams.id || !cartToken) {
    return redirect("/");
  }

  // Check that the order with this ID belongs to the user with this cartToken
  const order = await prisma.order.findFirst({
    where: {
      id: Number(searchParams.id),
      token: cartToken,
    },
  });

  if (!order) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-3xl font-bold">Order #{order.id} paid! 🍕</h1>
      <p className="text-gray-500 mt-2">
        Your order is being prepared. Please wait for the courier call.
      </p>
    </div>
  );
}
