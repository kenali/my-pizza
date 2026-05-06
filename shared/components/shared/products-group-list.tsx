"use client";

import React, { useEffect } from "react";
import { useIntersection } from "react-use";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/shared/store";

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  listClassName?: string;
  className?: string;
}

export const ProductsGroupList = ({
  title,
  items,
  categoryId,
  listClassName,
  className,
}: Props) => {
  const setActiveCategoryid = useCategoryStore((s) => s.setActiveId);

  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryid(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryid, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
