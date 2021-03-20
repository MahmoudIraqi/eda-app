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

  // loginAPIURL = environment.loginAPIURL;

  constructor(private http: HttpClient) {
  }

  loginAPIToken(data) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    const newStructure = {
      UserName: data.username,
      UserPassword: data.password,
    };

    const JSONData = JSON.stringify(newStructure);

    return this.http.post(`${this.apiBaseUrl}Accounts/Login?username=${data.username}&password=${data.password}`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
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

    return this.http.get(`${this.apiBaseUrl}requests?Type=track&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackGeneralEnquiriesList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests/InqueryData?Type=track&pageSize=5000&pageNo=1`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackReRegistrationRequestsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests/GetReRegRequestData?Type=track&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackVariationRequestsList(whichVariation) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests/GetVariationRequestData?Type=track&variationTypeID=${whichVariation === 'do_tell-variation' ? 4 : 3}&pageNo=1&pageSize=5000`, options)
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

    return this.http.get(`${this.apiBaseUrl}Requests?Type=draft&pageNo=1&pageSize=5000`, options)
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

    return this.http.get(`${this.apiBaseUrl}Requests?Type=approved&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getBatchList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}/product_batches`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getDraftVariationProductsList(whichVariation) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests/GetVariationRequestData?Type=draft&variationTypeID=${whichVariation === 'do_tell-variation' ? 4 : 3}&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getRejectedProductsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}/Requests?Type=rejected&pageNo=1&pageSize=50000`, options)
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

  getNotificationLogsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}notification_log`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setSeenNotificationByID(id) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.post(`${this.apiBaseUrl}notification_log/SeenNotificaion?id=${id}`, {}, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setReRegistrationProduct(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    event = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}requests/ReregRequest`, event, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setReRegistrationKitProduct(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    event = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}RequestsKit/ReregRequest`, event, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setVariationProduct(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    event = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}requests/VariationRequest`, event, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setManufacturingCompany(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    const data = {
      NAME: event.manufacturingCompany,
      COUNTRY_ID: event.manufacturingCountry
    };

    const JSONData = JSON.stringify(data);

    return this.http.post(`${this.apiBaseUrl}manufactory_company`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setGeneralEnquiries(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    const data = {
      recieptValue: event.receiptValue,
      recieptNumber: event.receiptNumber,
      TITLE: event.title,
      DESCRIPTION: event.description,
    };

    const JSONData = JSON.stringify(data);

    return this.http.post(`${this.apiBaseUrl}Requests/PostInquery`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setBatch(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    const JSONData = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}/product_batches`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getVariationRequiredFields(typeOfRegistrationId, whichVariation) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}variation_group_fields?regTypeID=${typeOfRegistrationId}&variatonTypeId=${whichVariation}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(`Error! ${error.message}`);
  }
}
