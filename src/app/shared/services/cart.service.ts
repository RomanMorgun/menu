import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Dish } from '../models/dish.model';

@Injectable()

export class CartService {
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

  addDishesToOrder(addedDishes: Dish[]) {

  }

}
