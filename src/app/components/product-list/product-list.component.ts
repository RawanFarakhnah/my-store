import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { ProductModel } from '../../models/product-model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products$!: Observable<ProductModel[]>;

  private cartService = inject(CartService);

  ngOnInit(): void {
    this.products$ = this.cartService.getProducts();
  }
}
