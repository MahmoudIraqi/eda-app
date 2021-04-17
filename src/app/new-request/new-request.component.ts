import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormGroupDirective, FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {FormService} from '../services/form.service';
import {convertToSpecialObject} from '../../utils/formDataFunction';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {

  formData = {
    formType: [],
    formTypeForNewProductInKit: [],
    requestType: [],
    manufacturingCompanyList: [],
    manufacturingCountryList: [],
    productColorList: [],
    applicantList: [],
    licenseHolderList: [],
    licenseHolderCountryList: [],
    physicalStateList: [],
    purposeOfUseList: [],
    typeOfPackagingList: [],
    unitOfMeasureList: [],
    ingrediantList: [],
    functionList: [],
    storagePlaceList: [],
    trackType: []
  };
  selectedFormType;
  selectedRequestedType;
  selectedTrackType;
  selectedIsExport;
  error: boolean;
  errorMessage;
  successSubmission: boolean = false;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  saveResponseDataForRegisterProduct;
  saveResponseDataForRegisterKitProduct;
  saveResponseDataForRegisterColorantProduct;
  saveResponseDataForRegisterColorantKitProduct;
  productId;
  updatingProductData: any;
  requestId;

  constructor(private getService: FormService, private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getService.getMarketingTypeLookUp().subscribe((res: any) => {
      this.formData.formType = res;
      if (res) {
        this.formData.formTypeForNewProductInKit = res.filter(x => x.ID === 1 || x.ID === 3).map(x => x);
      }
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getRequestTypeLookUp().subscribe((res: any) => {
      this.formData.requestType = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getCountryLookUp().subscribe((res: any) => {
      this.formData.manufacturingCountryList = res;
      this.formData.licenseHolderCountryList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getManufacturingCompanyLookUp().subscribe((res: any) => {
      this.formData.manufacturingCompanyList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getFunctionLookUp().subscribe((res: any) => {
      this.formData.functionList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getPackagingTypeLookUp().subscribe((res: any) => {
      this.formData.typeOfPackagingList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getPhysicalStateLookUp().subscribe((res: any) => {
      this.formData.physicalStateList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getUnitOfMeasureLookUp().subscribe((res: any) => {
      this.formData.unitOfMeasureList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getUsePurposeLookUp().subscribe((res: any) => {
      this.formData.purposeOfUseList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getProductColorLookUp().subscribe((res: any) => {
      this.formData.productColorList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getProductIngrediantsLookUp().subscribe((res: any) => {
      this.formData.ingrediantList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getCompanyProfileLookUp().subscribe((res: any) => {
      this.formData.applicantList = res;
      this.formData.licenseHolderList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getStoragePlaceLookUp().subscribe((res: any) => {
      this.formData.storagePlaceList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
    this.getService.getTrackTypeLookUp().subscribe((res: any) => {
      this.formData.trackType = res;
      this.isLoading = false;
    }, error => this.handleError(error));

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isLoading = true;
      this.getService.getProductWithProductIDList(Number(this.productId)).subscribe((res: any) => {
        console.log('res_ProductId', res);

        this.selectedFormType = res.typeOfMarketing;
        this.selectedRequestedType = res.typeOfRegistration;
        this.selectedTrackType = res.Tracktype;
        this.selectedIsExport = res.isExport;
        this.updatingProductData = res;
      }, error => this.handleError(error));
    }
  }

  getFormType(event) {
    this.selectedFormType = event.value;
  }

  getRequestType(event) {
    this.selectedRequestedType = event.value;
  }

  getTrackType(event) {
    this.selectedTrackType = event.value;
  }

  saveData(event) {
    this.isLoading = true;

    if (this.selectedFormType === 1 || this.selectedFormType === 3) {
      const id = Number(this.productId ? this.productId : this.selectedFormType === 1 ? this.saveResponseDataForRegisterProduct ? this.saveResponseDataForRegisterProduct : null : this.saveResponseDataForRegisterColorantProduct ? this.saveResponseDataForRegisterColorantProduct : null);
      const newEvent = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, id, event);

      console.log('event', newEvent);

      this.getService.createProductRequest(newEvent).subscribe((res: any) => {
        console.log('res', res);
        this.selectedFormType === 1 ? this.saveResponseDataForRegisterProduct = res.id : this.saveResponseDataForRegisterColorantProduct = res.id;
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSaveRequest();
        this.onClosed();
      }, error => this.handleError(error));
    } else if (this.selectedFormType === 2 || this.selectedFormType === 4) {
      const id = Number(this.productId ? this.productId : this.selectedFormType === 2 ? this.saveResponseDataForRegisterKitProduct ? this.saveResponseDataForRegisterKitProduct : null : this.saveResponseDataForRegisterColorantKitProduct ? this.saveResponseDataForRegisterColorantKitProduct : null);
      const newEvent = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, id, event);

      this.getService.createProductKitRequest(newEvent).subscribe((res: any) => {
        this.selectedFormType === 2 ? this.saveResponseDataForRegisterKitProduct = res.id : this.saveResponseDataForRegisterColorantKitProduct = res.id;
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSaveRequest();
        this.onClosed();
      }, error => this.handleError(error));
    }
  }

  onSubmit(event) {
    this.isLoading = true;
    this.successSubmission = false;
    if (this.selectedFormType === 1 || this.selectedFormType === 3) {
      const id = Number(this.productId ? this.productId : this.selectedFormType === 1 ? this.saveResponseDataForRegisterProduct ? this.saveResponseDataForRegisterProduct : null : this.saveResponseDataForRegisterColorantProduct ? this.saveResponseDataForRegisterColorantProduct : null);
      const newEvent = convertToSpecialObject('submit', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, id, event);

      this.getService.createProductRequest(event).subscribe((res: any) => {
        this.isLoading = false;
        this.successSubmission = true;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.emptyTheTopField();
        this.onClosed();
      }, error => this.handleError(error));
    } else if (this.selectedFormType === 2 || this.selectedFormType === 4) {
      const id = Number(this.productId ? this.productId : this.selectedFormType === 2 ? this.saveResponseDataForRegisterKitProduct ? this.saveResponseDataForRegisterKitProduct : null : this.saveResponseDataForRegisterColorantKitProduct ? this.saveResponseDataForRegisterColorantKitProduct : null);
      const newEvent = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, id, event);

      this.getService.createProductKitRequest(newEvent).subscribe((res: any) => {
        this.isLoading = false;
        this.successSubmission = true;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.emptyTheTopField();
        this.onClosed();
      }, error => this.handleError(error));

    }
  }

  alertForSaveRequest() {
    return {msg: 'You had a successful saving'};
  }

  alertForSubmitRequest() {
    return {msg: 'You had a successful Submission'};
  }

  onClosed() {
    setTimeout(() => {
      this.alertNotificationStatus = false;
    }, 2000);
  }

  onClosedErrorAlert() {
    setTimeout(() => {
      this.alertErrorNotificationStatus = false;
    }, 2000);
  }

  emptyTheTopField() {
    this.selectedTrackType = '';
    this.selectedFormType = '';
    this.selectedRequestedType = '';
    this.selectedIsExport = '';
  }

  handleError(error) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: error.message};
    this.isLoading = false;
  }

}
