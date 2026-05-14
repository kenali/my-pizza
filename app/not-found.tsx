import Image from "next/image";
import Link from "next/link";
import { Container, Header } from "@/shared/components/shared";

export const dynamic = 'force-dynamic'; 

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <Container className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <Image
          src="/assets/images/not-found.png"
          alt="Страница не найдена"
          width={300}
          height={300}
          priority
        />

        <h1 className="mt-6 text-3xl font-bold">Страница не найдена</h1>
        <p className="mt-2 max-w-[420px] text-gray-500">
          Такой страницы не существует или она была удалена
        </p>

        <Link
          href="/"
          className="mt-6 rounded-md bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Вернуться на главную
        </Link>
      </Container>
    </main>
  );
}
