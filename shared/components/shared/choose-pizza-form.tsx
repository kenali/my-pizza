"use client";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { IngredientItem } from "./ingredient-item";
import {
  pizzaTypes,
  pizzaSizes,
  PizzaSize,
  PizzaType,
  mapPizzaType,
} from "@/shared/constants/pizza";
import { useSet } from "react-use";

interface Props {
  imageUrl: string;
  name: string;
  items: ProductItem[];
  ingredients: Ingredient[];
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm = ({
  name,
  imageUrl,
  ingredients,
  items,
  onClickAddCart,
  className,
}: Props) => {
  const [size, setSizes] = useState<PizzaSize>(20);
  const [type, setTypes] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle }] = useSet<number>(new Set([]));
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;
  console.log("my items", items);
  console.log("my si", pizzaSizes);

  const pizzaPrice = items.find(
    (item) => item.size === size && item.pizzaType === type,
  )!.price;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;


  const handleClickAdd = () => {
    onClickAddCart?.();
    console.log({ size, type, ingredients: selectedIngredients });
  };


const availablePizzas = items.filter((item) => item.pizzaType === type);
const availablePizzaSizes = pizzaSizes.map((item) => ({
  name: item.name,
  value: item.value,
  disabled: !availablePizzas.some((pizza) => Number(pizza.size) === Number(item.value))
}))

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#F7F6F5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={(value) => setSizes(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setTypes(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => toggle(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button onClick={handleClickAdd} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};
