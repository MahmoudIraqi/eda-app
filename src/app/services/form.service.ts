import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiBaseUrl = environment.apiURL;
  constructor(private http: HttpClient) { }

  getRequestTypeLookUp(){
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}registration_type`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }
  getMarketingTypeLookUp(){
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}marketing_type`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }
  getCountryLookUp(){
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}country`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }
  getFunctionLookUp(){
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}function`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }
  getManufacturingCompanyLookUp(){
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}manufactory_company`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }
  getPackagingTypeLookUp(){
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}packaging_type`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }
  getPhysicalStateLookUp(){
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}product_physical_state`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }
  getUnitOfMeasureLookUp(){
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}UOM`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }
  getUsePurposeLookUp(){
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}use_purpose`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    return throwError(`Error! ${error.error}`);
  }
}
