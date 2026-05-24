import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductModel } from '../../models/product.model';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  const toastrMock = {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  };

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 10,
    url: '',
    description: '',
  } as ProductModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductItemComponent],
      providers: [{ provide: ToastrService, useValue: toastrMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;

    component.product = mockProduct;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
