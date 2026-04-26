import { cn } from "@/shared/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { pizaTypes, pizzaSizes } from "@/shared/constants/pizza";

interface Props {
  imageUrl: string;
  name: string;
  items: ProductItem[];
  ingredients: Ingredient[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm = ({
  name,
  imageUrl,
  ingredients,
  items,
  onClickAdd,
  className,
}: Props) => {
  const textDetails = "30см, традиционное тесто 30";
  const price = 350;
  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={20} />

      <div className="w-[490px] bg-[#F7F6F5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <GroupVariants items={pizaTypes} />
        <GroupVariants items={pizzaSizes} />

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {price}
        </Button>
      </div>
    </div>
  );
};
