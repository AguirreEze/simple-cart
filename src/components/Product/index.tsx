import { useContext } from "react";

import { CartContext } from "../../context";
import { ProductType, CartItemType } from "../../types";

import styles from "./styles.module.scss";

interface Iprops {
  product: ProductType;
}

export default function Product({ product }: Iprops) {
  const context = useContext(CartContext);

  const addProductToCart = () => {
    context.setCart([...context.cart, { product, cant: 1 }]);
  };

  const updateCartPoduct = (
    cartItem: CartItemType,
    operation: "add" | "less"
  ): CartItemType => {
    operation === "add" ? cartItem.cant++ : cartItem.cant--;

    return cartItem;
  };

  const decreseProductCant = () => {
    const productOnCart = context.cart.find((elem) => elem.product === product);
    let updatedCart;

    productOnCart?.cant === 1
      ? (updatedCart = context.cart.filter((elem) => elem.product !== product))
      : (updatedCart = context.cart.map((elem) =>
          elem.product === product ? updateCartPoduct(elem, "less") : elem
        ));
    context.setCart(updatedCart);
  };

  const increseProductCant = () => {
    const updatedCart = context.cart.map((elem) =>
      elem.product === product ? updateCartPoduct(elem, "add") : elem
    );

    context.setCart(updatedCart);
  };

  return (
    <article className={styles.container}>
      <img className={styles.image} src={product.image} />
      <div className={styles.info}>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.description}>{product.description}</p>
      </div>
      {context.cart.find((elem) => elem.product === product) ? (
        <div className={styles.botonera}>
          <button className={styles.button} onClick={decreseProductCant}>
            -
          </button>
          <span className={styles.counter}>
            {context.cart.find((elem) => elem.product === product)?.cant}
          </span>
          <button className={styles.button} onClick={increseProductCant}>
            +
          </button>
        </div>
      ) : (
        <button className={styles.button} onClick={addProductToCart}>
          Agregar
        </button>
      )}
    </article>
  );
}
