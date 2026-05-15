"use client";
import { Input } from "../ui";
import { Title, RangeSlider, CheckboxFiltersGroup } from ".";
import { useFilters, useIngredients, useQueryFilters } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters = ({ className }: Props) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      {/* Top checkboxes */}

      <CheckboxFiltersGroup
        title="Dough type"
        name="pizzaTypes"
        className="mb-5"
        selected={filters.pizzaTypes}
        onClickCheckbox={filters.setPizzaTypes}
        items={[
          { text: "Thin", value: "1" },
          { text: "Traditional", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Sizes"
        name="sizes"
        className="mb-5"
        selected={filters.sizes}
        onClickCheckbox={filters.setSizes}
        items={[
          { text: "20cm", value: "20" },
          { text: "30cm", value: "30" },
          { text: "40cm", value: "40" },
        ]}
      />

      {/* Price filters */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from and to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ingredients"
        name="ingridients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
