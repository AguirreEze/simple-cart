import { useEffect, useState } from "react";

import api from "./api";
import Product from "./components/Product";
import { ProductType, CartItemType } from "./types";
import styles from "./styles.module.scss";
import { CartContext } from "./context";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<CartItemType[]>([]);

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
      <CartContext.Provider value={{ cart, setCart }}>
        <section className={styles.stand}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </section>
      </CartContext.Provider>
      <aside className={styles.cart}>
        <button>
          {cart.length} productos (total: ${getFinalPrice(cart)})
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
