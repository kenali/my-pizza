import { Header } from "@/shared/components/shared";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Pizza",
  description:
    "Welcome to My Pizza - Order delicious pizzas online. Fresh ingredients, fast delivery, and great deals on your favorite pizzas.",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
