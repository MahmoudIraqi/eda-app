import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-variation',
  templateUrl: './variation.component.html',
  styleUrls: ['./variation.component.css']
})
export class VariationComponent implements OnInit {

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
  NotificationNo;
  productData;
  isLoading: boolean = false;
  typeOfRegistrationForProduct;
  typeOfVariationForProduct;
  variationGroupList;
  alertNotification: any;
  alertNotificationStatus: boolean = false;
  variationFields = [];
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  whichVariation;

  constructor(private getService: FormService, private route: ActivatedRoute) {
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


    console.log('this.route', this.route);
    this.whichVariation = this.route.snapshot.routeConfig.path;
    console.log('this.whichVariation', this.whichVariation);
  }

  applyProduct(NotificationNo) {
    this.isLoading = true;
    this.getService.getProductWithNotificationNumberList(NotificationNo).subscribe((res: any) => {
      this.productData = res;
      this.typeOfRegistrationForProduct = res.typeOfRegistration;
      this.isLoading = false;
      this.getVariationRequiredFields(this.typeOfRegistrationForProduct, this.whichVariation === 'do_tell-variation' ? 2 : 1);
    }, error => this.handleError(error));
  }

  onSave(event) {
    this.isLoading = true;
    if (this.productData.typeOfMarketing === 1 || this.productData.typeOfMarketing === 3) {
      const data = {
        ...this.productData,
        ...event,
        isDraft: 1
      };

      this.getService.setVariationProduct(data).subscribe((res: any) => {
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.emptyTheTopField();
        this.onClosed();
      }, error => this.handleError(error));
    }
  }

  onSubmit(event) {
    this.isLoading = true;
    if (this.productData.typeOfMarketing === 1 || this.productData.typeOfMarketing === 3) {
      const data = {
        ...this.productData,
        ...event,
        LKUP_REQ_TYPE_ID: this.whichVariation === 'do_tell-variation' ? 4 : 3
      };

      console.log('data', data);
      this.getService.setVariationProduct(data).subscribe((res: any) => {
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.emptyTheTopField();
        this.onClosed();
      }, error => this.handleError(error));
    } // else if (this.productData.typeOfMarketing === 2 || this.productData.typeOfMarketing === 4) {
    //   const data = {
    //     ...this.productData,
    //     receiptNumber: event.receiptNumber,
    //     receiptValue: event.receiptValue,
    //     otherFees: event.otherFees,
    //     receipt: event.receipt
    //   };
    //
    //   this.getService.setReRegistrationKitProduct(data).subscribe((res: any) => {
    //     this.isLoading = false;
    //     this.alertNotificationStatus = true;
    //     this.alertNotification = this.alertForSubmitRequest();
    //     this.emptyTheTopField();
    //     this.onClosed();
    //   });
    //
    // }
  }

  getVariationRequiredFields(typeOfRegistration, whichVariation) {
    this.isLoading = true;
    this.getService.getVariationRequiredFields(typeOfRegistration, whichVariation).subscribe((res: any) => {
      this.variationGroupList = res;
      this.isLoading = false;
    }, error => this.handleError(error));
  }

  onSelectionChange(event) {
    this.variationFields = event.value;
  }

  alertForSubmitRequest() {
    return {msg: 'You had a successful Submission'};
  }

  onClosed() {
    setTimeout(() => {
      this.alertNotificationStatus = false;
    }, 2000);
  }

  emptyTheTopField() {
    this.productData = '';
    this.NotificationNo = '';
    this.typeOfVariationForProduct = '';
    this.variationGroupList = [];
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }

  onClosedErrorAlert() {
    setTimeout(() => {
      this.alertErrorNotificationStatus = false;
    }, 2000);
  }

}
