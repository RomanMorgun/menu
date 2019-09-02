import { Cafe } from '../models/cafe.model';
import { Injectable } from '@angular/core';
import { COMMON_URL } from './common.url';
import {catchError, tap} from 'rxjs/internal/operators';
import { Observable } from 'rxjs/index';
// import { Observable } from 'rxjs/index';
// import { HttpClient } from '@angular/common/http';

import { RequestService } from './request.service';
import { GeolocationService } from './geolocation.service';

@Injectable()
export class CafeService {

    private cafes: Cafe [];

  constructor(
    private requestService: RequestService,
    private geolocationService: GeolocationService
  ) {}

  setCafes(cafes: Cafe[]) {
    this.cafes = cafes;
  }


  returnCafesValue() {
    return this.cafes.slice();
  }

  getAllCafes(): Observable<any> {
    let params: any;
    if (this.geolocationService.currentGeolocation.lat !== null) {
      params = this.geolocationService.currentGeolocation;
      console.log(params);
    }
    return this.requestService.get(`${COMMON_URL.cafe.getAll}`).pipe(
      tap( (result) => {
        this.setCafes(result.data);
        console.log('Get Cafes okey');
      }, (error) => {
        console.log(error);
      })
    );
  }

}

