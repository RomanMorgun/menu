import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Dish } from '../../shared/models/dish.model';
import { MenuService } from '../../shared/services/menu.service';
import { CartService } from '../../shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';


@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss'],
})
export class DishesListComponent implements OnInit, OnChanges {

  public currentDishes: Dish[];
  private cafeId: number;
  private cafeName: string;

  @Input() dishes: Dish[];

  @Output() swipeEvent = new EventEmitter<any>();

  constructor(private menuService: MenuService,
              private activateRouter: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit() {
    this.getQueryParams();
    this.copyDishes();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.copyDishes();
  }

  getQueryParams() {
      this.cafeId = +this.activateRouter.snapshot.paramMap.get('cafeId');
  }

  swipeLeft(event) {
    console.log('swipe Left');
    this.menuService.swipeDirection.emit('right');
    // this.menuService.changeCategory('left');
  }

  swipeRight(event) {
    console.log('swipe Right');
    this.menuService.swipeDirection.emit('left');
    // this.menuService.changeCategory('right');
  }


  copyDishes() {
    if (this.dishes !== null) {
      this.currentDishes = JSON.parse(JSON.stringify(this.dishes));
    } else {
    // TODO
    //  TOAST NOTIFY

    }
  }

  addToCart(dish, action) {
    console.log(dish);
    const cartData = this.collectDataForCart(dish, action);
    this.cartService.addDishesToOrder(cartData);
  }

  collectDataForCart(dish, action) {
    let cartData = {};
    cartData = {
      orderDish: dish,
      currentAction: action,
      cafeName: this.cafeName,
      cafeId: this.cafeId
    };
    return cartData;
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
