import { Cafe } from '../models/cafe.model';
import { Injectable } from '@angular/core';
import { COMMON_URL } from './common.url';
import {tap} from 'rxjs/internal/operators';
import {Observable, Subject} from 'rxjs/index';

import { RequestService } from './request.service';
import { GeolocationService } from './geolocation.service';

@Injectable()
export class CafeService {

    subject: Subject<object>;
    private cafes: Cafe [];
    cafe: object;

    constructor(
        private requestService: RequestService,
        private geolocationService: GeolocationService

    ) {}

  // private cafes: Cafe[] = [
  //   new Cafe (
  //     0,
  //     'Test Cafe 1',
  //     'https://frankivsk-online.com/wp-content/uploads/2017/07/logo-new-york-street-pizza-ivano-frankivsk.jpg',
  //     {x: '292', y: '353'},
  //     'Chornovola 12',
  //     [
  //       {Monday: '10-17'},
  //       {Tuesday: '10-18'},
  //       {Wednesday: '10-19'}
  //     ],
  //     '09123123123'
  //     ),
  //   new Cafe (
  //     1,
  //     'Test Cafe 2',
  //     'https://ua.foodsoul.pro/uploads/chains/34/images/main/10687f0c29d69850e3e669e14a4eeb7a.png',
  //     {x: '292', y: '353'},
  //     'Test Street 12',
  //     [
  //       {Monday: '10-17'},
  //       {Tuesday: '10-18'},
  //       {Wednesday: '10-19'}
  //     ],
  //     '09123123123'
  //   )
  // ];

  setCafes(cafes: Cafe[]): void {
    this.cafes = cafes;
  }


  returnCafesValue(): Cafe[] {
    return this.cafes.slice();
  }

  getAllCafes(params: object = {}): Observable<any> {
    return this.requestService.get(`${COMMON_URL.cafe.getAll}`, {...params}).pipe(
      tap( (result) => {
        this.setCafes(result.data);
        console.log('Get Cafes okey');
      }, (error) => {
        console.log(error);
      })
    );
  }

  getOneCafe(id): Observable<any> {
    return this.requestService.get(`${COMMON_URL.cafe.getOne}/${ id }`);
  }

  getZoneCafe( obj: any): Observable<any> {
    return this.requestService.get(`${COMMON_URL.cafe.getAll}`, {obj});
  }

  // getWithObj(nameUrl: any, obj: any): Observable<any> {
  //   return this.requestService.get<any>( this.api + nameUrl, {'params': obj}).pipe(catchError(this.errors));
  // }


}

