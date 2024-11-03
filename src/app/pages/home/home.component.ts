import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaProductosComponent } from '../../components/lista-productos/lista-productos.component';
import { CarritoComponent } from '../../components/carrito/carrito.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    ListaProductosComponent,
    CarritoComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  

}
