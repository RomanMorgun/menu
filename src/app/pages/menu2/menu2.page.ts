import {Component, OnInit, Renderer2, ElementRef, AfterViewInit, ViewChild} from '@angular/core';

import {MenuService} from '../../shared/services/menu.service';
import {CategoryService} from '../../shared/services/category.service';

import {HeaderComponent} from '../../components/header/header.component';

import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import {Dish} from '../../shared/models/dish.model';
import {Menu} from '../../shared/models/menu.model';
import {Category} from '../../shared/models/category.model';
import {Observable} from 'rxjs/index';

@Component({
    selector: 'app-menu2',
    templateUrl: './menu2.page.html',
    styleUrls: ['./menu2.page.scss'],
})
export class Menu2Page implements OnInit, AfterViewInit {

    @ViewChild('slides') slides;
    @ViewChild('segment') segment;

    active: number = 0;
    pages: any[] = [{
        id: 0,
        title: 'Test 0',
        data: 'Data 0'
    }, {
        id: 1,
        title: 'Test 1',
        data: 'Data 1'
    }, {
        id: 2,
        title: 'Test 2',
        data: 'Data 2'
    }, {
        id: 3,
        title: 'Test 3',
        data: 'Data 3'
    }, {
        id: 4,
        title: 'Test 4',
        data: 'Data 4'
    }, {
        id: 5,
        title: 'Test 5',
        data: 'Data 5'
    }, {
        id: 6,
        title: 'Test 6',
        data: 'Data 6'
    }, {
        id: 7,
        title: 'Test 7',
        data: 'Data 7'
    }, {
        id: 8,
        title: 'Test 8',
        data: 'Data 8 '
    }, {
        id: 9,
        title: 'Test 9',
        data: 'Data 9'
    }];

    private menuId: number;
    public cafeName: string;
    public menu: Menu;
    public categories: Category [];
    public currentDishes: Dish[];
    public automaticClose = false;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private menuService: MenuService,
                private catService: CategoryService) {
    }

    ngOnInit() {
        this.menuId = +this.activatedRoute.snapshot.paramMap.get('id') || 2;
        this.cafeName = this.activatedRoute.snapshot.paramMap.get('name') || 'corporis';
        if(this.menuId && this.cafeName) this.getCurrentMenu();
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

// On Segment change slide to the matching slide
    onSegmentChange(ev) {
        this.slideTo(ev.detail.value);
    }

    slideTo(index) {
        this.slides.slideTo(index);
    }

// On Slide change update segment to the matching value
    async onSlideDidChange(ev) {
        const index = await this.slides.getActiveIndex();
        this.active = index;
        this.clickSegment(index);
    }

    clickSegment(index) {
        this.segment.value = index;
        this.active = index;
    }

    ngAfterViewInit() {
    }
}
