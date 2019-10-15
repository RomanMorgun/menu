import { Category } from '../models/category.model';
import {EventEmitter, Injectable} from '@angular/core';
import { DishService } from './dish.service';
import { Dish } from '../models/dish.model';
import { MenuService } from './menu.service';

@Injectable()

export class CategoryService {

  private categories: Category[];

  constructor(private dishService: DishService,
              private menuService: MenuService) {}


  getOneCategory() {
    return new Category(1000, 'Результати пошуку', this.dishService.getDishes());
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
    return this.categories;
    // return JSON.parse(JSON.stringify(this.categories));
  }

  saveToSearchCat(dishes: Dish[]) {
    if (!this.findSearchCategory()) {
      this.addNewCategory(dishes);
    }

  }

  addNewCategory(dishes: Dish[]) {
    console.log(this.categories.length);
    this.categories.push(this.getOneCategory());
    this.categories[this.categories.length - 1].dishes = dishes;
    this.menuService.changeNavPos(this.categories.length - 1);
  }

  removeSearchCategory() {
    this.categories.map(cat => {
      if (cat.id === 1000 && cat.name === 'Результати пошуку') {
        this.categories.splice(-1, 1);
      }
    });
  }


  findSearchCategory() {
    let checkStatus = false;
    this.categories.map(cat => {
      if (cat.id === 1000 && cat.name === 'Результати пошуку') {
        checkStatus = true;
      }
    });
    return checkStatus;
  }
}
