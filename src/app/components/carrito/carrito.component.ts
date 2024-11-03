import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../types';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component'; // Importa el componente
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ProductCardComponent,
    FormsModule
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {
  productosCarrito: CartItem[] = [];
  total: number = 0;

  constructor(
    private carritoService: CarritoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.productosCarrito = this.carritoService.getItems();
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.carritoService.getTotal();
  }

  eliminarProducto(productoSKU: string) {
    const productoEnCarrito = this.productosCarrito.find(p => p.product.SKU === productoSKU);
    
    if (productoEnCarrito && productoEnCarrito.quantity === 1) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Al eliminar este producto, se quitará del carrito.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.carritoService.removeProduct(productoSKU);
          this.productosCarrito = this.carritoService.getItems();
          this.calcularTotal();
        }
      });
    } else {
      this.carritoService.removeProduct(productoSKU);
      this.productosCarrito = this.carritoService.getItems();
      this.calcularTotal();
    }
  }
  
  vaciarCarrito() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Estás a punto de vaciar el carrito!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar carrito',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.clearCart();
        this.productosCarrito = this.carritoService.getItems();
        this.calcularTotal();
        Swal.fire(
          'Carrito vaciado',
          'Tu carrito ha sido vaciado con éxito.',
          'success'
        );
        this.route.navigate(['/']);
      }
    });
  }
  
  actualizarCantidad(item: CartItem) {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    this.calcularTotal();
  }

  // Validar que el input de cantidad solo acepte números enteros, si pruebas - X, resetea el input. Se podria poner que si es numero negativo elimine el producto del carrito. Dependera de como el cliente quiera que se comporte.
  validarNumero(event: KeyboardEvent) {
    const caracteresValidos = /^[0-9]*$/;
    const char = String.fromCharCode(event.keyCode);
    
    if (!caracteresValidos.test(char)) {
      event.preventDefault();
    }
  }

  finalizarCompra() {
    Swal.fire({
      title: '¡Gracias por tu compra!',
      text: `Tu compra ha sido realizada con éxito. Total pagado: ${this.total.toFixed(2)} €`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.clearCart();
        this.productosCarrito = this.carritoService.getItems();
        this.calcularTotal();
        this.route.navigate(['/']);
      }
    });
  }
  

  getTotalByProduct(item: CartItem): number {
    return this.carritoService.getTotalByProduct(item);
  }  
  
}
