"use client";
import { cn } from "@/shared/lib/utils";
import { ProductWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/shared/components/ui";
import { ProductForm } from "..";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className,
        )}
      >
        <ProductForm product={product} onClose={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
