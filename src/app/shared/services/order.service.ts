import { Order } from '../models/order.model';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {
  private order: Order;

  getOrder() {
    return JSON.parse(JSON.stringify(this.order));
  }

  countTotalPrice() {
    let price = 0;
    if (this.order && this.order.dishes.length !== 0) {
      this.order.dishes.map(e => {
        price += e.price;
      });
      this.order.totalPrice = price;
    }
  }
}
