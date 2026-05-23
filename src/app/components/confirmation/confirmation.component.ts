import { Component, OnInit } from '@angular/core';
import { OrderSummary } from '../../models/order-summary.model';

@Component({
  selector: 'app-confirmation',
  standalone: false,
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
})
export class ConfirmationComponent implements OnInit {
  orderSummary: OrderSummary | null = null;

  ngOnInit(): void {
    const state = history.state as { orderSummary?: OrderSummary };

    if (!state?.orderSummary) {
      console.warn('No order data found');
      return;
    }

    this.orderSummary = state.orderSummary;
  }
}
