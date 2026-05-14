"use client";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <>
      <NextTopLoader />
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </>
  );
};
