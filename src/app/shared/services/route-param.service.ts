import {EventEmitter, Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RouteParamService {


  event: any;
  position = {};
  cafeCoordinate: object;
  constructor(
  ) {}


  // GOOGLE MAP PART
  navigationMap(lat: any, lng: any) {
     this.cafeCoordinate = {
        lat: lat,
        lng: lng
      };
     sessionStorage.setItem('geo', JSON.stringify(this.cafeCoordinate));
  }

  // var for event list in marker


  // var for checker selected marker





}
