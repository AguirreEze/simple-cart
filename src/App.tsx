import { useEffect, useState } from "react";

import api from "./api";
import Product from "./components/Product";
import { ProductType } from "./types";
import styles from "./styles.module.scss";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  return (
    <main className={styles.main}>
      <header className={styles.main}>Estampitiency</header>
      <section className={styles.stand}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>
      <aside className={styles.cart}>
        <button>3 productos (total: $12)</button>
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
