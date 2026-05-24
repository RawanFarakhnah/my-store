import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { Observable } from 'rxjs';
import { CartItemModel } from '../models/cart-item.model';
import { map } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { OrderSummary } from '../models/order-summary.model';
import { signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<CartItemModel[]>([]);

  httpService = inject(HttpClient);

  cartCount = computed(() => this.cart().reduce((count, item) => count + item.quantity, 0));

  getProducts(): Observable<ProductModel[]> {
    return this.httpService.get<ProductModel[]>('assets/data.json');
  }

  getProductById(id: number): Observable<ProductModel | null> {
    return this.getProducts().pipe(map((products) => products.find((p) => p.id === id) ?? null));
  }

  getCartItems(): CartItemModel[] {
    return this.cart();
  }

  addCartItem(input: CartItemModel) {
    const current = this.cart();

    const index = current.findIndex((i) => i.product.id === input.product.id);

    if (index !== -1) {
      // update existing item
      current[index] = {
        ...current[index],
        quantity: current[index].quantity + input.quantity,
      };
    } else {
      // add new item
      current.unshift(input);
    }

    this.cart.set([...current]);
  }

  removeCartItem(item: CartItemModel): CartItemModel[] {
    this.cart.set(this.cart().filter((i) => i.product.id !== item.product.id));

    return this.cart();
  }

  increment(item: CartItemModel): CartItemModel[] {
    const current = this.cart();

    const found = current.find((i) => i.product.id === item.product.id);
    if (found) found.quantity++;

    return current;
  }

  decrement(item: CartItemModel): CartItemModel[] {
    const current = this.cart();

    const found = current.find((i) => i.product.id === item.product.id);
    if (!found) return current;

    found.quantity--;

    this.cart.set([...current]);

    if (found.quantity <= 0) {
      this.removeCartItem(item);
    }

    return current;
  }

  getCartTotal(): number {
    return this.cart().reduce((t, i) => t + i.product.price * i.quantity, 0);
  }

  getTotalItemsCount(): number {
    return this.cart().reduce((c, i) => c + i.quantity, 0);
  }

  clearCart(): void {
    this.cart.set([]);
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
