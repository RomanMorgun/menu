import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Dish } from '../models/dish.model';

@Injectable()

export class CartService {

  private order: Order;
  private orderDishes: Dish [];

  constructor() {}

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

  addDishesToOrder(cartData) {
    console.log(cartData);

    // const findedId = this.orderDishes.findIndex(dish => dish.id === addDish.id);
    // if (findedId && action === 'add') {
    //   this.orderDishes[findedId].count++;
    // } else if (findedId && action === 'remove') {
    //    this.orderDishes[findedId].count--;
    // } else {
    //   this.orderDishes.push(addDish);
    // }
  }

  removeDishFromOrder(id) {

  }

}
