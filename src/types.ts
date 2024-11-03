export interface Producto {
  SKU: string;
  title: string;
  price: string;
}

export interface CartItem {
  product: Producto;
  quantity: number;
}
