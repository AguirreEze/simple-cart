export interface ProductType {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface CartItemType {
  product: ProductType;
  cant: number;
}
