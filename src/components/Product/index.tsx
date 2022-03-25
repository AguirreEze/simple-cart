import { ProductType } from "../../types";

import styles from "./styles.module.scss";

interface Iprops {
  product: ProductType;
}

export default function Product({ product }: Iprops) {
  return (
    <article className={styles.container}>
      <img className={styles.image} src={product.image} />
      <div className={styles.info}>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.description}>{product.description}</p>
      </div>
      <button className={styles.button}>Agregar</button>
    </article>
  );
}
