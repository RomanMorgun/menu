import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// PAGES
import { BasketPage } from './pages/basket/basket.page';
import { MapPage } from './pages/map/map.page';
import { MenuPage } from './pages/menu/menu.page';
import { ScanQrPage } from './pages/scan-qr/scan-qr.page';


// MODULES
import { SharedModule } from './shared/shared.module';


import { IonicGestureConfig } from './hammer.provider';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


// Service
import { RequestService } from './shared/services/request.service';
import { CafeService } from './shared/services/cafe.service';
import {MenuService} from './shared/services/menu.service';
import {CartService} from './shared/services/cart.service';
import {DishService} from './shared/services/dish.service';
import { CategoryService } from './shared/services/category.service';


@NgModule({
  declarations: [ AppComponent,
                  BasketPage,
                  MapPage,
                  MenuPage,
                  ScanQrPage,

  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig},
    RequestService,
    CafeService,
    MenuService,
    CartService,
    DishService,
    CategoryService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


