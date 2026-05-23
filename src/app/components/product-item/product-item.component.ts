import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  standalone: false,
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  toastrService = inject(ToastrService);

  @Input() product!: ProductModel;

  quantity: number = 1;
  productItems: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @Output() addToCart = new EventEmitter<ProductModel>();

  onAddToCart(product: ProductModel, quantity: number): void {
    const newProduct = { ...product, quantity: quantity };
    this.addToCart?.emit(newProduct);

    this.toastrService.success(`${quantity} ${product.name} added to cart`, 'Success');
    this.quantity = 1;
  }
}
