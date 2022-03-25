import { createContext } from "react";

import { CartItemType } from "./types";

interface Icontext {
  cart: CartItemType[];
  setCart: (value: CartItemType[]) => void;
}

export const CartContext = createContext<Icontext>({
  cart: [],
  setCart: () => {},
});
