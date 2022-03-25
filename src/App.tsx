import { useEffect, useState } from "react";

import api from "./api";
import Product from "./components/Product";
import { ProductType } from "./types";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  return (
    <main>
      <header>Estampitiency</header>
      <section>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>
      <aside>
        <button>3 productos (total: $12)</button>
      </aside>
      <footer>
        Encontrá la consigna de este ejercicio y otros más{" "}
        <a href="https://github.com/goncy/interview-challenges/tree/main/simple-cart">
          acá
        </a>
      </footer>
    </main>
  );
}

export default App;
