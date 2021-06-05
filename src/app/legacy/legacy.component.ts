import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';
import {ActivatedRoute, Router} from '@angular/router';
import {convertToSpecialObjectForLegacy} from '../../utils/formDataFunction';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {InputService} from '../services/input.service';

@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styleUrls: ['./legacy.component.css']
})
export class LegacyComponent implements OnInit {

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
  selectedFormType;
  selectedRequestedType;
  selectedTrackType;
  selectedIsExport;
  isLoading: boolean = false;
  alertNotification: any;
  alertNotificationStatus: boolean = false;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  productId;
  successSubmission: boolean = false;
  companyProfileId: any;

  constructor(private getService: FormService,
              private router: Router,
              private route: ActivatedRoute,
              private inputService: InputService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'CompanyId'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.companyProfileId = res.payload;
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
                                this.isLoading = false;

                                if (this.productId) {
                                  this.isLoading = true;

                                  this.getService.getLegacyProductWithProductIDList(Number(this.productId)).subscribe((res: any) => {
                                    this.selectedFormType = res.typeOfMarketing;
                                    this.selectedRequestedType = res.typeOfRegistration;
                                    this.selectedIsExport = res.isExport;
                                    this.productData = res;
                                    this.isLoading = false;
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

  getFormType(event) {
    this.selectedFormType = event.value;
  }

  getRequestType(event) {
    this.selectedRequestedType = event.value;
  }

  applyProduct(NotificationNo) {
    this.isLoading = true;
    this.getService.getProductWithNotificationNumberList(NotificationNo, 'legacy').subscribe((res: any) => {
      if (res.canUse) {
        this.productData = res;
        this.isLoading = false;
      } else {
        this.handleError(res.canuseMsg);
      }
    }, error => this.handleError(error));
  }

  onSave(event) {
    this.isLoading = true;
    const newData = {
      ...this.productData,
      ...event
    };
    const eventObject = convertToSpecialObjectForLegacy('save', newData);

    this.getService.createProductRequest(eventObject).subscribe((res: any) => {
      this.isLoading = false;
      this.alertNotificationStatus = true;
      this.alertNotification = this.alertForSaveRequest();
      this.productData = res;
      this.onClosed();
    }, error => this.handleError(error));
  }

  onSubmit(event) {
    this.isLoading = true;
    const newData = {
      ...this.productData,
      ...event
    };
    const eventObject = convertToSpecialObjectForLegacy('submit', newData);

    this.getService.createProductRequest(eventObject).subscribe((res: any) => {
      this.isLoading = false;
      this.successSubmission = true;
      this.alertNotificationStatus = true;
      this.alertNotification = this.alertForSubmitRequest();
      this.emptyTheTopField();

      this.router.navigate([`/track-request/legacy`]);
      this.onClosed();
    }, error => this.handleError(error));
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
