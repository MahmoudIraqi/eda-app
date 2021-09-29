import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormService} from '../services/form.service';
import {convertToSpecialObject, convertToSpecialObjectForReNotification} from '../../utils/formDataFunction';
import {InputService} from '../services/input.service';
import {CurrencyPipe} from '@angular/common';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

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
  productNotificationNumber;
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
              private readonly route: ActivatedRoute,
              private router: Router,
              private modalService: BsModalService,
              private inputService: InputService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'CompanyId'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.companyProfileId = res.payload;
    });

    const pathInEditMode = this.route.snapshot.routeConfig.path.split('/')[0];

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'variablesPrices'),
      distinctUntilChanged()
    ).subscribe(res => {
      const variableGroup = pathInEditMode ? pathInEditMode : this.route.snapshot.routeConfig.path;
      res.payload.filter(x => x.groupName.toLowerCase() === variableGroup).map(variableList => {
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
        this.getService.getProductWithProductIDList(this.productNotificationNumber, this.typeOfProcess).subscribe((res: any) => {
          this.NotificationNo = res.NotificationNo;
          this.selectedFormType = res.typeOfMarketing;
          this.selectedRequestedType = res.typeOfRegistration;
          this.selectedIsExport = res.isExport;
          this.selectedTrackType = res.Tracktype;

          if (this.typeOfProcess === 'CanBeAppealed' || this.typeOfProcess === 'approvedHoldProductWithRegComment' || this.typeOfProcess === 'approvedHoldProductWithLabsComments') {
            res.receiptValue = '';
            res.receiptNumber = '';
            res.receipt = '';
            res.otherFees = '';

            let indexOfReceiptRow;
            res.productAttachments.filter(x => x.attachmentName === 'receipt').map(row => {
              indexOfReceiptRow = res.productAttachments.indexOf(row);
            });
            indexOfReceiptRow ? res.productAttachments.splice(indexOfReceiptRow, 1) : null;
          }

          this.productData = res;
          this.getPricing();
          this.isLoading = false;
        }, error => this.handleError(error));
      }
    });
  }

  applyProduct(NotificationNo) {
    this.isLoading = true;

    this.getService.getProductWithNotificationNumberList(NotificationNo, 'renotification').subscribe((res: any) => {
      if (res.canUse) {
        let newAttachmentLst = [];
        res.receiptValue = '';
        res.receiptNumber = '';
        res.receipt = '';
        res.otherFees = '';

        let indexOfReceiptRow;
        res.productAttachments.filter(x => x.attachmentName === 'receipt').map(row => {
          indexOfReceiptRow = res.productAttachments.indexOf(row);
        });
        indexOfReceiptRow ? res.productAttachments.splice(indexOfReceiptRow, 1) : null;

        let indexOfOtherFeesRow;
        res.productAttachments.filter(x => x.attachmentName === 'otherFees').map(row => {
          indexOfOtherFeesRow = res.productAttachments.indexOf(row);
        });
        indexOfOtherFeesRow ? res.productAttachments.splice(indexOfOtherFeesRow, 1) : null;

        this.selectedFormType = res.typeOfMarketing;
        this.selectedRequestedType = res.typeOfRegistration;
        this.selectedIsExport = res.isExport;
        this.selectedTrackType = res.Tracktype;
        this.productData = res;
        this.isLoading = false;
        this.getPricing();
      } else {
        this.handleError(res.canuseMsg);
      }
    }, error => this.handleError(error));
  }

  onSave(event) {
    this.isLoading = true;

    if (this.productData.typeOfMarketing === 1 || this.productData.typeOfMarketing === 3 || this.productData.typeOfMarketing === 5 || this.productData.typeOfMarketing === 6) {
      const newEvent = convertToSpecialObjectForReNotification('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, this.productData.id, this.productData.NotificationNo, event);

      this.getService.setReRegistrationProduct(newEvent).subscribe((res: any) => {
        this.isLoading = false;
        this.productData = res;
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSaveRequest();
      }, error => this.handleError(error));
    } else if (this.productData.typeOfMarketing === 2 || this.productData.typeOfMarketing === 4) {
      const newEvent = convertToSpecialObjectForReNotification('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, this.productData.id, this.productData.NotificationNo, event);

      this.getService.setReRegistrationKitProduct(newEvent).subscribe((res: any) => {
        this.isLoading = false;
        this.productData = res;
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSaveRequest();
      }, error => this.handleError(error));

    }
  }

  onSubmit(event) {
    this.isLoading = true;

    if (this.productData.typeOfMarketing === 1 || this.productData.typeOfMarketing === 3) {
      const newEvent = convertToSpecialObjectForReNotification('submit', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, this.productData.id, this.productData.NotificationNo, event);

      this.dataInAnyError = newEvent;

      this.getService.setReRegistrationProduct(newEvent).subscribe((res: any) => {
        this.isLoading = false;
        this.emptyTheTopField();
        this.openModal(this.modalDetailedTemplate);
      }, error => this.handleError(error));
    } else if (this.productData.typeOfMarketing === 2 || this.productData.typeOfMarketing === 4) {
      const newEvent = convertToSpecialObjectForReNotification('submit', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, this.productData.id, this.productData.NotificationNo, event);

      this.dataInAnyError = newEvent;

      this.getService.setReRegistrationKitProduct(newEvent).subscribe((res: any) => {
        this.isLoading = false;
        this.emptyTheTopField();
        this.openModal(this.modalDetailedTemplate);
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

  alertForSaveRequest() {
    return {msg: 'You had a successful saving'};
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  closeSuccessSubmissionModal() {
    this.modalRef.hide();
  }
}
