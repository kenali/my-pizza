import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";
import qs from "qs";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      sizes: Array.from(filters.sizes),
      pizzaTypes: Array.from(filters.pizzaTypes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, { arrayFormat: "comma" });

    router.replace(`?${query}`, { scroll: false });
  }, [filters, router]);
};
