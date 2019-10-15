import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';

import {HeaderComponent} from '../../components/header/header.component';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs/index';

import {Dish} from '../../shared/models/dish.model';
import {Menu} from '../../shared/models/menu.model';
import {Category} from '../../shared/models/category.model';
import {CartService} from '../../shared/services/cart.service';
import {MenuService} from '../../shared/services/menu.service';
import {CategoryService} from '../../shared/services/category.service';

import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})


export class MenuPage implements OnInit, OnDestroy {

  private menuId: number;
  public cafeName: string;
  public cafeId: number;
  public menu: Menu;
  sliderOptions = {autoHeight: true};
  public categories: Category [];
  public currentDishes: Dish[];
  changeSlideEvent: Subscription;

  @ViewChild('menuHeader') menuHeader: HeaderComponent;
  @ViewChild('slides', {read: IonSlides}) slides: IonSlides;

  constructor(private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private menuService: MenuService,
              private catService: CategoryService) {
  }


  ngOnInit() {
    this.getRouterParams();
    this.getCurrentMenu();
    // set first slide active
    // this.menuService.changeNavPos(0);
    // console.log(this.currentDishes);
    this.subscribeToNavChange();

  }

  subscribeToNavChange() {
    this.changeSlideEvent = this.menuService.navigationNumber.subscribe((res) => {
      console.log(res);
      this.changeSlide(res);
    });
  }

  getRouterParams() {
    this.menuId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.cafeId = +this.activatedRoute.snapshot.paramMap.get('cafeId');
    this.cafeName = this.activatedRoute.snapshot.paramMap.get('name');
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

  getCurrentMenu() {
    this.menuService.getMenu(this.menuId).subscribe((result) => {
      console.log(result);
      this.setValues();
    }, (error) => {
      console.log(error);
    });
  }

  setValues() {
    this.menu = this.menuService.returnMenuValue();
    this.setDefaultDishes();
    this.setCategories();
  }

  setDefaultDishes() {
    this.currentDishes = JSON.parse(JSON.stringify(this.menu.categories[0].dishes));
  }

  setCategories() {
    this.categories = this.catService.setCategories(this.menu.categories);
  }


  setCurrentDishes(dishes: Dish[]) {
    this.currentDishes = dishes;
  }

  searchDishes(event) {
    let searchDishes: Dish [] = [];
    let catDishes: Dish [] = [];
    if (event === '') {
      this.slides.length().then((res1) => {
        console.log('slides length before ' + res1);
      });
      console.log('cat length before delete ' + this.categories.length);
      this.catService.removeSearchCategory();
      console.log('cat length after delete ' + this.categories.length);
      this.updateSlide().then(() => {
        this.slides.length().then((res2) => {
          console.log('slides length after ' + res2);
        });
        this.menuService.changeNavPos(0);

      });

    } else if (event !== '') {
      this.menu.categories.map(cat => {
        catDishes = cat.dishes.filter(item => item.name.toLowerCase().indexOf(event.toLowerCase()) > -1);
        searchDishes = searchDishes.concat(catDishes);
      });
      this.catService.saveToSearchCat(searchDishes);
    }
  }

  addToCart(dish, action) {
    console.log(dish);
    // const cartData = this.collectDataForCart(dish, action);
    // this.cartService.addDishesToOrder(cartData);
  }

  async slideChanged(ev) {
    this.updateSlide().then((re1) => {
      console.log(re1);
      this.slides.length().then((res) => {
        console.log(res);
      });
    });
  }

  async updateSlide() {
    return await this.slides.update();
  }

  changeSlide(ev: number) {
    this.slides.slideTo(ev);
  }

  ngOnDestroy() {
    this.changeSlideEvent.unsubscribe();
  }

}
