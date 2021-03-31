import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError, filter, distinctUntilChanged} from 'rxjs/operators';
import {InputService} from './input.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _isLoggedIn: boolean;
  apiBaseUrl = environment.apiURL;
  Token;

  // loginAPIURL = environment.loginAPIURL;

  constructor(private http: HttpClient,
              private inputService: InputService) {
  }

  getToken() {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'Token'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.Token = res.payload;
    });
  }

  loginAPIToken(data) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    const options = {headers};

    const newStructure = {
      UserName: data.username,
      UserPassword: data.password,
    };

    const JSONData = JSON.stringify(newStructure);

    return this.http.post(`${this.apiBaseUrl}Accounts/Login?username=${data.username}&password=${data.password}`, JSONData, options)
      .pipe(map((res: any) => {
          if (res.Status === '1') {
            this.isLoggedIn = true;
            return res;
          }
        }),
        catchError(this.handleError));
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  set isLoggedIn(v) {
    this._isLoggedIn = v;
  }

  getRequestTypeLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}registration_type`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getMarketingTypeLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}marketing_type`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getCountryLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}country`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getFunctionLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}function`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getManufacturingCompanyLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}manufactory_company`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getPackagingTypeLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}packaging_type`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getPhysicalStateLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}product_physical_state`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getUnitOfMeasureLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}UOM`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getUsePurposeLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}use_purpose`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getProductColorLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}product_colour`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getProductIngrediantsLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}ingredients`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getCompanyProfileLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}company_profile`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getStoragePlaceLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}storage_place`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackTypeLookUp() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}track_type`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  createProductRequest(data) {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
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
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
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
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}requests?Type=track&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackGeneralEnquiriesList() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests/InqueryData?Type=track&pageSize=5000&pageNo=1`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackReRegistrationRequestsList() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests/GetReRegRequestData?Type=track&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackVariationRequestsList(whichVariation) {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests/GetVariationRequestData?Type=track&variationTypeID=${whichVariation === 'do_tell-variation' ? 4 : 3}&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getDraftRequestsList() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests?Type=draft&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getApprovedProductsList() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests?Type=approved&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getApprovedLegacyProductsList() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests/GetLegacyProducts?Type=approved&pageNo=1&pageSize=50000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackLegacyProductsList() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests/GetLegacyProducts?Type=track&pageNo=1&pageSize=50000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getDraftLegacyProductsList() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests/GetLegacyProducts?Type=draft&pageNo=1&pageSize=50000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getBatchList() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}/product_batches`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getDraftVariationProductsList(whichVariation) {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Requests/GetVariationRequestData?Type=draft&variationTypeID=${whichVariation === 'do_tell-variation' ? 4 : 3}&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getRejectedProductsList() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}/Requests?Type=rejected&pageNo=1&pageSize=50000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getProductWithNotificationNumberList(notificationNumber, typeParameter) {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}product/GetProductByNotificationNO?NotifictionNo=${notificationNumber}&type=${typeParameter}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getProductWithProductIDList(productID) {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}request/GetProductByProductID?ID=${productID}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getLegacyProductWithProductIDList(productID) {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Request/GetProductLegacyByProductID?ID=${productID}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getNotificationLogsList() {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}notification_log`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setSeenNotificationByID(id) {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.post(`${this.apiBaseUrl}notification_log/SeenNotificaion?id=${id}`, {}, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setReRegistrationProduct(event) {
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
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
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
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
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
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
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
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
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
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
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
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
    this.getToken();

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
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
