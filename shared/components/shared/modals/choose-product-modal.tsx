"use client";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { ProductWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/shared/components/ui";
import { ChooseProductForm } from "../choose-product-form";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onSubmit = async (productItemId: number, ingredients?: number[]) => {
    try {
      await addCartItem({
        productItemId,
        ingredients,
      });
      toast.success(`${product.name} успешно добавлена в корзину`);
      router.back()
    } catch (error) {
      console.error(error);
      toast.error(`${product.name} Не удалось добавить в корзину`);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className,
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            name={product.name}
            imageUrl={product.imageUrl}
            ingredients={product.ingredients}
            items={product.items}
            loading={loading}
            onSubmit={onSubmit}
          />
        ) : (
          <ChooseProductForm
            name={product.name}
            imageUrl={product.imageUrl}
            price={firstItem.price}
            loading={loading}
            onSubmit={() => onSubmit(firstItem.id)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
