import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';
import {convertToSpecialObject, convertToSpecialObjectForReNotification} from '../../utils/formDataFunction';
import {InputService} from '../services/input.service';
import {CurrencyPipe} from '@angular/common';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

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
  alertNotification: any;
  alertNotificationStatus: boolean = false;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  estimatedValue;
  selectedTrackType;
  selectedRequestedType;
  selectedFormType;
  selectedIsExport;
  variablesPricingList: any;
  trackTypeVariable;
  typeOfNotificationVariable;
  companyProfileId: any;
  lookupResponse: any;

  constructor(private getService: FormService, private readonly route: ActivatedRoute, private inputService: InputService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'CompanyId'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.companyProfileId = res.payload;
    });

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'variablesPrices'),
      distinctUntilChanged()
    ).subscribe(res => {
      res.payload.filter(x => x.groupName.toLowerCase() === this.route.snapshot.routeConfig.path).map(variableList => {
        this.variablesPricingList = variableList;
      });
    });

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'allLookups'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.formData = res.payload;
      this.isLoading = false;
    });
  }

  applyProduct(NotificationNo) {
    this.isLoading = true;

    this.getService.getProductWithNotificationNumberList(NotificationNo, 'renotification').subscribe((res: any) => {
      if (res.canUse) {
        res.receiptValue = '';
        res.receiptNumber = '';
        res.receipt = '';
        let indexOfReceiptAttachment;
        res.productAttachments.filter(x => x.attachmentName === 'receipt').map(y => indexOfReceiptAttachment = res.productAttachments.indexOf(y));
        res.productAttachments.splice(indexOfReceiptAttachment, 1);

        this.selectedFormType = res.typeOfMarketing;
        this.selectedRequestedType = res.typeOfRegistration;
        this.selectedIsExport = res.isExport;
        this.selectedTrackType = res.Tracktype;
        this.getPricing();
        this.productData = res;
        this.isLoading = false;
      } else {
        this.handleError(res.canuseMsg);
      }
    }, error => this.handleError(error));
  }

  onSubmit(event) {
    this.isLoading = true;

    if (this.productData.typeOfMarketing === 1 || this.productData.typeOfMarketing === 3) {
      const newEvent = convertToSpecialObjectForReNotification('submit', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, this.productData.id, this.productData.NotificationNo, event);

      this.getService.setReRegistrationProduct(newEvent).subscribe((res: any) => {
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.emptyTheTopField();
        this.onClosed();
      }, error => this.handleError(error));
    } else if (this.productData.typeOfMarketing === 2 || this.productData.typeOfMarketing === 4) {
      const newEvent = convertToSpecialObjectForReNotification('submit', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, this.productData.id, this.productData.NotificationNo, event);

      this.getService.setReRegistrationKitProduct(newEvent).subscribe((res: any) => {
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.emptyTheTopField();
        this.onClosed();
      }, error => this.handleError(error));

    }
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
    this.estimatedValue = '';
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

  getPricing() {
    this.trackTypeVariable = this.formData.trackType[this.selectedTrackType - 1].CODE;
    this.typeOfNotificationVariable = this.formData.requestType[this.selectedRequestedType - 1].CODE;

    if (this.trackTypeVariable && this.typeOfNotificationVariable) {
      const concatVariableCode = `${this.trackTypeVariable}_${this.typeOfNotificationVariable}`;

      this.variablesPricingList.LKUPVARIABLESDto && this.variablesPricingList.LKUPVARIABLESDto.length > 0 ? this.variablesPricingList.LKUPVARIABLESDto.filter(x => x.varCode === concatVariableCode).map(y => {
        this.estimatedValue = this.currencyPipe.transform(y.variableValue, 'EGP', 'symbol');
      }) : null;
    }
  }

  showAlertMessager(messageStatus) {
    messageStatus ? this.handleError('please complete the required values which marked with *') : null;
  }

  enableLoadingForAttachment(event) {
    if (event) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  }

}
