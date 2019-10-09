import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewInit,
    Renderer2,
    OnChanges,
    SimpleChanges,
    OnDestroy
} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {Dish} from '../../shared/models/dish.model';
import {Router, NavigationEnd} from '@angular/router';
import {MenuService} from '../../shared/services/menu.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() name: string;
    @Input() categories: Category[];
    @Input() index: number;
    @Output() searchValue = new EventEmitter<string>();
    @Output() catSelectedId = new EventEmitter<any>();
    @Output() dishes = new EventEmitter<Dish[]>();

    public nameHide = false;
    private menuItems: any;
    public previousUrl: string;
    private currentUrl: string;
    public currentDishes: Dish[];
    public activeCatId: number;

    constructor(private router: Router,
                private renderer: Renderer2,
                private menuService: MenuService) {
        this.currentUrl = this.router.url;
        console.log(this.currentUrl);
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
            }

        });
        if (this.previousUrl) {
            this.previousUrl = this.previousUrl.substring(1);
        }

    }

    ngOnInit() {
        this.subcribeToChangeCat();
    }

    ngAfterViewInit() {

    }


    ngOnChanges(changes: SimpleChanges) {
        // console.log(changes);
        // console.log(this.categories);
        this.setFirstCategory();
    }


    subcribeToChangeCat() {
        this.menuService.swipeDirection.subscribe((result) => {
            console.log(result);
            this.changeCatFromSwipe(result);
        });
    }

    changeCatFromSwipe(swipeDirection: string): void {
        if (this.categories) {
            const index = this.categories.findIndex((category: Category) => {
                return category.id === this.activeCatId;
            });
            if (swipeDirection === 'left' && index !== 0) {
                this.selectCategory(this.categories[index - 1].id);
            } else if (swipeDirection === 'right' && index !== this.categories.length - 1) {
                this.selectCategory(this.categories[index + 1].id);
            }
            console.log(index);
        }

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

    selectCategory(categoryId) {
        console.log(categoryId);
        this.activeCatId = categoryId;
        this.categories.map(cat => {
            if (cat.id === categoryId) {
                this.currentDishes = cat.dishes;
                this.dishes.emit(this.currentDishes);
            }
        });
    }

    ngOnDestroy() {
        this.menuService.swipeDirection.unsubscribe();
    }

    onSegmentChange(ev) {
        this.catSelectedId.emit(ev.detail.value);
        // this.slideTo(ev.detail.value);
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
