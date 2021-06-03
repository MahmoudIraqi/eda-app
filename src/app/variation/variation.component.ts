import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';
import {ActivatedRoute} from '@angular/router';
import {InputService} from '../services/input.service';
import {CurrencyPipe} from '@angular/common';
import {distinctUntilChanged, filter} from 'rxjs/operators';

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
    //
    //   if (this.lookupResponse) {
    //
    //   }
    // });

    this.whichVariation = this.route.snapshot.routeConfig.path.split('/')[0];

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'variablesPrices'),
      distinctUntilChanged()
    ).subscribe(res => {
      res.payload.filter(x => x.groupName.toLowerCase() === this.route.snapshot.routeConfig.path.split('/')[0]).map(variableList => {
        this.variablesPricingList = variableList;
      });
    });

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

                                this.productNotificationNumber = this.route.snapshot.paramMap.get('notNumber');
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

                                    // if (res.isDraft === 0) {
                                    //   res.receiptValue = '';
                                    //   res.receiptNumber = '';
                                    //   res.receipt = '';
                                    //   let indexOfReceiptAttachment;
                                    //   res.productAttachments.filter(x => x.attachmentName === 'receipt').map(y => indexOfReceiptAttachment = res.productAttachments.indexOf(y));
                                    //   res.productAttachments.splice(indexOfReceiptAttachment, 1);
                                    // }

                                    this.isLoading = false;
                                    this.getVariationRequiredFields(this.typeOfRegistrationForProduct, this.whichVariation === 'do_tell_variation' ? 2 : 1);
                                  }, error => this.handleError(error));
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
      isDraft: 1,
      LKUP_REQ_TYPE_ID: this.whichVariation === 'do_tell_variation' ? 4 : 3
    };

    this.getService.setVariationProduct(data).subscribe((res: any) => {
      this.productData = res;
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
      LKUP_REQ_TYPE_ID: this.whichVariation === 'do_tell_variation' ? 4 : 3
    };

    this.getService.setVariationProduct(data).subscribe((res: any) => {
      this.isLoading = false;
      this.alertNotificationStatus = true;
      this.alertNotification = this.alertForSubmitRequest();
      this.emptyTheTopField();
      this.onClosed();
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
}
