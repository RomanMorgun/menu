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


import { DishListDirective } from '../components/dishes-list/dish-list.directive';

// ----- MODELS ------

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
    DishesListComponent,
    DishListDirective
  ],
  exports: [
    BasketItemComponent,
    CafeItemComponent,
    DishItemComponent,
    HeaderComponent,
    DishesListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DishListDirective

  ]
})


export class SharedModule { }
