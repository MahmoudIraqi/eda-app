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

    // const allLookupsRequest = new Promise((resolve, reject) => {
    //   this.getService.getMarketingTypeLookUp().subscribe((res: any) => {
    //     this.formData.formType = res;
    //     if (res) {
    //       this.formData.formTypeForNewProductInKit = res.filter(x => x.ID === 1 || x.ID === 3).map(x => x);
    //     }
    //
    //   });
    //   this.getService.getRequestTypeLookUp().subscribe((res: any) => {
    //     this.formData.requestType = res;
    //
    //   });
    //   this.getService.getCountryLookUp().subscribe((res: any) => {
    //     this.formData.manufacturingCountryList = res;
    //     this.formData.licenseHolderCountryList = res;
    //
    //   });
    //   this.getService.getManufacturingCompanyLookUp(1, '').subscribe((res: any) => {
    //     this.formData.manufacturingCompanyList = res;
    //     this.formData.licenseHolderList = res;
    //
    //   });
    //   this.getService.getFunctionLookUp().subscribe((res: any) => {
    //     this.formData.functionList = res;
    //
    //   });
    //   this.getService.getPackagingTypeLookUp().subscribe((res: any) => {
    //     this.formData.typeOfPackagingList = res;
    //
    //   });
    //   this.getService.getPhysicalStateLookUp().subscribe((res: any) => {
    //     this.formData.physicalStateList = res;
    //
    //   });
    //   this.getService.getUnitOfMeasureLookUp().subscribe((res: any) => {
    //     this.formData.unitOfMeasureList = res;
    //
    //   });
    //   this.getService.getUsePurposeLookUp().subscribe((res: any) => {
    //     this.formData.purposeOfUseList = res;
    //
    //   });
    //   this.getService.getProductColorLookUp().subscribe((res: any) => {
    //     this.formData.productColorList = res;
    //
    //   });
    //   this.getService.getProductIngrediantsLookUp(1, '').subscribe((res: any) => {
    //     this.formData.ingrediantList = res;
    //
    //   });
    //   this.getService.getCompanyProfileLookUp(1, this.companyProfileId, '').subscribe((res: any) => {
    //     this.formData.applicantList = res;
    //
    //   });
    //   this.getService.getStoragePlaceLookUp().subscribe((res: any) => {
    //     this.formData.storagePlaceList = res;
    //
    //   });
    //   this.getService.getTrackTypeLookUp().subscribe((res: any) => {
    //     this.formData.trackType = res;
    //   });
    //
    //   resolve(true);
    //
    // });
    //
    // Promise.all([allLookupsRequest]).then((value) => {
    //   this.lookupResponse = value[0];
    //   this.isLoading = false;
    // });

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
                                this.isLoading = false;
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

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'variablesPrices'),
      distinctUntilChanged()
    ).subscribe(res => {
      res.payload.filter(x => x.groupName.toLowerCase() === this.route.snapshot.routeConfig.path).map(variableList => {
        this.variablesPricingList = variableList;
      });
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
