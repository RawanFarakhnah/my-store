import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemModel } from '../../models/cart-item.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item-detail',
  standalone: false,
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.css',
})
export class ProductItemDetailComponent implements OnInit {
  product$?: Observable<ProductModel | null>;
  quantity: number = 1;

  cartService = inject(CartService);
  toastrService = inject(ToastrService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Invalid id
    if (!id) {
      void this.router.navigate(['/']);
      return;
    }

    this.loadProduct(id);
  }

  private loadProduct(id: number): void {
    this.product$ = this.cartService.getProductById(id);
  }

  incrementQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onAddToCart(product: ProductModel, quantity: number): void {
    const item: CartItemModel = {
      product: product,
      quantity: quantity,
    };

    this.cartService.addCartItem(item);

    this.toastrService.success(`${quantity} ${product.name} added to cart`, 'Success');

    this.quantity = 1;
  }
}
