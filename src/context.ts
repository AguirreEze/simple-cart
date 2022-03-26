import { createContext } from "react";

import { CartItemType, ProductType } from "./types";

interface Icontext {
  cart: CartItemType[];
  setCart: (value: CartItemType[]) => void;
}

export const CartContext = createContext<Icontext>({
  cart: [],
  setCart: () => {},
});

const updateCartPoduct = (
  cartItem: CartItemType,
  operation: "add" | "less"
): CartItemType => {
  operation === "add" ? cartItem.cant++ : cartItem.cant--;

  return cartItem;
};

export const addItemToCart = (cart: CartItemType[], product: ProductType) => {
  const productOnCart = cart.find((elem) => elem.product === product);
  let updatedCart;

  !!productOnCart
    ? (updatedCart = cart.map((elem) =>
        elem.product === product ? updateCartPoduct(elem, "add") : elem
      ))
    : (updatedCart = [...cart, { product, cant: 1 }]);

  return updatedCart;
};

export const removeItemFromCart = (
  cart: CartItemType[],
  product: ProductType
) => {
  const productOnCart = cart.find((elem) => elem.product === product);
  let updatedCart;

  productOnCart?.cant === 1
    ? (updatedCart = cart.filter((elem) => elem.product !== product))
    : (updatedCart = cart.map((elem) =>
        elem.product === product ? updateCartPoduct(elem, "less") : elem
      ));

  return updatedCart;
};
