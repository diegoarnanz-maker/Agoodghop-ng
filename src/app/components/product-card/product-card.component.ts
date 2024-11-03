import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../../types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  // Recibe un producto como input
  @Input() producto!: Producto;
  
  // Envia a padre el producto al hacer click en el botón
  @Output() addToCart = new EventEmitter<{
    producto: Producto;
    cantidad: number;
  }>();

  cantidad: number = 1;
  errorMensaje: string = '';

  constructor(private router: Router) { }

  agregarAlCarrito() {
    // Validar la cantidad antes de emitir el evento, se podria hacer en el backend
    if (this.cantidad < 1) {
      this.errorMensaje = 'La cantidad debe ser al menos 1.';
      this.cantidad = 1;
      return;
    }
    
    this.errorMensaje = '';
    this.addToCart.emit({ producto: this.producto, cantidad: this.cantidad });
    
    Swal.fire({
      title: 'Producto agregado',
      text: `${this.producto.title} ha sido agregado al carrito. Cantidad: ${this.cantidad} unidades.`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Ir al carrito',
      cancelButtonText: 'Seguir comprando'
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log('Ir al carrito');
        this.router.navigate(['/carrito']);
      } else if (result.isDismissed) {
        // console.log('Seguir comprando');
        this.router.navigate(['/productos'])
      }
    });
  }

}
