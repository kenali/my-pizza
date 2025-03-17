import { Title, Container } from "@/components/shared";
import { Categories } from "@/components/shared/categories";

export default function Home() {
  return (
    <>
      <Container className="mb-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
        <Categories />
      </Container>
    </>
  );
}
