import {Component, OnChanges, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormService} from '../services/form.service';
import {ActivatedRoute} from '@angular/router';
import {InputService} from '../services/input.service';
import {CurrencyPipe} from '@angular/common';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-variation',
  templateUrl: './variation.component.html',
  styleUrls: ['./variation.component.css']
})
export class VariationComponent implements OnInit, OnChanges {

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
  productNotificationNumber;
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
  variationID;
  enableEditableFields = [];
  typeOfProcess;
  dataInAnyError: any;
  modalRef: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-xl packagingModal',
  };
  @ViewChild('successSubmissionModal') modalDetailedTemplate: TemplateRef<any>;

  constructor(private getService: FormService,
              private modalService: BsModalService, private readonly route: ActivatedRoute, private inputService: InputService, private currencyPipe: CurrencyPipe) {
  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'CompanyId'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.companyProfileId = res.payload;
    });

    this.whichVariation = this.route.snapshot.routeConfig.path.split('/')[0];

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'variablesPrices'),
      distinctUntilChanged()
    ).subscribe(res => {
      res.payload.filter(x => x.groupName.toLowerCase() === this.route.snapshot.routeConfig.path.split('/')[0]).map(variableList => {
        this.variablesPricingList = variableList;
      });
    });

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'allLookups'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.formData = res.payload;
      this.isLoading = false;

      this.productNotificationNumber = this.route.snapshot.paramMap.get('notNumber');
      this.typeOfProcess = this.route.snapshot.paramMap.get('typeOfProcess');
      if (this.productNotificationNumber) {
        this.isLoading = true;
        this.getService.getProductWithProductIDList(this.productNotificationNumber, '').subscribe((res: any) => {
          this.NotificationNo = res.NotificationNo;
          this.selectedFormType = res.typeOfMarketing;
          this.selectedRequestedType = res.typeOfRegistration;
          this.selectedIsExport = res.isExport;
          this.selectedTrackType = res.Tracktype;
          this.productData = res;
          this.typeOfRegistrationForProduct = res.typeOfRegistration;

          this.isLoading = false;
          this.getVariationRequiredFields(this.typeOfRegistrationForProduct, this.whichVariation === 'do_tell_variation' ? 2 : 1);
        }, error => this.handleError(error));
      }
    });
  }

  getTrackType(event) {
    this.selectedTrackType ? this.selectedTrackType = '' : null;
    this.isLoading = true;

    setTimeout(() => {
      this.selectedTrackType = event.value;
      this.isLoading = false;
      this.getPricing();
    }, 500);
  }

  applyProduct(NotificationNo) {
    this.isLoading = true;
    this.getService.getProductWithNotificationNumberList(NotificationNo, 'variation').subscribe((res: any) => {
      if (res.canUse) {
        this.selectedFormType = res.typeOfMarketing;
        this.selectedRequestedType = res.typeOfRegistration;
        this.selectedIsExport = res.isExport;
        this.selectedTrackType = res.Tracktype;
        this.productData = res;
        this.typeOfRegistrationForProduct = res.typeOfRegistration;
        this.isLoading = false;

        res.receiptValue = '';
        res.receiptNumber = '';
        res.receipt = '';
        let indexOfReceiptAttachment;
        res.productAttachments.filter(x => x.attachmentName === 'receipt').map(y => indexOfReceiptAttachment = res.productAttachments.indexOf(y));
        res.productAttachments.splice(indexOfReceiptAttachment, 1);

        this.getVariationRequiredFields(this.typeOfRegistrationForProduct, this.whichVariation === 'do_tell_variation' ? 2 : 1);
      } else {
        this.handleError(res.canuseMsg);
      }
    }, error => this.handleError(error));
  }

  onSave(event) {
    this.isLoading = true;

    const data = {
      ...event,
      typeOfRegistration: this.selectedRequestedType,
      Tracktype: this.selectedTrackType,
      isDraft: 1,
      LKUP_REQ_TYPE_ID: this.whichVariation === 'do_tell_variation' ? 4 : 3
    };

    this.getService.setVariationProduct(data).subscribe((res: any) => {
      this.productData = res;
      this.selectedRequestedType = res.typeOfRegistration;
      this.selectedTrackType = res.Tracktype;
      this.isLoading = false;
      this.alertNotificationStatus = true;
      this.alertNotification = this.alertForSaveRequest();
      this.onClosed();
    }, error => this.handleError(error));
  }

  onSubmit(event) {
    this.isLoading = true;

    const data = {
      ...event,
      typeOfRegistration: this.selectedRequestedType,
      Tracktype: this.selectedTrackType,
      isDraft: 0,
      LKUP_REQ_TYPE_ID: this.whichVariation === 'do_tell_variation' ? 4 : 3
    };

    this.dataInAnyError = data;

    this.getService.setVariationProduct(data).subscribe((res: any) => {
      this.isLoading = false;
      this.emptyTheTopField();
      this.openModal(this.modalDetailedTemplate);
    }, error => this.handleError(error));
  }

  getVariationRequiredFields(typeOfRegistration, whichVariation) {
    this.isLoading = true;

    this.getService.getVariationRequiredFields(typeOfRegistration, whichVariation).subscribe((res: any) => {
      this.variationGroupList = res;
      this.isLoading = false;

      this.productData.variationGroups ? this.productData.variationGroups.map(x => {
        this.variationGroupList.filter(group => group.Code === x).map(groupObject => {
          this.variationFields = [...this.variationFields, groupObject];
          this.typeOfVariationForProduct = this.variationFields;
          this.getPricing();
        });
      }) : null;
    }, error => this.handleError(error));
  }

  onSelectionChange(event) {
    this.variationFields = event.value;
    this.getPricing();
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

  emptyTheTopField() {
    this.productData = '';
    this.NotificationNo = '';
    this.typeOfVariationForProduct = '';
    this.variationGroupList = [];
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
    this.estimatedValue = '';
    this.trackTypeVariable = this.formData.trackType[this.selectedTrackType - 1].CODE;

    let allCodes = [];
    let PricesList = [];

    this.variationFields.map(x => {
      allCodes.push(`${this.trackTypeVariable}_${x.Code}`);
    });

    if (this.trackTypeVariable && allCodes.length > 0) {
      allCodes.map(code => {
        this.variablesPricingList.LKUPVARIABLESDto && this.variablesPricingList.LKUPVARIABLESDto.length > 0 ? this.variablesPricingList.LKUPVARIABLESDto.filter(x => x.varCode === code).map(y => {
          PricesList.push(y.variableValue);
        }) : null;
      });

      this.estimatedValue = this.currencyPipe.transform(PricesList.reduce((acc, curr) => acc + curr), 'EGP', 'symbol');
    } else {
      this.estimatedValue = '';
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

  enableFields(event) {
    this.enableEditableFields.length > 0 ? this.enableEditableFields = [] : null;
    this.isLoading = true;

    setTimeout(() => {
      this.enableEditableFields = event;
      this.isLoading = false;
    }, 200);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  closeSuccessSubmissionModal() {
    this.modalRef.hide();
  }
}
