'use client'
import { cn } from "@/shared/lib/utils";
import { User } from "lucide-react";
import { Container, SearchInput } from ".";
import { Button } from "../ui";
import Link from "next/link";
import Image from "next/image";
import { CartButton } from "./cart-button";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header = ({
  className,
  hasSearch = true,
  hasCart = true,
}: Props) => {
  const searchParams = useSearchParams()

useEffect(() => {
  if (searchParams.has('id')) { 
    toast.success('Заказ успешно оформлен! 🍕', {
      duration: 5000,
    });
  }
}, [searchParams]);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href={"/"}>
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text 2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {/* Средняя часть */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
