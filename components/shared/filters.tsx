"use client";
import { useEffect, useState } from "react";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { Input } from "../ui";
import { Title, RangeSlider, CheckboxFiltersGroup } from "./";
import { useSet } from "react-use";
import { useRouter } from "next/navigation";
import qs from "qs";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export const Filters = ({ className }: Props) => {
  const router = useRouter()
  const { ingredients, loading, selectedIngredients, onAddId } =
    useFilterIngredients();
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>([]),
  );
  const [{ priceFrom, priceTo }, SetPrice] = useState<PriceProps>({});

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    SetPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filter = {
      priceFrom,
      priceTo,
      sizes: Array.from(sizes),
      pizzaTypes: Array.from(pizzaTypes),
      ingredients: Array.from(selectedIngredients),
    };

    const query = qs.stringify(filter, { arrayFormat: "comma" });
    router.replace(`?${query}`, { scroll: false })

  }, [priceFrom, priceTo, sizes, pizzaTypes, selectedIngredients,router]);

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}

      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        selected={pizzaTypes}
        onClickCheckbox={togglePizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        selected={sizes}
        onClickCheckbox={toggleSizes}
        items={[
          { text: "20см", value: "20" },
          { text: "30см", value: "30" },
          { text: "40см", value: "40" },
        ]}
      />

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(priceFrom)}
            onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(priceTo)}
            onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[priceFrom || 0, priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) =>
            SetPrice({ priceFrom, priceTo })
          }
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингридиенты"
        name="ingridients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
      />
    </div>
  );
};
