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
  }

  setDishes(dishes: Dish[]) {
    this.dishes = dishes;
  }

}


