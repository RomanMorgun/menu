import { Menu } from '../models/menu.model';
import { Injectable } from '@angular/core';
import { CategoryService } from './category.service';
import { Output, EventEmitter } from '@angular/core';
import { RequestService } from './request.service';
import { COMMON_URL } from './common.url';
import { tap, map } from 'rxjs/internal/operators';



@Injectable()
export class MenuService {

  swipeDirection = new EventEmitter<string>();

  constructor(
    private catService: CategoryService,
    private requestService: RequestService
  ) {}
  private menu: Menu;
  // private menu: Menu =
  //   {
  //     cafeId: 1,
  //     categories: [
  //       {
  //         id: 0,
  //         name: 'Category 1',
  //         dishes: [
  //             {
  //               id: 0,
  //               name: 'test Dish 1',
  //               logo: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //               price: 20,
  //               description: 'Cool Test Dish 1',
  //               weight: 200,
  //               ingredients: [
  //                 {
  //                   id: 0,
  //                   name: 'Ingredient 1',
  //                   price: 20,
  //                   included: false
  //                 },
  //                 {
  //                   id: 1,
  //                   name: 'Ingredient 2',
  //                   price: 30,
  //                   included: false
  //                 },
  //                 {
  //                   id: 1,
  //                   name: 'Ingredient 2',
  //                   price: 30,
  //                   included: false
  //                 },
  //                 {
  //                   id: 1,
  //                   name: 'Ingredient 2',
  //                   price: 30,
  //                   included: false
  //                 },
  //                 {
  //                   id: 1,
  //                   name: 'Ingredient 2',
  //                   price: 30,
  //                   included: false
  //                 }
  //               ]
  //             },
  //           {
  //             id: 2,
  //             name: 'test Dish 1',
  //             logo: '',
  //             price: 20,
  //             description: 'Cool Test Dish 1',
  //             weight: 200,
  //             ingredients: [
  //               {
  //                 id: 2,
  //                 name: 'Ingredient 3',
  //                 price: 20,
  //                 included: false
  //               },
  //               {
  //                 id: 3,
  //                 name: 'Ingredient 4',
  //                 price: 30,
  //                 included: false
  //               }
  //             ]
  //           },
  //           {
  //             id: 3,
  //             name: 'test Dish 1',
  //             logo: 'https://www.bbcgoodfood.com/sites/default/files/styles/category_retina/public/recipe-collections/collection-image/2013/05/mexican-chicken-burger_1.jpg?itok=LJYhlfBT',
  //             price: 20,
  //             description: 'Cool Test Dish 1',
  //             weight: 200,
  //             ingredients: [
  //               {
  //                 id: 4,
  //                 name: 'Ingredient 5',
  //                 price: 20,
  //                 included: false
  //               },
  //               {
  //                 id: 5,
  //                 name: 'Ingredient 6',
  //                 price: 30,
  //                 included: false
  //               }
  //             ]
  //           }
  //           ]
  //       },
  //       {
  //         id: 1,
  //         name: 'Category 2',
  //         dishes: [
  //           {
  //             id: 4,
  //             name: 'test Dish 2',
  //             logo: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/10/3/0/FNM_110117-Insert-Opener-2_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1507047894789.jpeg',
  //             price: 20,
  //             description: 'Cool Test Dish 1',
  //             weight: 200,
  //             ingredients: [
  //               {
  //                 id: 6,
  //                 name: 'Ingredient 7',
  //                 price: 10,
  //                 included: false
  //               },
  //               {
  //                 id: 7,
  //                 name: 'Ingredient 8',
  //                 price: 60,
  //                 included: false
  //               }
  //             ]
  //           },
  //           {
  //             id: 5,
  //             name: 'test Dish 2',
  //             logo: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/10/3/0/FNM_110117-Insert-Opener-2_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1507047894789.jpeg',
  //             price: 20,
  //             description: 'Cool Test Dish 1',
  //             weight: 200,
  //             ingredients: [
  //               {
  //                 id: 8,
  //                 name: 'Ingredient 9',
  //                 price: 10,
  //                 included: false
  //               },
  //               {
  //                 id: 9,
  //                 name: 'Ingredient 10',
  //                 price: 60,
  //                 included: false
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       ]
  //   };

  selectCategory(category) {
    console.log(category);
  }

  setDefValues() {
    console.log(this.menu);
    this.menu.categories.map(cat => {
      cat.dishes.map(dish => {
        dish.count = 0;
        dish.open = false;
      });
    });
  }

  getMenu(id) {
    return this.requestService.get(`${COMMON_URL.menu.getOne}${id}`).pipe(
      tap((result) => {
        console.log(result);
        this.setMenu(result.data);
        this.setDefValues();
        },
        (error) => {
        console.log(error);
        })
    );
  }

  // getMenu(id) {
  //   return this.requestService.get(`${COMMON_URL.menu.getOne}${id}`).subscribe({
  //     next(result) {
  //       this.setMenu(result.data);
  //       this.setDefValues();
  //   },
  //     error(error) {
  //       console.log(error);
  //     }
  //   });
  // }

  returnMenuValue() {
    return JSON.parse(JSON.stringify(this.menu));
  }

  setMenu(menu: Menu) {
    this.menu = menu;
  }
}
