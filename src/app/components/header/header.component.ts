import {
  Component, OnInit, Input, Output, EventEmitter, AfterViewInit, Renderer2, OnChanges,
  SimpleChanges
} from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { Dish } from '../../shared/models/dish.model';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() name: string;
  @Input() categories: Category[];
  @Output() searchValue = new EventEmitter<string>();
  @Output() dishes = new EventEmitter<Dish[]>();

  public nameHide = false;
  private menuItems: any;
  public previousUrl: string;
  private currentUrl: string;
  public currentDishes: Dish[];
  public activeCatId: number;
  constructor(private router: Router,
              private renderer: Renderer2) {
    // this.currentUrl = this.router.url;
    // console.log(this.currentUrl);
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.previousUrl = this.currentUrl;
    //     this.currentUrl = event.url;
    //   }
    //   console.log(this.previousUrl);
    // });
    // if (this.previousUrl) {
    //   this.previousUrl = this.previousUrl.substring(1);
    // }

  }

  ngOnInit() {
    this.setFirstCategory();
  }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.categories);
  }


  setFirstCategory() {
    if (this.categories) {
      this.activeCatId = this.categories[0].id;
      this.selectCategory(this.activeCatId);
      console.log(this.categories);
      }
    }


  searchClick() {
    this.nameHide === false ? this.nameHide = true : this.nameHide = false;
    console.log('search CLICK');
  }

  locationClick() {
    console.log('location CLICK');
  }

  cartClick() {
    console.log('cart CLICK');
  }

  searchCafe(event) {
    const searchValue = event.target.value;
    this.searchValue.emit(searchValue);
  }

  clearClick(event) {
    event.target.value = '';
    this.searchCafe(event);
  }

  selectCategory(categoryId) {
    console.log(categoryId);
    this.activeCatId = categoryId;
    this.categories.map(cat => {
      if ( cat.id === categoryId) {
        this.currentDishes = cat.dishes;
        this.dishes.emit(this.currentDishes);
        console.log(this.currentDishes);
        console.log(this.activeCatId);
      }
    });
  }



  // selectCategory(event, category) {
  //   this.menuItems.forEach(element => {
  //     this.renderer.removeClass(element, 'activeCategory');
  //   });
  //   this.renderer.addClass(event.target, 'activeCategory');
  //   this.menuService.selectCategory(category);
  //   this.currentDishes = category.dishes;
  // }

}
