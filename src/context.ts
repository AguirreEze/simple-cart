import { createContext } from "react";

import { CartItemType, ProductType } from "./types";

interface ActionType {
  type: "addToCart" | "removeFromCart";
  payload: ProductType;
}

interface StateType {
  cart: CartItemType[];
}

interface Icontext {
  state: { cart: CartItemType[] };
  dispatch: (action: ActionType) => void;
}

export const CartContext = createContext<Icontext>({
  state: { cart: [] },
  dispatch: () => {},
});

const updateCartPoduct = (
  cartItem: CartItemType,
  operation: "add" | "less"
): CartItemType => {
  operation === "add" ? cartItem.cant++ : cartItem.cant--;

  return cartItem;
};

const addItemToCart = (cart: CartItemType[], product: ProductType) => {
  const productOnCart = cart.find((elem) => elem.product === product);
  let updatedCart;

  !!productOnCart
    ? (updatedCart = cart.map((elem) =>
        elem.product === product ? updateCartPoduct(elem, "add") : elem
      ))
    : (updatedCart = [...cart, { product, cant: 1 }]);

  return updatedCart;
};

const removeItemFromCart = (cart: CartItemType[], product: ProductType) => {
  const productOnCart = cart.find((elem) => elem.product === product);
  let updatedCart;

  productOnCart?.cant === 1
    ? (updatedCart = cart.filter((elem) => elem.product !== product))
    : (updatedCart = cart.map((elem) =>
        elem.product === product ? updateCartPoduct(elem, "less") : elem
      ));

  return updatedCart;
};

export function reducer(state: StateType, action: ActionType) {
  if (action.type === "addToCart") {
    return { cart: addItemToCart(state.cart, action.payload) };
  }
  if (action.type === "removeFromCart") {
    return { cart: removeItemFromCart(state.cart, action.payload) };
  }

  return state;
}
