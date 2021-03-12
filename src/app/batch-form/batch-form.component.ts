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
  };
  batchForm: FormGroup;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  fromApprovedTable: boolean = false;
  filteredOptionsForManufacturingCountry: Observable<LookupState[]>;
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

    this.getService.getBatchList().subscribe((res: any) => {
      console.log('res', res);
      this.batchList = {
        tableHeader: ['Batch Number', 'Product Id', 'Submission Date', 'Production Date', 'Expiration Date'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
  }

  ngAfterViewInit() {
    this._subscribeToClosingActions('manufacturingCountry');
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
      expirationDate: this.fb.control('', Validators.required)
    });
  }

  applyProduct(notificationNumber) {
    this.isLoading = true;
    this.getService.getProductWithNotificationNumberList(notificationNumber).subscribe((res: any) => {
      this.isLoading = false;
      this.showOtherField = true;
      this.batchForWhichProduct = res.productEnglishName;
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
    this.isLoading = true;
    this.getService.setBatch(this.batchForm.value).subscribe((res: any) => {
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
    this.formData.manufacturingCountryList.filter(option => option.NAME === data.manufacturingCountry).map(x => data.manufacturingCountry = x.ID);

    return data;
  }

  private _subscribeToClosingActions(field): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    for (var trigger of this.triggerCollection.toArray()) {
      this.subscription = trigger.panelClosingActions
        .subscribe(e => {
          if (!e || !e.source) {
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
