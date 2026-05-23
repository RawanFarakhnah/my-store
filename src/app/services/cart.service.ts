import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { Observable } from 'rxjs';
import { CartItemModel } from '../models/cart-item.model';
import { map } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { OrderSummary } from '../models/order-summary.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItemModel[] = [];

  httpService = inject(HttpClient);

  getProducts(): Observable<ProductModel[]> {
    return this.httpService.get<ProductModel[]>('assets/data.json');
  }

  getProductById(id: number): Observable<ProductModel | null> {
    return this.getProducts().pipe(map((products) => products.find((p) => p.id === id) ?? null));
  }

  getCartItems(): CartItemModel[] {
    return this.cart;
  }

  addCartItem(input: CartItemModel) {
    const index = this.cart.findIndex((i) => i.product.id === input.product.id);

    if (index !== -1) {
      // update existing item
      this.cart[index] = {
        ...this.cart[index],
        quantity: this.cart[index].quantity + input.quantity,
      };
    } else {
      // add new item
      this.cart.unshift(input);
    }
  }

  removeCartItem(item: CartItemModel): CartItemModel[] {
    this.cart = this.cart.filter((i) => i.product.id !== item.product.id);

    return this.cart;
  }

  increment(item: CartItemModel): CartItemModel[] {
    const found = this.cart.find((i) => i.product.id === item.product.id);
    if (found) found.quantity++;

    return this.cart;
  }

  decrement(item: CartItemModel): CartItemModel[] {
    const found = this.cart.find((i) => i.product.id === item.product.id);
    if (!found) return this.cart;

    found.quantity--;

    if (found.quantity <= 0) {
      this.removeCartItem(item);
    }

    return this.cart;
  }

  getCartTotal(): number {
    return this.cart.reduce((t, i) => t + i.product.price * i.quantity, 0);
  }

  getTotalItemsCount(): number {
    return this.cart.reduce((c, i) => c + i.quantity, 0);
  }

  clearCart(): void {
    this.cart = [];
  }

  placeOrder(order: OrderModel): OrderSummary {
    const totalPrice: number = this.getCartTotal();
    const totalItems: number = this.getTotalItemsCount();

    this.clearCart();

    return {
      fullName: order.fullName,
      totalPrice,
      totalItems,
    };
  }
}
