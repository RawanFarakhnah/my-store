import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CartComponent } from './cart/cart.component';
import { NgbAccordionItem } from '@ng-bootstrap/ng-bootstrap';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    CartComponent,
    ConfirmationComponent,
    ProductItemComponent,
    ProductItemDetailComponent,
    ProductListComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, FormsModule, NgbAccordionItem],
  providers: [
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      newestOnTop: true,
      positionClass: 'toast-bottom-right',
      easeTime: 300,
    }),
  ],
})
export class ShopModule {}
