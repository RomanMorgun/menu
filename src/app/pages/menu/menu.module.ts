import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MenuPage} from './menu.page';

import {SharedModule} from '../../shared/shared.module';
import {Geocoder} from '@ionic-native/google-maps';


const routes: Routes = [
    {
        path: '',
        component: MenuPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule,
    ],
    declarations: [MenuPage],
    providers: [Geocoder]
})
export class MenuPageModule {
}
