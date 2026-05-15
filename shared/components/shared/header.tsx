"use client";
import { cn } from "@/shared/lib/utils";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthModal, Container, ProfileButton, SearchInput } from ".";
import { CartButton } from "./cart-button";

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
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Order paid successfully! Information sent to email 🍕";
    }
    if (searchParams.has("verified")) {
      toastMessage = "Email verified successfully! 🍕";
    }

    // 1. Declare variable in the common scope of the hook
    let timer: NodeJS.Timeout | undefined;

    if (toastMessage) {
      timer = setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, { duration: 3000 });
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchParams, router]);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <Link href={"/"}>
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text 2xl uppercase font-black">My Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                tastier than ever
              </p>
            </div>
          </div>
        </Link>

        {/* Middle side */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
