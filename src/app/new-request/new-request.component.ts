import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormGroupDirective, FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {FormService} from '../services/form.service';
import {convertToSpecialObject} from '../../utils/formDataFunction';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {InputService} from '../services/input.service';
import {CurrencyPipe} from '@angular/common';


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
  productsKitIds = [];
  manufacturingCompanyList = [];
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
  typeOfProcess;
  updatingProductData: any;
  requestId;
  estimatedValue;
  getAllLookupsStatus = false;
  companyProfileId: any;
  variablesPricingList: any;
  trackTypeVariable;
  trackTypeVariableForKitLookups;
  typeOfNotificationVariableForKitLookups;
  typeOfNotificationVariable;
  fromAttachment;
  editFormIPStatus: boolean = false;
  getDraftProductData: boolean = false;
  isDraftRequestStatus;

  constructor(private getService: FormService, private readonly route: ActivatedRoute, private router: Router,
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


    this.productId = this.route.snapshot.paramMap.get('id');
    this.typeOfProcess = this.route.snapshot.paramMap.get('typeOfProcess');
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'allLookups'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.formData = res.payload;
      this.isLoading = false;

      if (this.productId) {
        this.isLoading = true;
        if (!this.getDraftProductData) {
          this.getService.getProductWithProductIDList(Number(this.productId), this.typeOfProcess).subscribe((res: any) => {
            this.selectedFormType = res.typeOfMarketing;
            this.selectedRequestedType = res.typeOfRegistration;
            this.selectedTrackType = res.Tracktype;
            this.selectedIsExport = res.isExport;
            this.productId = res.id;
            if ((this.typeOfProcess === 'CanBeAppealed' || this.typeOfProcess === 'approvedHoldProductWithRegComment' || this.typeOfProcess === 'approvedHoldProductWithLabsComments') && res.id === 0) {
              res.receiptValue = '';
              res.receiptNumber = '';
              res.receipt = '';
              let indexOfRow;
              res.productAttachments.filter(x => x.attachmentName === 'receipt').map(row => {
                indexOfRow = res.productAttachments.indexOf(row);
              });

              res.productAttachments.splice(indexOfRow, 1);
            }

            this.updatingProductData = res;
            this.editFormIPStatus = true;
            this.isLoading = false;

            if (res.trackCode === 'REJECT' || res.trackCode === 'REJECT_COMP_REPLY_TIMEOUT' || res.trackCode === 'REJECT_COMP_REPLY_WRONG' || res.trackCode === 'REJECT_APPEAL1') {
              this.getPricing('Appeal');
            } else {
              this.getPricing('draftRequest');
            }
            this.getProductsKitLookups('draftRequest');
          }, error => {
            console.log('err', error);
            this.handleError(error);
          });
        }
      }
    });
  }

  getFormType(event) {
    this.selectedFormType ? this.selectedFormType = '' : null;
    this.isLoading = true;

    setTimeout(() => {
      this.selectedFormType = event.value;
      this.getProductsKitLookups('selectedFormType');
      this.isLoading = false;
    }, 500);
  }

  getRequestType(event) {
    this.selectedRequestedType ? this.selectedRequestedType = '' : null;
    this.isLoading = true;

    event !== 3 || event !== 4 || event !== 7 || event !== 8 ? this.selectedIsExport = false : null;

    setTimeout(() => {
      this.selectedRequestedType = event.value;
      this.isLoading = false;
      this.getPricing('typeOfNotification');
    }, 500);
  }

  getTrackType(event) {
    this.selectedTrackType ? this.selectedTrackType = '' : null;
    this.isLoading = true;

    setTimeout(() => {
      this.selectedTrackType = event.value;
      this.isLoading = false;
      this.getPricing('trackType');
      this.getProductsKitLookups('trackType');
    }, 500);
  }

  getRequestId(event) {
    this.requestId = event;
  }

  saveData(event) {
    this.isLoading = true;

    if (this.selectedFormType === 1 || this.selectedFormType === 3 || this.selectedFormType === 5 || this.selectedFormType === 6) {
      const id = Number(this.productId ? this.productId : this.requestId ? this.requestId : this.selectedFormType === 1 ? this.saveResponseDataForRegisterProduct ? this.saveResponseDataForRegisterProduct : null : this.saveResponseDataForRegisterColorantProduct ? this.saveResponseDataForRegisterColorantProduct : null);
      const newEvent = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, id, event);

      const newEventObject = {
        ...newEvent,
        isDraft: this.updatingProductData && (this.updatingProductData.isDraft || this.updatingProductData.isDraft === 0) ? this.updatingProductData.isDraft : 1
      };

      this.getService.createProductRequest(newEventObject).subscribe((res: any) => {
        this.selectedFormType === 1 ? this.saveResponseDataForRegisterProduct = res.id : this.saveResponseDataForRegisterColorantProduct = res.id;
        this.updatingProductData = res;
        this.editFormIPStatus = false;
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSaveRequest();
        this.onClosed();
      }, error => this.handleError(error));
    } else if (this.selectedFormType === 2 || this.selectedFormType === 4) {
      const id = Number(this.productId ? this.productId : this.requestId ? this.requestId : this.selectedFormType === 2 ? this.saveResponseDataForRegisterKitProduct ? this.saveResponseDataForRegisterKitProduct : null : this.saveResponseDataForRegisterColorantKitProduct ? this.saveResponseDataForRegisterColorantKitProduct : null);
      const newEvent = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, id, event);

      const newEventObject = {
        ...newEvent,
        isDraft: this.updatingProductData && (this.updatingProductData.isDraft || this.updatingProductData.isDraft === 0) ? this.updatingProductData.isDraft : 1
      };

      this.getService.createProductKitRequest(newEventObject).subscribe((res: any) => {
        this.selectedFormType === 2 ? this.saveResponseDataForRegisterKitProduct = res.id : this.saveResponseDataForRegisterColorantKitProduct = res.id;
        this.updatingProductData = res;
        this.editFormIPStatus = false;
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
      const id = Number(this.productId ? this.productId : event.id ? event.id : this.selectedFormType === 1 ? this.saveResponseDataForRegisterProduct ? this.saveResponseDataForRegisterProduct : null : this.saveResponseDataForRegisterColorantProduct ? this.saveResponseDataForRegisterColorantProduct : null);
      const newEvent = convertToSpecialObject('submit', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, id, event);

      this.getService.createProductRequest(newEvent).subscribe((res: any) => {
        this.isLoading = false;
        this.successSubmission = true;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.emptyTheTopField();
        this.onClosed();
      }, error => this.handleError(error));
    } else if (this.selectedFormType === 2 || this.selectedFormType === 4) {
      const id = Number(this.productId ? this.productId : event.id ? event.id : this.selectedFormType === 2 ? this.saveResponseDataForRegisterKitProduct ? this.saveResponseDataForRegisterKitProduct : null : this.saveResponseDataForRegisterColorantKitProduct ? this.saveResponseDataForRegisterColorantKitProduct : null);
      const newEvent = convertToSpecialObject('submit', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, id, event);

      this.getService.createProductKitRequest(newEvent).subscribe((res: any) => {
        this.isLoading = false;
        this.successSubmission = true;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.emptyTheTopField();
        this.onClosed();
      }, error => this.handleError(error));

    } else if (this.selectedFormType === 5 || this.selectedFormType === 6) {
      const id = Number(this.productId ? this.productId : event.id ? event.id : this.selectedFormType === 5 ? this.saveResponseDataForRegisterProduct ? this.saveResponseDataForRegisterProduct : null : this.saveResponseDataForRegisterColorantProduct ? this.saveResponseDataForRegisterColorantProduct : null);
      const statusOfApproveWithComment = this.typeOfProcess === 'approvedProductWithLabsComments' || this.typeOfProcess === 'approvedProductWithRegComment' || (this.updatingProductData && (this.updatingProductData.trackCode === 'APPROVE_REG_COMM' || this.updatingProductData.trackCode === 'APPROVE_LAB_COMM'));
      const newEvent = convertToSpecialObject(event.isDraft === 0 || statusOfApproveWithComment ? 'submit' : 'submitProductForKit', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, id, event);

      this.getService.createProductRequest(newEvent).subscribe((res: any) => {
        this.updatingProductData = res;
        this.editFormIPStatus = false;
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSaveRequest();
        this.emptyTheTopField();
        this.onClosed();
      }, error => this.handleError(error));
    }
  }

  alertForSaveRequest() {
    return {msg: 'You had a successful saving'};
  }

  alertSaveRequestForKit() {
    return {msg: 'You can apply this product in kit with request id'};
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
    this.estimatedValue = '';

    setTimeout(() => {
      this.router.navigate([`/new-request/registration`]);
    }, 2000);

  }

  handleError(error) {
    this.isLoading = false;
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: error};
  }

  getPricing(fromWhere) {
    if (fromWhere === 'trackType') {
      this.trackTypeVariable = this.formData.trackType[this.selectedTrackType - 1].CODE;
    } else if (fromWhere === 'typeOfNotification') {
      this.typeOfNotificationVariable = this.formData.requestType[this.selectedRequestedType - 1].CODE;
    } else if (fromWhere === 'draftRequest') {
      this.trackTypeVariable = this.formData.trackType[this.selectedTrackType - 1].CODE;
      this.typeOfNotificationVariable = this.formData.requestType[this.selectedRequestedType - 1].CODE;
    } else if (fromWhere === 'Appeal') {
      this.trackTypeVariable = this.formData.trackType[this.selectedTrackType - 1].CODE;
      this.typeOfNotificationVariable = 'APPEAL';
    }

    if (this.trackTypeVariable && this.typeOfNotificationVariable) {
      const concatVariableCode = `${this.trackTypeVariable}_${this.typeOfNotificationVariable}`;

      this.variablesPricingList.LKUPVARIABLESDto && this.variablesPricingList.LKUPVARIABLESDto.length > 0 ? this.variablesPricingList.LKUPVARIABLESDto.filter(x => x.varCode === concatVariableCode).map(y => {
        this.estimatedValue = this.currencyPipe.transform(y.variableValue, 'EGP', 'symbol');
      }) : null;
    }
  }

  getProductsKitLookups(fromWhere) {
    if (fromWhere === 'trackType') {
      this.trackTypeVariableForKitLookups = this.formData.trackType[this.selectedTrackType - 1].CODE;
    } else if (fromWhere === 'selectedFormType') {
      this.typeOfNotificationVariableForKitLookups = this.formData.formType[this.selectedFormType - 1].CODE;
    } else if (fromWhere === 'draftRequest') {
      this.trackTypeVariableForKitLookups = this.formData.trackType[this.selectedTrackType - 1].CODE;
      this.typeOfNotificationVariableForKitLookups = this.formData.formType[this.selectedFormType - 1].CODE;
    }

    if (this.trackTypeVariableForKitLookups !== undefined && this.typeOfNotificationVariableForKitLookups !== undefined && (this.typeOfNotificationVariableForKitLookups === 'REG_KIT' || this.typeOfNotificationVariableForKitLookups === 'REG_HAIR_KIT')) {
      this.getService.getProductsKitIdLookupsRequest(this.typeOfNotificationVariableForKitLookups, this.trackTypeVariableForKitLookups).subscribe((res) => {
        this.productsKitIds = res;
        this.inputService.publish({type: 'lookupForProductsKitIds', payload: this.productsKitIds});
      }, error => {
        this.handleError(error);
      });
    }
  }

  filterInBigSizeLookups(whichLookups, value) {
    if (whichLookups === 'manufacturingCompany') {
      this.getService.getManufacturingCompanyLookUp(1, value).subscribe((res: any) => {
        this.manufacturingCompanyList = res;
        this.formData.licenseHolderList = res;
        this.isLoading = false;
      }, error => this.handleError(error));
    } else if (whichLookups === 'companyProfile') {
      this.getService.getCompanyProfileLookUp(1, this.companyProfileId, value).subscribe((res: any) => {
        this.isLoading = false;
      }, error => this.handleError(error));
    } else if (whichLookups === 'ingrediant') {
      this.getService.getProductIngrediantsLookUp(1, value).subscribe((res: any) => {
        this.formData.ingrediantList = res;
        this.isLoading = false;
      }, error => this.handleError(error));
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

  isDraftRequest(event) {
    this.isDraftRequestStatus = event;
  }
}
