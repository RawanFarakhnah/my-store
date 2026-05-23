import { ProductModel } from './product.model';

export interface OrderModel {
  id?: number;
  name: string;
  address: string;
  creditsCard: string;
  products: ProductModel[];
}
