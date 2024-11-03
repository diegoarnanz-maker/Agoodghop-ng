import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../../types';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'https://jsonblob.com/api/1293968868236976128';

  constructor(private http: HttpClient) {}

  // Método para obtener los productos, devuelve una promesa con un array de productos

  async getProductos(): Promise<Producto[]> {
    try {
      const response = await lastValueFrom(this.http.get<{ products: Producto[] }>(this.apiUrl));
      if (response && response.products) {
        return response.products;
      } else {
        throw new Error('Error al cargar la API');
      }
    } catch (error) {
      throw new Error('Error en la solicitud: ' + error);
    }
  }

  getProductoBySKU(SKU: string): Promise<Producto> {
    return this.getProductos().then((productos) => {
      const producto = productos.find((producto) => producto.SKU === SKU);
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
      return producto;
    });
  }
}
