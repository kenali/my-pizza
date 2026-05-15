export const categories = [
  {
    name: "Pizzas",
  },
  {
    name: "Breakfast",
  },
  {
    name: "Snacks",
  },
  {
    name: "Milkshakes",
  },
  {
    name: "Drinks",
  },
];

export const _ingredients = [
  {
    name: "Cheese Crust",
    price: 179,
    imageUrl: "/assets/ingredients/cheese-crust.png",
  },
  {
    name: "Creamy Mozzarella",
    price: 79,
    imageUrl: "/assets/ingredients/creamy-mozzarella.png",
  },
  {
    name: "Cheddar and Parmesan Cheeses",
    price: 79,
    imageUrl: "/assets/ingredients/cheddar-and-parmesan-cheeses.png",
  },
  {
    name: "Spicy Jalapeño Pepper",
    price: 59,
    imageUrl: "/assets/ingredients/spicy-jalapeno-pepper.png",
  },
  {
    name: "Tender Chicken",
    price: 79,
    imageUrl: "/assets/ingredients/tender-chicken.png",
  },
  {
    name: "Champignons",
    price: 59,
    imageUrl: "/assets/ingredients/champignons.png",
  },
  {
    name: "Ham",
    price: 79,
    imageUrl: "/assets/ingredients/ham.png",
  },
  {
    name: "Spicy Pepperoni",
    price: 79,
    imageUrl: "/assets/ingredients/spicy-pepperoni.png",
  },
  {
    name: "Spicy Chorizo",
    price: 79,
    imageUrl: "/assets/ingredients/spicy-chorizo.png",
  },
  {
    name: "Pickled Cucumbers",
    price: 59,
    imageUrl: "/assets/ingredients/pickled-cucumbers.png",
  },
  {
    name: "Fresh Tomatoes",
    price: 59,
    imageUrl: "/assets/ingredients/fresh-tomatoes.png",
  },
  {
    name: "Red Onion",
    price: 59,
    imageUrl: "/assets/ingredients/red-onion.png",
  },
  {
    name: "Juicy Pineapple",
    price: 59,
    imageUrl: "/assets/ingredients/juicy-pineapple.png",
  },
  {
    name: "Italian Herbs",
    price: 39,
    imageUrl: "/assets/ingredients/italian-herbs.png",
  },
  {
    name: "Sweet Pepper",
    price: 59,
    imageUrl: "/assets/ingredients/sweet-pepper.png",
  },
  {
    name: "Bryndza Cubes",
    price: 79,
    imageUrl: "/assets/ingredients/bryndza-cubes.png",
  },
  {
    name: "Meatballs",
    price: 79,
    imageUrl: "/assets/ingredients/meatballs.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: "Omelette with Ham and Mushrooms",
    imageUrl: "/assets/products/omelette-with-ham-and-mushrooms.webp",
    categoryId: 2,
  },
  {
    name: "Omelette with Pepperoni",
    imageUrl: "/assets/products/omelette-with-pepperoni.webp",
    categoryId: 2,
  },
  {
    name: "Coffee Latte",
    imageUrl: "/assets/products/coffee-latte.webp",
    categoryId: 2,
  },
  {
    name: "Ham and Cheese Sandwich",
    imageUrl: "/assets/products/sandwich-with-ham-and-cheese.webp",
    categoryId: 3,
  },
  {
    name: "Chicken Nuggets",
    imageUrl: "/assets/products/chicken-nuggets.webp",
    categoryId: 3,
  },
  {
    name: "Oven-Baked Potatoes with Sauce 🌱",
    imageUrl: "/assets/products/oven-baked-potatoes-with-sauce.webp",
    categoryId: 3,
  },
  {
    name: "Dodster",
    imageUrl: "/assets/products/dodster.webp",
    categoryId: 3,
  },
  {
    name: "Spicy Dodster 🌶️🌶️",
    imageUrl: "/assets/products/spicy-dodster.webp",
    categoryId: 3,
  },
  {
    name: "Banana Milkshake",
    imageUrl: "/assets/products/banana-milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Caramel Apple Milkshake",
    imageUrl: "/assets/products/caramel-apple-milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Oreo Milkshake",
    imageUrl: "/assets/products/oreo-milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Classic Milkshake 👶",
    imageUrl: "/assets/products/classic-milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Irish Cappuccino",
    imageUrl: "/assets/products/irish-cappuccino.webp",
    categoryId: 5,
  },
  {
    name: "Caramel Cappuccino",
    imageUrl: "/assets/products/caramel-cappuccino.webp",
    categoryId: 5,
  },
  {
    name: "Coconut Latte",
    imageUrl: "/assets/products/coconut-latte.webp",
    categoryId: 5,
  },
  {
    name: "Americano",
    imageUrl: "/assets/products/americano.webp",
    categoryId: 5,
  },
];
