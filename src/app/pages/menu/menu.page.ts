import { Component, OnInit, Renderer2, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

import { MenuService } from '../../shared/services/menu.service';
import { CategoryService } from '../../shared/services/category.service';

import { HeaderComponent } from '../../components/header/header.component';

import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Dish } from '../../shared/models/dish.model';
import { Menu } from '../../shared/models/menu.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})


export class MenuPage implements OnInit, AfterViewInit {
  private cafeId: number;
  public cafeName: string;
  public menu: Menu;
  public categories: Category [];
  public currentDishes: Dish[];
  private elements: any;
  public automaticClose = false;

  @ViewChild('menuHeader') menuHeader: HeaderComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private menuService: MenuService,
              private catService: CategoryService,
              private renderer: Renderer2) {
  }


  ngOnInit() {
    this.getRouterParams();
    this.getMenu();
    console.log(this.currentDishes);

  }
  ngAfterViewInit() {
    // this.elements = document.querySelectorAll('.categoryItem--name');
    // this.setFirstCategoryActive();
  }

  getRouterParams() {
    this.cafeId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.cafeName = this.activatedRoute.snapshot.paramMap.get('name');
  }

  getMenu() {
    this.menu = this.menuService.getMenu();
    this.setCategories();
    this.setDefaultDishes();
    // this.currentDishes = this.menu.categories[0].dishes;

    console.log(this.menu);
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

  saveToSearchCat(dishes: Dish[]) {

  }

  copyBeforeSearch() {

  }

  // copyForSearch() {
  //   this.cafes = JSON.parse(JSON.stringify(this.cafesCopy));
  //   // this.cafesSearch = JSON.parse(JSON.stringify(this.cafes));
  // }
  //
  // searchCafe(searchValue: string) {
  //   this.copyForSearch();
  //   if (searchValue !== '') {
  //     this.cafes = this.cafes.filter(item => item.name.toLowerCase().indexOf(searchValue.toLowerCase())  > -1 );
  //   } else {
  //     this.copyForSearch();
  //   }
  // }




  // setFirstCategoryActive() {
  //   this.renderer.addClass(this.elements[0], 'activeCategory');
  // }

}
