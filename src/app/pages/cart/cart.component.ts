import { Component } from '@angular/core';
import { CarritoComponent } from '../../components/carrito/carrito.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CarritoComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

}
