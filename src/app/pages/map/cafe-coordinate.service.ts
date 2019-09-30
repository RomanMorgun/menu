import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable, throwError} from 'rxjs';

import {HttpClient} from '@angular/common/http';

import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CafeCoordinateService {
  api;
  constructor(private http: HttpClient,
              ) { }

  private errors(error: any) {
    return  throwError(error.error);
  }

  get(nameUrl: any): Observable<any> {
    return this.http.get<any>( this.api + `${nameUrl}`).pipe(catchError(this.errors));
  }




}
