import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ----- COMPONENTS ------
import { BasketItemComponent } from '../components/basket-item/basket-item.component';
import { CafeItemComponent } from '../components/cafe-item/cafe-item.component';
import { DishItemComponent } from '../components/dish-item/dish-item.component';
import { HeaderComponent } from '../components/header/header.component';
import { DishesListComponent } from '../components/dishes-list/dishes-list.component';

// ----- SERVICES ------
import { RequestService } from './services/request.service';
import { CafeService } from './services/cafe.service';
import { MenuService } from './services/menu.service';
import { CartService } from './services/cart.service';
import { DishService } from './services/dish.service';
import { CategoryService } from './services/category.service';
import { GeolocationService } from './services/geolocation.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BasketItemComponent,
    CafeItemComponent,
    DishItemComponent,
    HeaderComponent,
    DishesListComponent
  ],
  exports: [
    BasketItemComponent,
    CafeItemComponent,
    DishItemComponent,
    HeaderComponent,
    DishesListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    RequestService,
    CafeService,
    MenuService,
    CartService,
    DishService,
    CategoryService,
    GeolocationService
  ]

})


export class SharedModule { }
