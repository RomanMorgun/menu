import { Cafe } from '../models/cafe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CafeService {
  private cafes: Cafe[] = [
    new Cafe (
      0,
      'Test Cafe 1',
      'https://frankivsk-online.com/wp-content/uploads/2017/07/logo-new-york-street-pizza-ivano-frankivsk.jpg',
      {x: '292', y: '353'},
      'Chornovola 12',
      [
        {Monday: '10-17'},
        {Tuesday: '10-18'},
        {Wednesday: '10-19'}
      ],
      '09123123123'
      ),
    new Cafe (
      1,
      'Test Cafe 2',
      'https://ua.foodsoul.pro/uploads/chains/34/images/main/10687f0c29d69850e3e669e14a4eeb7a.png',
      {x: '292', y: '353'},
      'Test Street 12',
      [
        {Monday: '10-17'},
        {Tuesday: '10-18'},
        {Wednesday: '10-19'}
      ],
      '09123123123'
    )
  ];

  setCafes(cafes: Cafe[]) {
    this.cafes = cafes;
  }


  getCafes() {
    return this.cafes.slice();
  }
}

