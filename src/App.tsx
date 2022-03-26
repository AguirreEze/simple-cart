import { useEffect, useReducer, useState } from "react";

import api from "./api";
import Product from "./components/Product";
import { ProductType, CartItemType } from "./types";
import styles from "./styles.module.scss";
import { CartContext, reducer } from "./context";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [state, dispatch] = useReducer(reducer, { cart: [] });

  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  const getFinalPrice = (cart: CartItemType[]): number => {
    return !cart.length
      ? 0
      : cart
          .map((elem) => elem.product.price * elem.cant)
          .reduce((a, b) => a + b);
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>Estampitiency</header>
      <CartContext.Provider value={{ state, dispatch }}>
        <section className={styles.stand}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </section>
      </CartContext.Provider>
      <aside className={styles.cart}>
        <button>
          {state.cart.length} productos (total: ${getFinalPrice(state.cart)})
        </button>
      </aside>
      <footer className={styles.footer}>
        Encontrá la consigna de este ejercicio y otros más{" "}
        <a href="https://github.com/goncy/interview-challenges/tree/main/simple-cart">
          acá
        </a>
      </footer>
    </main>
  );
}

export default App;
