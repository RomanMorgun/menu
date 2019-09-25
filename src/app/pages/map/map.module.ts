import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapPage } from './map.page';

import {RouteParamService} from "../../shared/services/route-param.service";
import {SharedModule} from "../../shared/shared.module";
import {AgmCoreModule} from "@agm/core";




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
  declarations: [MapPage],
  providers: [ RouteParamService ],

})
export class MapPageModule {}
