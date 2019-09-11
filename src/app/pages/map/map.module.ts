import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapPage } from './map.page';
import {MarkerCluster} from "@ionic-native/google-maps";
import {MarkerCafeComponent} from "./marker-cafe/marker-cafe.component";
import {RouteParamService} from "../../shared/services/route-param.service";

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
    RouterModule.forChild(routes)
  ],
  declarations: [MapPage],
  providers: [ RouteParamService]
})
export class MapPageModule {}
