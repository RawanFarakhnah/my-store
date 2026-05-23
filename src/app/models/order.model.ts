import { CartItemModel } from './cart-item.model';

export interface OrderModel {
  id?: number;
  fullName: string;
  address: string;
  creditCardNumber: string;
  cartItems: CartItemModel[];
}
