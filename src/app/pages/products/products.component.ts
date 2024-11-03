import { Component } from '@angular/core';
import { ListaProductosComponent } from '../../components/lista-productos/lista-productos.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ListaProductosComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
