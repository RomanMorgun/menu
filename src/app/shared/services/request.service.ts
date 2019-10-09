import {Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {retry, catchError, tap} from 'rxjs/internal/operators';
import { Observable, throwError } from 'rxjs/index';
// import { retry  } from 'rxjs/internal/operators';

// import { throwError } from 'rxjs/index';
import { pipe } from 'rxjs/index';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient) {}

  public errorHandler(error: HttpErrorResponse) {

    return throwError('Error Message');
  }


  public get(url: string, params = null): Observable<any> {
    console.log(params);

    return this.http.get(url, {...params}).pipe(
      tap(() => {

      }, (error) => {
        retry(1);
        catchError(this.errorHandler);
      })
    );
  }

  public post(url: string, data?: any): Observable<any> {
    return this.http.post(url, data).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  public put(url: string, data?: any): Observable<any> {
    return this.http.put(url, data).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  public delete(url: string, data?: any): Observable<any> {
    return this.http.delete(url, data).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  // public put()

}

