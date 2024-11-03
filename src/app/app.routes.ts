import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'carrito',
        component: CartComponent
    },
    {
        path: 'productos',
        component: ProductsComponent
    },
    {
        path: 'product-details/:id',
        component: ProductDetailsComponent
    }
];
