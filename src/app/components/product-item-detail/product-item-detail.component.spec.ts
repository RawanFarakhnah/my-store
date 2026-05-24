import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemDetailComponent } from './product-item-detail.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CartService } from '../../services/cart.service';

describe('ProductItemDetailComponent', () => {
  let component: ProductItemDetailComponent;
  let fixture: ComponentFixture<ProductItemDetailComponent>;

  const toastrMock = {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  };

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: () => '1',
      },
    },
  };

  const cartServiceMock = {
    getProductById: vi.fn(),
  };

  beforeEach(async () => {
    cartServiceMock.getProductById.mockReturnValue(
      of({
        id: 1,
        name: 'Test Product',
        price: 10,
        url: '',
        description: '',
      }),
    );

    await TestBed.configureTestingModule({
      declarations: [ProductItemDetailComponent],
      providers: [
        { provide: ToastrService, useValue: toastrMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: CartService, useValue: cartServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductItemDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
