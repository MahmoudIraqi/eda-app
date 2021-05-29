import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormGroupDirective, FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {FormService} from '../services/form.service';
import {convertToSpecialObject} from '../../utils/formDataFunction';
import {ActivatedRoute} from '@angular/router';
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

  constructor(private getService: FormService, private readonly route: ActivatedRoute,
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
    this.getService.getMarketingTypeLookUp().subscribe((res: any) => {
      this.formData.formType = res;
      if (res) {
        this.formData.formTypeForNewProductInKit = res.filter(x => x.ID === 1 || x.ID === 3).map(x => x);
      }
    }, error => this.handleError(error), () => {
      this.getService.getRequestTypeLookUp().subscribe((res: any) => {
        this.formData.requestType = res;
      }, error => this.handleError(error), () => {
        this.getService.getCountryLookUp().subscribe((res: any) => {
          this.formData.manufacturingCountryList = res;
          this.formData.licenseHolderCountryList = res;
        }, error => this.handleError(error), () => {
          this.getService.getManufacturingCompanyLookUp(1, '').subscribe((res: any) => {
            this.formData.manufacturingCompanyList = res;
            this.formData.licenseHolderList = res;
          }, error => this.handleError(error), () => {
            this.getService.getFunctionLookUp().subscribe((res: any) => {
              this.formData.functionList = res;
            }, error => this.handleError(error), () => {
              this.getService.getPackagingTypeLookUp().subscribe((res: any) => {
                this.formData.typeOfPackagingList = res;
              }, error => this.handleError(error), () => {
                this.getService.getPhysicalStateLookUp().subscribe((res: any) => {
                  this.formData.physicalStateList = res;
                }, error => this.handleError(error), () => {
                  this.getService.getUnitOfMeasureLookUp().subscribe((res: any) => {
                    this.formData.unitOfMeasureList = res;
                  }, error => this.handleError(error), () => {
                    this.getService.getUsePurposeLookUp().subscribe((res: any) => {
                      this.formData.purposeOfUseList = res;
                    }, error => this.handleError(error), () => {
                      this.getService.getProductColorLookUp().subscribe((res: any) => {
                        this.formData.productColorList = res;
                      }, error => this.handleError(error), () => {
                        this.getService.getProductIngrediantsLookUp(1, '').subscribe((res: any) => {
                          this.formData.ingrediantList = res;
                        }, error => this.handleError(error), () => {
                          this.getService.getCompanyProfileLookUp(1, this.companyProfileId, '').subscribe((res: any) => {
                            this.formData.applicantList = res;
                          }, error => this.handleError(error), () => {
                            this.getService.getStoragePlaceLookUp().subscribe((res: any) => {
                              this.formData.storagePlaceList = res;
                            }, error => this.handleError(error), () => {
                              this.getService.getTrackTypeLookUp().subscribe((res: any) => {
                                this.formData.trackType = res;
                              }, error => this.handleError(error), () => {
                                this.getDraftProductData = false;
                                this.isLoading = false;

                                this.productId = this.route.snapshot.paramMap.get('id');
                                if (this.productId) {
                                  this.isLoading = true;
                                  if (!this.getDraftProductData) {
                                    this.getService.getProductWithProductIDList(Number(this.productId), '').subscribe((res: any) => {
                                      this.selectedFormType = res.typeOfMarketing;
                                      this.selectedRequestedType = res.typeOfRegistration;
                                      this.selectedTrackType = res.Tracktype;
                                      this.selectedIsExport = res.isExport;
                                      this.updatingProductData = res;
                                      this.editFormIPStatus = true;
                                      this.isLoading = false;

                                      this.getPricing('draftRequest');
                                      this.getProductsKitLookups('draftRequest');
                                    }, error => this.handleError(error));
                                  }
                                }
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
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
        isDraft: this.updatingProductData && this.updatingProductData.isDraft && this.updatingProductData.isDraft === 0 ? this.updatingProductData.isDraft : 1
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
        isDraft: this.updatingProductData && this.updatingProductData.isDraft && this.updatingProductData.isDraft === 0 ? this.updatingProductData.isDraft : 1
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
    if (this.selectedFormType === 1 || this.selectedFormType === 3 || this.selectedFormType === 5 || this.selectedFormType === 6) {
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

    } else if (this.selectedFormType === 5) {
      const id = Number(this.productId ? this.productId : this.requestId ? this.requestId : this.selectedFormType === 2 ? this.saveResponseDataForRegisterKitProduct ? this.saveResponseDataForRegisterKitProduct : null : this.saveResponseDataForRegisterColorantKitProduct ? this.saveResponseDataForRegisterColorantKitProduct : null);
      const newEvent = convertToSpecialObject('submitProductForKit', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, id, event);

      this.getService.createProductRequest(newEvent).subscribe((res: any) => {
        this.selectedFormType === 2 ? this.saveResponseDataForRegisterKitProduct = res.id : this.saveResponseDataForRegisterColorantKitProduct = res.id;
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
  }

  handleError(error) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: error.message};
    this.isLoading = false;
  }

  getPricing(fromWhere) {
    if (fromWhere === 'trackType') {
      this.trackTypeVariable = this.formData.trackType[this.selectedTrackType - 1].CODE;
    } else if (fromWhere === 'typeOfNotification') {
      this.typeOfNotificationVariable = this.formData.requestType[this.selectedRequestedType - 1].CODE;
    } else if (fromWhere === 'draftRequest') {
      this.trackTypeVariable = this.formData.trackType[this.selectedTrackType - 1].CODE;
      this.typeOfNotificationVariable = this.formData.requestType[this.selectedRequestedType - 1].CODE;
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
    messageStatus ? this.handleError({message: 'please complete the required values which marked with *'}) : null;
  }

  enableLoadingForAttachment(event) {
    if (event) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  }
}
