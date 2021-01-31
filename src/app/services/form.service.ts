import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiBaseUrl = environment.apiURL;

  constructor(private http: HttpClient) {
  }

  getRequestTypeLookUp() {
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

  getMarketingTypeLookUp() {
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

  getCountryLookUp() {
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

  getFunctionLookUp() {
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

  getManufacturingCompanyLookUp() {
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

  getPackagingTypeLookUp() {
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

  getPhysicalStateLookUp() {
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

  getUnitOfMeasureLookUp() {
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

  getUsePurposeLookUp() {
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

  getProductColorLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}product_colour`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getProductIngrediantsLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}ingredients`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getCompanyProfileLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}company_profile`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getStoragePlaceLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}storage_place`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackTypeLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}track_type`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  createProductRequest(data) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });

    const options = {headers};

    data = JSON.stringify(data);

    return this.http.post(`${this.apiBaseUrl}requests`, data, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  createProductKitRequest(data) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });

    const options = {headers};

    data = JSON.stringify(data);
    console.log('data', data);

    return this.http.post(`${this.apiBaseUrl}requestsKit`, data, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackRequestsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}requests?Type=track&pageNo=1&pageSize=30`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getDraftRequestsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests?Type=draft&pageNo=1&pageSize=30`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getApprovedProductsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests?Type=approved&pageNo=1&pageSize=30`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getProductWithNotificationNumberList(notificationNumber) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}product/GetProductByNotificationNO?NotifictionNo=${notificationNumber}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getProductWithProductIDList(productID) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}request/GetProductByProductID?ID=${productID}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(`Error! ${error.error}`);
  }
}
