export const categories = [
  {
    name: "Пиццы",
  },
  {
    name: "Завтрак",
  },
  {
    name: "Закуски",
  },
  {
    name: "Коктейли",
  },
  {
    name: "Напитки",
  },
];

export const _ingredients = [
  {
    name: "Сырный бортик",
    price: 179,
    imageUrl:
      '/assets/ingredients/cheese-crust.png',
  },
  {
    name: "Сливочная моцарелла",
    price: 79,
    imageUrl:
      "/assets/ingredients/creamy-mozzarella.png",
  },
  {
    name: "Сыры чеддер и пармезан",
    price: 79,
    imageUrl:
      "/assets/ingredients/cheddar-and-parmesan-cheeses.png",
  },
  {
    name: "Острый перец халапеньо",
    price: 59,
    imageUrl:
      "/assets/ingredients/spicy-jalapeno-pepper.png",
  },
  {
    name: "Нежный цыпленок",
    price: 79,
    imageUrl:
      "/assets/ingredients/tender-chicken.png",
  },
  {
    name: "Шампиньоны",
    price: 59,
    imageUrl:
      "/assets/ingredients/champignons.png",
  },
  {
    name: "Ветчина",
    price: 79,
    imageUrl:
      "/assets/ingredients/ham.png",
  },
  {
    name: "Пикантная пепперони",
    price: 79,
    imageUrl:
      "/assets/ingredients/spicy-pepperoni.png",
  },
  {
    name: "Острая чоризо",
    price: 79,
    imageUrl:
      "/assets/ingredients/spicy-chorizo.png",
  },
  {
    name: "Маринованные огурчики",
    price: 59,
    imageUrl:
      "/assets/ingredients/pickled-cucumbers.png",
  },
  {
    name: "Свежие томаты",
    price: 59,
    imageUrl:
      "/assets/ingredients/fresh-tomatoes.png",
  },
  {
    name: "Красный лук",
    price: 59,
    imageUrl:
      "/assets/ingredients/red-onion.png",
  },
  {
    name: "Сочные ананасы",
    price: 59,
    imageUrl:
      "/assets/ingredients/juicy-pineapple.png",
  },
  {
    name: "Итальянские травы",
    price: 39,
    imageUrl:
      "/assets/ingredients/italian-herbs.png",
  },
  {
    name: "Сладкий перец",
    price: 59,
    imageUrl:
      "/assets/ingredients/sweet-pepper.png",
  },
  {
    name: "Кубики брынзы",
    price: 79,
    imageUrl:
      "/assets/ingredients/bryndza-cubes.png",
  },
  {
    name: "Митболы",
    price: 79,
    imageUrl:
      "/assets/ingredients/meatballs.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: "Омлет с ветчиной и грибами",
    imageUrl:
      "/assets/products/omelette-with-ham-and-mushrooms.webp",
    categoryId: 2,
  },
  {
    name: "Омлет с пепперони",
    imageUrl:
      "/assets/products/omelette-with-pepperoni.webp",
    categoryId: 2,
  },
  {
    name: "Кофе Латте",
    imageUrl:
      "/assets/products/coffee-latte.webp",
    categoryId: 2,
  },
  {
    name: "Дэнвич ветчина и сыр",
    imageUrl:
      "/assets/products/sandwich-with-ham-and-cheese.webp",
    categoryId: 3,
  },
  {
    name: "Куриные наггетсы",
    imageUrl:
      "/assets/products/chicken-nuggets.webp",
    categoryId: 3,
  },
  {
    name: "Картофель из печи с соусом 🌱",
    imageUrl:
      "/assets/products/oven-baked-potatoes-with-sauce.webp",
    categoryId: 3,
  },
  {
    name: "Додстер",
    imageUrl:
      "/assets/products/dodster.webp",
    categoryId: 3,
  },
  {
    name: "Острый Додстер 🌶️🌶️",
    imageUrl:
      "/assets/products/spicy-dodster.webp",
    categoryId: 3,
  },
  {
    name: "Банановый молочный коктейль",
    imageUrl:
      "/assets/products/banana-milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Карамельное яблоко молочный коктейль",
    imageUrl:
      "/assets/products/caramel-apple-milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Молочный коктейль с печеньем Орео",
    imageUrl:
      "/assets/products/oreo-milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Классический молочный коктейль 👶",
    imageUrl:
      "/assets/products/classic-milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Ирландский Капучино",
    imageUrl:
      "/assets/products/irish-cappuccino.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Карамельный капучино",
    imageUrl:
      "/assets/products/caramel-cappuccino.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Кокосовый латте",
    imageUrl:
      "/assets/products/coconut-latte.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Американо",
    imageUrl:
      "/assets/products/americano.webp",
    categoryId: 5,
  },
];
