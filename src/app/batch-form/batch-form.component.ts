import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {LookupState} from '../product-request-form/product-request-form.component';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {FormService} from '../services/form.service';
import {distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import {InputService} from '../services/input.service';

@Component({
  selector: 'app-batch-form',
  templateUrl: './batch-form.component.html',
  styleUrls: ['./batch-form.component.css']
})
export class BatchFormComponent implements OnInit, AfterViewInit, OnDestroy {

  formData = {
    manufacturingCountryList: [],
    unitOfMeasureList: [],
  };
  batchForm: FormGroup;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  fromApprovedTable: boolean = false;
  filteredOptionsForManufacturingCountry: Observable<LookupState[]>;
  filteredOptionsForUnitOfMeasure: Observable<LookupState[]>;
  subscription: Subscription;
  showOtherField: boolean = false;
  batchForWhichProduct;
  @ViewChildren(MatAutocompleteTrigger) triggerCollection: QueryList<MatAutocompleteTrigger>;
  batchList;

  constructor(private getService: FormService,
              private fb: FormBuilder,
              private inputService: InputService) {
    this.getFormAsStarting();
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'NotificationNumber'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.batchForm.get('notificationNumber').patchValue(res.payload);
    });

    this.isLoading = true;

    this.getService.getUnitOfMeasureLookUp().subscribe((res: any) => {
      this.formData.unitOfMeasureList = res;
      this.isLoading = false;
    }, error => this.handleError(error), () => {
      this.filteredOptionsForUnitOfMeasure = this.filterLookupsFunction(this.batchForm.get('UOM'), this.formData.unitOfMeasureList);
      console.log('filteredOptionsForUnitOfMeasure', this.filteredOptionsForUnitOfMeasure);
    });

    this.getService.getBatchList().subscribe((res: any) => {
      this.batchList = {
        tableHeader: ['Batch Number', 'Product Id', 'Submission Date', 'Production Date', 'Expiration Date'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
  }

  ngAfterViewInit() {
    this._subscribeToClosingActions('UOM', this.filteredOptionsForUnitOfMeasure);
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  getFormAsStarting() {
    this.batchForm = this.fb.group({
      notificationNumber: this.fb.control('', Validators.required),
      batchNumber: this.fb.control('', Validators.required),
      productionDate: this.fb.control('', Validators.required),
      expirationDate: this.fb.control('', Validators.required),
      batchQuantity: this.fb.control('', Validators.required),
      UOM: this.fb.control('', Validators.required),
    });
  }

  applyProduct(notificationNumber) {
    this.isLoading = true;
    this.getService.getProductWithNotificationNumberList(notificationNumber, 'batch').subscribe((res: any) => {
      if (res.canUse) {
        this.isLoading = false;
        this.showOtherField = true;
        this.batchForWhichProduct = res.productEnglishName;
      } else {
        this.handleError('Can not do any process for this product. Please contact Egyptian Drug Authority');
      }
    }, error => this.handleError(error));
  }

  filterLookupsFunction(formControlValue, list) {
    if (formControlValue) {
      return formControlValue.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterInsideList(state, list) : list.slice())
        );
    }
  }

  filterInsideList(value, list): LookupState[] {
    let filterValue;
    if (value) {
      filterValue = value.toLowerCase();
    }

    return list.filter(option => option.NAME.toLowerCase().includes(filterValue)).map(x => x);
  }

  onSubmit() {
    const data = this.convertAllNamingToId(this.batchForm.value);

    this.isLoading = true;
    this.getService.setBatch(data).subscribe((res: any) => {
      this.isLoading = false;
      this.alertNotificationStatus = true;
      this.alertNotification = this.alertForSubmitRequest();
      this.resetForms();
      this.onClosed();
    }, error => this.handleError(error));
  }

  alertForSubmitRequest() {
    return {msg: 'You had a successful Submission'};
  }

  convertAllNamingToId(data) {
    this.formData.unitOfMeasureList.filter(option => option.NAME === data.UOM).map(x => data.UOM = x.ID);

    return data;
  }

  private _subscribeToClosingActions(field, list): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    if (list) {
      list.subscribe(x => {
        if (x.length === 0) {
          if (this.batchForm.controls[field].dirty) {
            this.batchForm.controls[field].setValue(null);
          }
        }
      });
    }
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

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }

  resetForms() {
    this.getFormAsStarting();
    this.showOtherField = false;
  }
}
