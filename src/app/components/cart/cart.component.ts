import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgForm } from '@angular/forms';
import { OrderModel } from '../../models/order.model';
import { CartItemModel } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy{
  cartItems: CartItemModel[] = [];
  
  cartService = inject(CartService);

  ngOnInit(): void {
     this.cartItems = this.cartService.getCartItems();
  }

  ngOnDestroy(): void {
    this.cartItems = [];
  }

  removeCartItem(item: CartItemModel): void {
    this.cartItems = this.cartService.removeCartItem(item);
  }

  incrementQuantity(item: CartItemModel): void {
   this.cartItems = this.cartService.increment(item);
  }

  decrementQuantity(item: CartItemModel): void {
   this.cartItems = this.cartService.decrement(item);
  }

  getCartTotal(): number{
    return this.cartService.getCartTotal();
  }

  getTotalItemsCount(): number {
    return this.cartService.getTotalItemsCount();
  }

  submitOrder(form: NgForm): void {
    if (form.invalid || this.cartItems.length === 0) return;

    const { fullName, address, creditCardNumber } =
    form.form.getRawValue();

    const order: OrderModel = {
    fullName,
    address,
    creditCardNumber,
    cartItems: this.cartItems
   };

   console.log('ORDER:', order);
  }
  
}
