import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  template: '',
  standalone: false,
})
class MockProductItemComponent {
  @Input() product!: ProductModel;
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  const mockProducts: ProductModel[] = [
    {
      id: 1,
      name: 'Test Product',
      price: 10,
      url: '',
      description: '',
    },
  ];

  const mockCartService = {
    getProducts: vi.fn().mockReturnValue(of(mockProducts)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, MockProductItemComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
