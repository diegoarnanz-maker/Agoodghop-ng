import { Injectable } from '@angular/core';
import { CartItem, Producto } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private productosEnCarrito: CartItem[] = [];

  addProduct(product: Producto, quantity: number = 1) {
    const producToAdd = this.productosEnCarrito.find(p => p.product.SKU === product.SKU);

    if (producToAdd) {
      producToAdd.quantity += quantity;
    } else {
      this.productosEnCarrito.push({ product, quantity });
    }
  }

  removeProduct(productSKU: string) {
    const productoToDelete = this.productosEnCarrito.find(p => p.product.SKU === productSKU);
  
    if (productoToDelete) {
      if (productoToDelete.quantity > 1) {
        productoToDelete.quantity--;
      } else {
        this.productosEnCarrito = this.productosEnCarrito.filter(item => item.product.SKU !== productSKU);
      }
    }
  }

  clearCart() {
    this.productosEnCarrito = [];
  }

  getTotal() {
    return this.productosEnCarrito.reduce((total, item) => total + parseFloat(item.product.price) * item.quantity, 0);
  }

  getItems() {
    return this.productosEnCarrito;
  }

  getTotalByProduct(products: CartItem) {
    const price = Number(products.product.price);
    return price * products.quantity;
  }

}
