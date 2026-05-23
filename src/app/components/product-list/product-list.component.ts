import { Component, inject, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CartItemModel } from '../../models/cart-item.model';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products$?: Observable<ProductModel[]>;

  cartService = inject(CartService);

  ngOnInit(): void {
    this.products$ = this.cartService.getProducts();
  }

  addToCart(item: CartItemModel): void {
    this.cartService.addCartItem(item);
  }
}
