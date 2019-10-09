import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MapPage} from './map.page';

import {RouteParamService} from '../../shared/services/route-param.service';
import {SharedModule} from '../../shared/shared.module';
import {AgmCoreModule} from '@agm/core';

import {ModalComponent} from './modal/modal.component';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';


const routes: Routes = [
    {
        path: '',
        component: MapPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR API KEY',
            libraries: ['places'],
        }),
    ],
    declarations: [
        MapPage,
        ModalComponent
    ],
    entryComponents: [ModalComponent],
    providers: [RouteParamService, GoogleMaps],

})
export class MapPageModule {
}
