import { Injectable } from '@angular/core';
import { Dish } from '../models/dish.model';
// import

@Injectable()

export class DishService {
  private dishes: Dish[];

  getDishes() {
    return this.dishes.slice();
  }
}


