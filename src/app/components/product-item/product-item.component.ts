import { Component, EventEmitter, inject, Input, Output, } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { CartItemModel } from '../../models/cart-item.model';

@Component({
  selector: 'app-product-item',
  standalone: false,
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  @Input() product!: ProductModel;
  @Output() addToCart = new EventEmitter<CartItemModel>();

  quantity: number = 1;
  
  toastrService = inject(ToastrService);

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
      quantity: quantity
     }
     
     this.addToCart.emit(item);
   
     this.toastrService.success(
       `${quantity} ${product.name} added to cart`,
       'Success'
     );   

     this.quantity = 1;
  }
}
