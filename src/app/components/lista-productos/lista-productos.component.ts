import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../types';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent
  ],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {

  productos: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) { }

  // Método para cargar los productos al iniciar el componente 
  async ngOnInit(): Promise<void> {
    try {
      this.productos = await this.productosService.getProductos(); // Usa await aquí
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  agregarAlCarrito(producto: Producto, cantidad: number) {
    this.carritoService.addProduct(producto, cantidad);
  }

}
