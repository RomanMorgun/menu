import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Dish } from '../../shared/models/dish.model';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss'],
})
export class DishesListComponent implements OnInit, OnChanges {

  public currentDishes: Dish[];

  @Input() dishes: Dish[];

  constructor() { }

  ngOnInit() {
    console.log(this.dishes);
    this.copyDishes();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.copyDishes();
  }


  copyDishes() {
    if (this.dishes !== null) {
      this.currentDishes = JSON.parse(JSON.stringify(this.dishes));
    } else {
    // TODO
    //  TOAST NOTIFY

    }
  }

  addToCart(dish, dishId, action) {
    console.log(dish);
    this.changeCountValue(dishId, action);

  }

  changeCountValue(dishId, action) {
    this.currentDishes.map(dish => {
      if (dish.id === dishId) {
        if (action === 'add') {
          dish.count++;
        } else if (action === 'remove') {
          dish.count--;
        }
      }
    });
  }

  showDetailInfo(dishId) {
    this.currentDishes.map(dish => {
      if (dish.id === dishId) {
        if (dish.open === true) {
          dish.open = false;
        } else {
          dish.open = true;
        }
      } else {
        dish.open = false;
      }
    });
  }

  changeIngridient(event) {
    console.log(this.currentDishes);
  }





}
