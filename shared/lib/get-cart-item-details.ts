import { Ingredient } from "@prisma/client";
import { PizzaType, PizzaSize, mapPizzaType } from "../constants/pizza";

export const getCartItemDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: Ingredient[],
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
