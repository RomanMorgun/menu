import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// MODULES
import { SharedModule } from './shared/shared.module';
import { IonicGestureConfig } from './hammer.provider';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

// PAGES
import { BasketPage } from './pages/basket/basket.page';
import { MenuPage } from './pages/menu/menu.page';
import { ScanQrPage } from './pages/scan-qr/scan-qr.page';
import { HistoryPage } from './pages/history/history.page';
import { ChooseActionPage } from './pages/choose-action/choose-action.page';
import {MarkerCafeComponent} from './pages/map/marker-cafe/marker-cafe.component';

@NgModule({
    declarations: [AppComponent,
        BasketPage,
        ScanQrPage,
        MenuPage,
        ChooseActionPage,
        HistoryPage,
        MarkerCafeComponent
    ],
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
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig},
        Geolocation,
        BarcodeScanner
    ],

    bootstrap: [AppComponent]
})
export class AppModule {}


