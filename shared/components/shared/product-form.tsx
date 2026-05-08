"use client";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { useRouter } from "next/navigation";

interface Props {
  product: ProductWithRelations;
  onClose?: VoidFunction;
}

export const ProductForm = ({ product, onClose }: Props) => {
  const router = useRouter();
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId: number, ingredients?: number[]) => {
    try {
      await addCartItem({
        productItemId,
        ingredients,
      });
      toast.success(`${product.name} успешно добавлена в корзину`);
      onClose?.();
    } catch (error) {
      console.error(error);
      toast.error(`${product.name} Не удалось добавить в корзину`);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        name={product.name}
        imageUrl={product.imageUrl}
        ingredients={product.ingredients}
        items={product.items}
        loading={loading}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <ChooseProductForm
      name={product.name}
      imageUrl={product.imageUrl}
      price={firstItem.price}
      loading={loading}
      onSubmit={() => onSubmit(firstItem.id)}
    />
  );
};
