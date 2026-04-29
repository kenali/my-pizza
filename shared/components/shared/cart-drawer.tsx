"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";

interface Props {
  children: ReactNode;
  className?: string;
}

export const CartDrawer = ({ children, className }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={"/assets/pizzas/pepperoni-fresh.webp"}
              details={getCartItemDetails(2, 30, [
                { name: "Цыпленок" },
                { name: "Сыр" },
              ])}
              name={"Чоризо фреш"}
              price={419}
              quantity={1}
            />
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">500 ₴</span>
            </div>
            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
