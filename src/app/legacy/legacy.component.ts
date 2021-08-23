import {Component, OnInit, TemplateRef} from '@angular/core';
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
  typeOfProcess;
  successSubmission: boolean = false;
  companyProfileId: any;
  productDataAsCopy: any;

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
    this.typeOfProcess = this.route.snapshot.paramMap.get('typeOfProcess');


    this.inputService.getInput$().pipe(
      filter(x => x.type === 'allLookups'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.formData = res.payload;
      this.isLoading = false;

      if (this.productId) {
        this.isLoading = true;

        this.getService.getLegacyProductWithProductIDList(Number(this.productId)).subscribe((res: any) => {
          this.selectedFormType = res.typeOfMarketing;
          this.selectedRequestedType = res.typeOfRegistration;
          this.selectedIsExport = res.isExport;
          this.productData = res;
          this.productDataAsCopy = res;
          this.isLoading = false;
        }, error => this.handleError(error));
      }
    });
  }

  getFormType(event) {
    this.selectedFormType ? this.selectedFormType = '' : null;
    this.isLoading = true;
    this.productData = null;

    setTimeout(() => {
      this.selectedFormType = event.value;
      this.productDataAsCopy.typeOfMarketing = event.value;
      this.productData = this.productDataAsCopy;
      this.isLoading = false;
    }, 500);
  }

  getRequestType(event) {
    this.selectedRequestedType ? this.selectedRequestedType = '' : null;
    this.isLoading = true;
    this.productData = null;

    setTimeout(() => {
      this.selectedRequestedType = event.value;
      this.productDataAsCopy.typeOfRegistration = event.value;
      this.productData = this.productDataAsCopy;
      this.isLoading = false;
    }, 500);
  }

  applyProduct(NotificationNo) {
    this.isLoading = true;
    this.getService.getProductWithNotificationNumberList(NotificationNo, 'legacy').subscribe((res: any) => {
      if (res.canUse) {
        this.productData = res;
        this.selectedRequestedType = res.typeOfMarketing;
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
      ...event,
      id: this.productData.id
    };
    const eventObject = convertToSpecialObjectForLegacy('save', newData);

    this.getService.createProductRequest(eventObject).subscribe((res: any) => {
      this.isLoading = false;
      this.alertNotificationStatus = true;
      this.alertNotification = this.alertForSaveRequest();
      this.productData = res;
      this.productDataAsCopy = res;
      this.onClosed();
    }, error => this.handleError(error));
  }

  onSubmit(event) {
    this.isLoading = true;
    const newData = {
      ...this.productData,
      ...event,
      id: this.productData.id
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  closeSuccessSubmissionModal() {
    this.modalRef.hide();
  }
}
