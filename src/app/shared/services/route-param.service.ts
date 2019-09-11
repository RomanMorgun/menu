import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RouteParamService {

  event: any;
  position: object;
  cafeCoordinate: object;


  constructor(
  ) {}


  // GOOGLE MAP PART
  navigationMap(lat: any, lng: any) {
   // this.markerCafes.next(undefined);
    this.isCafeOnPage = false;
    this.cafeCoordinate = {
      lat: lat,
      lng: lng
    };
  sessionStorage.setItem('geo', JSON.stringify(this.cafeCoordinate));
    console.log(this.cafeCoordinate);
  }

  // var for event list in marker
  markerCafes = new BehaviorSubject(undefined);


  // var for checker selected marker
  isCafeOnPage = false;


}
