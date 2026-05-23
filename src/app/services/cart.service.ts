import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  httpService = inject(HttpClient);

  getProducts(): Observable<ProductModel[]> {
    return this.httpService.get<ProductModel[]>('assets/data.json');
  }
}
