import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {Dish} from '../../shared/models/dish.model';
import {Router} from '@angular/router';
import {MenuService} from '../../shared/services/menu.service';
import {CategoryService} from '../../shared/services/category.service';
import {Subscription} from 'rxjs/index';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() categories: Category[];
  @Output() searchValue = new EventEmitter<string>();
  @Output() catSelectedId = new EventEmitter<any>();
  @Output() dishes = new EventEmitter<Dish[]>();

  public nameHide = false;
  public previousUrl: string;
  private currentUrl: string;
  public currentDishes: Dish[];
  public activeCatId: number;
  private changeCatSub: Subscription;
  private navNumber: Subscription;
  public  segmentNum = 0;

  constructor(private router: Router,
              private catService: CategoryService,
              public menuService: MenuService) {

    // this.currentUrl = this.router.url;
    // console.log(this.currentUrl);
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.previousUrl = this.currentUrl;
    //     this.currentUrl = event.url;
    //   }
    //
    // });
    // if (this.previousUrl) {
    //   this.previousUrl = this.previousUrl.substring(1);
    // }
  }

  ngOnInit() {
    this.subscibeToNavNum();
  }

  subscibeToNavNum() {
    this.navNumber = this.menuService.navigationNumber.subscribe((res) => {
      this.segmentNum = res;
    });
  }

  searchClick() {
    this.nameHide === false ? this.nameHide = true : this.nameHide = false;
    console.log('search CLICK');
  }

  locationClick() {
    this.router.navigate(['map']);
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

  selectCategory(categoryNum) {
    console.log(categoryNum);
    // this.catSelectedId.emit(categoryNum);
  }

  ngOnDestroy() {
    this.unSubscribeAll();
  }

  onSegmentChange(ev) {
    this.menuService.changeNavPos(ev.detail.value);
  }

  unSubscribeAll() {
    // this.changeCatSub
    this.changeCatSub.unsubscribe();
    // this.changeCatSub;
    // this.catService.newCatEvent.unsubscribe();
  }

}
