import { useContext } from "react";

import { CartContext } from "../../context";
import { ProductType } from "../../types";

import styles from "./styles.module.scss";

interface Iprops {
  product: ProductType;
}

export default function Product({ product }: Iprops) {
  const context = useContext(CartContext);

  const handleRemove = () => {
    context.dispatch({ type: "removeFromCart", payload: product });
  };

  const handleAdd = () => {
    context.dispatch({ type: "addToCart", payload: product });
  };

  return (
    <article className={styles.container}>
      <img className={styles.image} src={product.image} />
      <div className={styles.info}>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.description}>{product.description}</p>
      </div>
      {context.state.cart.find((elem) => elem.product === product) ? (
        <div className={styles.botonera}>
          <button className={styles.button} onClick={handleRemove}>
            -
          </button>
          <span className={styles.counter}>
            {context.state.cart.find((elem) => elem.product === product)?.cant}
          </span>
          <button className={styles.button} onClick={handleAdd}>
            +
          </button>
        </div>
      ) : (
        <button className={styles.button} onClick={handleAdd}>
          Agregar
        </button>
      )}
    </article>
  );
}
