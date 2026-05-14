import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow"; // Обязательно импортируем shallow
import { useCartStore } from "../store";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
};

export const useCart = (): ReturnProps => {
  const { fetchCartItems, ...cartState } = useCartStore(
    useShallow((state) => ({
      totalAmount: state.totalAmount,
      items: state.items,
      loading: state.loading,
      updateItemQuantity: state.updateItemQuantity,
      removeCartItem: state.removeCartItem,
      addCartItem: state.addCartItem,
      fetchCartItems: state.fetchCartItems,
    })),
  );

  useEffect(() => {
      fetchCartItems();
  }, [fetchCartItems]);

  return cartState;
};
