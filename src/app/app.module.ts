import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [App, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
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
  bootstrap: [App],
})
export class AppModule {}
