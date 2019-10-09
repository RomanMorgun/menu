import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import {MenuService} from '../../shared/services/menu.service';
import {CategoryService} from '../../shared/services/category.service';

import {HeaderComponent} from '../../components/header/header.component';

import {ActivatedRoute} from '@angular/router';

import {Dish} from '../../shared/models/dish.model';
import {Menu} from '../../shared/models/menu.model';
import {Category} from '../../shared/models/category.model';
import { CartService } from '../../shared/services/cart.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})


export class MenuPage implements OnInit, AfterViewInit {
    private menuId: number;
    public cafeName: string;
    public cafeId: number;
    public menu: Menu;
    public index = 0;
    sliderOptions = {autoHeight: true};
    public categories: Category [];
    public currentDishes: Dish[];

    @ViewChild('menuHeader') menuHeader: HeaderComponent;
    @ViewChild('slides') slides;

    constructor(private activatedRoute: ActivatedRoute,
                private cartService: CartService,
                private menuService: MenuService,
                private catService: CategoryService
    ) {}


    ngOnInit() {
        this.getRouterParams();
        this.getCurrentMenu();
        // console.log(this.currentDishes);

    }

    ngAfterViewInit() {
        // this.elements = document.querySelectorAll('.categoryItem--name');
        // this.setFirstCategoryActive();
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
        // this.menuService.getMenu(this.menuId).subscribe({
        //   next(result) {
        //     console.log(result);
        //     this.setValues();
        //   },
        //   error(error) {
        //     console.log(error);
        //   }
        // });
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
        console.log(event);
        let searchDishes: Dish [] = [];
        let catDishes: Dish [] = [];
        console.log(event);
        if (event === '') {
            this.catService.removeSearchCategory();
            this.menuHeader.setFirstCategory();
        } else if (event !== '') {
            console.log(this.menu.categories);
            this.menu.categories.map(cat => {
                catDishes = cat.dishes.filter(item => item.name.toLowerCase().indexOf(event.toLowerCase()) > -1);
                searchDishes = searchDishes.concat(catDishes);
            });
            this.catService.saveToSearchCat(searchDishes);
            this.menuHeader.selectCategory(1000);

        }
    }

    addToCart(dish, action) {
        console.log(dish);
        // const cartData = this.collectDataForCart(dish, action);
        // this.cartService.addDishesToOrder(cartData);
    }

    // TODO cafeId set value

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

    async slideChanged(ev) {
        this.index = await this.slides.getActiveIndex();
        // this.clickSegment(index);
    }

    changeSlide(ev: number) {
        this.slides.slideTo(ev);
    }

}
