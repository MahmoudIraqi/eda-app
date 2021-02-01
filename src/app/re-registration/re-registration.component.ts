import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';
import {convertToSpecialObject} from '../../utils/formDataFunction';

@Component({
  selector: 'app-re-registration',
  templateUrl: './re-registration.component.html',
  styleUrls: ['./re-registration.component.css']
})
export class ReRegistrationComponent implements OnInit {

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

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getService.getMarketingTypeLookUp().subscribe((res: any) => {
      this.formData.formType = res;
      if (res) {
        this.formData.formTypeForNewProductInKit = res.filter(x => x.ID === 1 || x.ID === 3).map(x => x);
      }
      this.isLoading = false;
    });
    this.getService.getRequestTypeLookUp().subscribe((res: any) => {
      this.formData.requestType = res;
      this.isLoading = false;
    });
    this.getService.getCountryLookUp().subscribe((res: any) => {
      this.formData.manufacturingCountryList = res;
      this.formData.licenseHolderCountryList = res;
      this.isLoading = false;
    });
    this.getService.getManufacturingCompanyLookUp().subscribe((res: any) => {
      this.formData.manufacturingCompanyList = res;
      this.isLoading = false;
    });
    this.getService.getFunctionLookUp().subscribe((res: any) => {
      this.formData.functionList = res;
      this.isLoading = false;
    });
    this.getService.getPackagingTypeLookUp().subscribe((res: any) => {
      this.formData.typeOfPackagingList = res;
      this.isLoading = false;
    });
    this.getService.getPhysicalStateLookUp().subscribe((res: any) => {
      this.formData.physicalStateList = res;
      this.isLoading = false;
    });
    this.getService.getUnitOfMeasureLookUp().subscribe((res: any) => {
      this.formData.unitOfMeasureList = res;
      this.isLoading = false;
    });
    this.getService.getUsePurposeLookUp().subscribe((res: any) => {
      this.formData.purposeOfUseList = res;
      this.isLoading = false;
    });
    this.getService.getProductColorLookUp().subscribe((res: any) => {
      this.formData.productColorList = res;
      this.isLoading = false;
    });
    this.getService.getProductIngrediantsLookUp().subscribe((res: any) => {
      this.formData.ingrediantList = res;
      this.isLoading = false;
    });
    this.getService.getCompanyProfileLookUp().subscribe((res: any) => {
      this.formData.applicantList = res;
      this.formData.licenseHolderList = res;
      this.isLoading = false;
    });
    this.getService.getStoragePlaceLookUp().subscribe((res: any) => {
      this.formData.storagePlaceList = res;
      this.isLoading = false;
    });
    this.getService.getTrackTypeLookUp().subscribe((res: any) => {
      this.formData.trackType = res;
      this.isLoading = false;
    });
  }

  applyProduct(NotificationNo) {
    this.isLoading = true;
    this.getService.getProductWithNotificationNumberList(NotificationNo).subscribe((res: any) => {
      console.log('res', res);
      this.productData = res;
      this.isLoading = false;
    });
  }

  onSubmit(event) {
    this.isLoading = true;
    if (this.productData.typeOfMarketing === 1 || this.productData.typeOfMarketing === 3) {

      const data = {
        ...this.productData,
        receiptNumber: event.receiptNumber,
        receiptValue: event.receiptValue,
        otherFees: event.otherFees,
        receipt: event.receipt
      };

      console.log('data', data);

      this.getService.setReRegistrationProduct(data).subscribe((res: any) => {
        console.log('res', res);
        this.isLoading = false;
      });
    } else if (this.productData.typeOfMarketing === 2 || this.productData.typeOfMarketing === 4) {
      // event = convertToSpecialObject('submit', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, '', event);
      //
      // this.getService.createProductKitRequest(event).subscribe((res: any) => {
      //   this.isLoading = false;
      //   this.successSubmission = true;
      //   this.alertNotificationStatus = true;
      //   this.alertNotification = this.alertForSubmitRequest();
      //   this.emptyTheTopField();
      //   this.onClosed();
      // });

    }
  }
}
