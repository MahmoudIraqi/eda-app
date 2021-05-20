import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError, filter, distinctUntilChanged, tap} from 'rxjs/operators';
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

    return this.http.get(`${this.apiBaseUrl}LoginApi?username=${data.username}&password=${data.password}`, options)
      .pipe(
        distinctUntilChanged(),
        tap((res: any) => {
          if (res.Status === '1') {
            this.isLoggedIn = true;
          }
          return res;
        }),
        catchError(this.handleError));
  }

  logoutAPIToken(token) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': token
    });
    const options = {headers};

    return this.http.post(`${this.apiBaseUrl}Logout`, '', options)
      .pipe(map((res: any) => {
          this.isLoggedIn = false;
          return res;
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
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/registrationtype`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getMarketingTypeLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/marketingtype`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getCountryLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/Country`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getFunctionLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/functions`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getManufacturingCompanyLookUp(page, filterText) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/manufactorycompany?pagesize=100&pageNo=${page}&searchname=${filterText}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getPackagingTypeLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/packagingtype`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getPhysicalStateLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/productphysicalstate`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getUnitOfMeasureLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/unitofmessure`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getUsePurposeLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/usepurpose`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getProductColorLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/productcolour`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getProductIngrediantsLookUp(page, filterText) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/ingredients?pagesize=100&pageNo=${page}&searchname=${filterText}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getCompanyProfileLookUp(page, companyProfile, filterText) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/CompanyProfile?pageNo=${page}&pageSize=100&companyprofileid=${companyProfile}&searchName=${filterText}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getStoragePlaceLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/storageplaces`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackTypeLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/tracktype`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  createProductRequest(data) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });

    const options = {headers};

    data = JSON.stringify(data);
    console.log('data', data);

    return this.http.post(`${this.apiBaseUrl}product/Notification`, data, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  createProductKitRequest(data) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });

    const options = {headers};

    data = JSON.stringify(data);
    console.log('data_JSON', data);

    return this.http.post(`${this.apiBaseUrl}product/KitNotification`, data, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackRequestsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetNotificationList?Type=track&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackGeneralEnquiriesList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/InqueryData?Type=track&pageSize=5000&pageNo=1`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackReRegistrationRequestsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetReRegRequestData?Type=track&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackVariationRequestsList(whichVariation) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetVariationRequestData?Type=track&variationTypeID=${whichVariation === 'do_tell_variation' ? 4 : 3}&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getDraftRequestsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetNotificationList?Type=draft&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getApprovedProductsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetNotificationList?Type=approved&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getApprovedLegacyProductsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetLegacyProducts?Type=approved&pageNo=1&pageSize=50000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getTrackLegacyProductsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetLegacyProducts?Type=track&pageNo=1&pageSize=50000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getDraftLegacyProductsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetLegacyProducts?Type=draft&pageNo=1&pageSize=50000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getBatchList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/productbatches`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getDraftVariationProductsList(whichVariation) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetVariationRequestData?Type=draft&variationTypeID=${whichVariation === 'do_tell_variation' ? 4 : 3}&pageNo=1&pageSize=5000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getRejectedProductsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetNotificationList?Type=rejected&pageNo=1&pageSize=50000`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getProductWithNotificationNumberList(notificationNumber, typeParameter) {
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
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetProductByProductID?ID=${productID}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getLegacyProductWithProductIDList(productID) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Product/GetProductLegacyByProductID?ID=${productID}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getNotificationLogsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/notificationlog`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setSeenNotificationByID(id) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.post(`${this.apiBaseUrl}product/SeenNotificaion?id=${id}`, {}, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setReRegistrationProduct(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    event = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}product/ReNotification`, event, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setReRegistrationKitProduct(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    event = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}product/KitReNotification`, event, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setVariationProduct(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    event = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}product/VariationRequest`, event, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setManufacturingCompany(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    const data = {
      id: 0,
      NAME: event.manufacturingCompany,
      COUNTRY_ID: event.manufacturingCountry,
      manuFactureAttach: event.attachment
    };

    const JSONData = JSON.stringify(data);

    return this.http.post(`${this.apiBaseUrl}product/manufactorycompany`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setGeneralEnquiries(event) {
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
      generalInqueryFile: event.attachment
    };

    const JSONData = JSON.stringify(data);

    return this.http.post(`${this.apiBaseUrl}product/PostInquery`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setCustomRelease(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    const JSONData = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}product/CustomRelease`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setBatch(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    const JSONData = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}product/productbatches`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setAttachmentFile(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    const JSONData = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}product/UploadAttachment`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAttachmentFileByID(requestID, attachmentName) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}product/GetAttachment?requestId=${requestID}&attachmentName=${attachmentName}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getVariationRequiredFields(typeOfRegistrationId, whichVariation) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/variationgroups?regTypeID=${typeOfRegistrationId}&variatonTypeId=${whichVariation}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getVariablesPricesLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/variables`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.isLoggedIn = false;
    }
    return throwError(`Error! ${error.message}`);
  }
}
