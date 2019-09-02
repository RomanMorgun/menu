import { Injectable } from '@angular/core';
import { Dish } from '../models/dish.model';
// import

@Injectable()

export class DishService {
  private dishes: Dish[];

  getDishes() {
    const dishArray = [];
    dishArray.push(new Dish());
    return dishArray;
    // console.log(this.dishes);
    // return this.dishes.slice();
  }
  setDishes(dishes: Dish[]) {
    this.dishes = dishes;
  }

}


