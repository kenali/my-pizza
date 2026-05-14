import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";
import qs from "qs";

export const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMounted) {
      const params = {
        ...filters.prices,
        sizes: Array.from(filters.sizes),
        pizzaTypes: Array.from(filters.pizzaTypes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, { arrayFormat: "comma" });

      router.replace(`?${query}`, { scroll: false });
    }
  }, [filters]);
};
