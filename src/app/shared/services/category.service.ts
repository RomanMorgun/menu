import { Category } from '../models/category.model';
import { Injectable } from '@angular/core';
import { DishService } from './dish.service';
import { Dish } from '../../shared/models/dish.model';

@Injectable()

export class CategoryService {
  private categories: Category[];
  constructor(private dishService: DishService) {}


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
      this.addNewCategory();
    }
    this.categories[this.categories.length - 1].dishes = dishes;
    console.log(this.categories);
  }

  addNewCategory() {
    this.categories.push(this.getOneCategory());
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
