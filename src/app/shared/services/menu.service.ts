import { Menu } from '../models/menu.model';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RequestService } from './request.service';
import { COMMON_URL } from './common.url';
import { tap } from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';

@Injectable()
export class MenuService {

  private menu: Menu;
  public navigationNumber = new EventEmitter<number>(); // Variable for segment and slide position


  constructor(
    private requestService: RequestService
  ) {}

  setDefValues() {
    console.log(this.menu);
    this.menu.categories.map(cat => {
      cat.dishes.map(dish => {
        dish.count = 0;
        dish.open = false;
      });
    });
  }

  getMenu(id): Observable<any> {
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

  returnMenuValue() {
    return JSON.parse(JSON.stringify(this.menu));
  }

  setMenu(menu: Menu) {
    this.menu = menu;
  }

  changeNavPos(posNumber: number) {
    console.log(posNumber);
    this.navigationNumber.emit(posNumber);
  }
}
