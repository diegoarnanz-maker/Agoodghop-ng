import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../../types';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productDetails!: Producto;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductosService
  ) {}

  // Al iniciar el componente obtengo el SKU del producto enviado por la url.
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productService.getProductoBySKU(id).then((producto) => {
        this.productDetails = producto;
        // console.log(producto);
      });
    });
  }

}
