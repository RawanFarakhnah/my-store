import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgForm } from '@angular/forms';
import { OrderModel } from '../../models/order.model';
import { CartItemModel } from '../../models/cart-item.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItemModel[] = [];

  toastrService = inject(ToastrService);
  cartService = inject(CartService);
  router = inject(Router);

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  ngOnDestroy(): void {
    this.cartItems = [];
  }

  removeCartItem(item: CartItemModel): void {
    this.cartItems = this.cartService.removeCartItem(item);

    this.toastrService.success(`${item.product.name} was removed from the cart.`, 'Cart Updated');
  }

  onQuantityChange(item: CartItemModel, value: number): void {
    const newValue = Math.max(1, Math.min(10, Number(value)));

    this.cartItems = this.cartService.updateQuantity(item, newValue);
  }

  incrementQuantity(item: CartItemModel): void {
    this.onQuantityChange(item, item.quantity + 1);
  }

  decrementQuantity(item: CartItemModel): void {
    this.onQuantityChange(item, item.quantity - 1);
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  getTotalItemsCount(): number {
    return this.cartService.getTotalItemsCount();
  }

  submitOrder(form: NgForm): void {
    if (form.invalid || this.cartItems.length === 0) return;

    const { fullName, address, creditCardNumber } = form.form.getRawValue();

    const order: OrderModel = {
      fullName,
      address,
      creditCardNumber,
      cartItems: this.cartItems,
    };

    const orderSummary = this.cartService.placeOrder(order);

    this.router
      .navigate(['/success'], {
        state: { orderSummary },
      })
      .catch(() => {});
  }
}
