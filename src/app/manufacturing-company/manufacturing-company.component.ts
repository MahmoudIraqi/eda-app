import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../services/form.service';
import {convertToSpecialObject} from '../../utils/formDataFunction';
import {Observable, Subscription} from 'rxjs';
import {LookupState} from '../product-request-form/product-request-form.component';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'app-manufacturing-company',
  templateUrl: './manufacturing-company.component.html',
  styleUrls: ['./manufacturing-company.component.css']
})
export class ManufacturingCompanyComponent implements OnInit, AfterViewInit, OnDestroy {

  formData = {
    manufacturingCountryList: [],
  };
  manufacturingCompanyForm: FormGroup;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  filteredOptionsForManufacturingCountry: Observable<LookupState[]>;
  subscription: Subscription;
  @ViewChildren(MatAutocompleteTrigger) triggerCollection: QueryList<MatAutocompleteTrigger>;

  manufacturingCompanyList = {
    tableHeader: ['Name','Country'],
    tableBody: [
      {
        name: 'Company 1',
        country: 'Country 1',
      },
      {
        name: 'Company 2',
        country: 'Country 2',
      },
      {
        name: 'Company 3',
        country: 'Country 3',
      },
      {
        name: 'Company 4',
        country: 'Country 4',
      },
      {
        name: 'Company 5',
        country: 'Country 5',
      },
      {
        name: 'Company 6',
        country: 'Country 6',
      },
      {
        name: 'Company 7',
        country: 'Country 7',
      },
      {
        name: 'Company 8',
        country: 'Country 8',
      },
      {
        name: 'Company 9',
        country: 'Country 9',
      },
      {
        name: 'Company 10',
        country: 'Country 10',
      },
      {
        name: 'Company 11',
        country: 'Country 11',
      },
      {
        name: 'Company 12',
        country: 'Country 12',
      },
      {
        name: 'Company 13',
        country: 'Country 13',
      },
      {
        name: 'Company 14',
        country: 'Country 14',
      },
      {
        name: 'Company 15',
        country: 'Country 15',
      }
    ],
  };

  constructor(private getService: FormService,
              private fb: FormBuilder) {
    this.getFormAsStarting();
  }

  ngOnInit(): void {
    this.getService.getCountryLookUp().subscribe((res: any) => {
      this.formData.manufacturingCountryList = res;
      this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction(this.manufacturingCompanyForm.get('manufacturingCountry'), this.formData.manufacturingCountryList);
      this.isLoading = false;
    }, error => this.handleError(error));

    this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction(this.manufacturingCompanyForm.get('manufacturingCountry'), this.formData.manufacturingCountryList);
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
    this.manufacturingCompanyForm = this.fb.group({
      manufacturingCompany: this.fb.control('', Validators.required),
      manufacturingCountry: this.fb.control('', Validators.required),
    });
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
    const data = this.convertAllNamingToId(this.manufacturingCompanyForm.value);

    this.isLoading = true;
    this.getService.setManufacturingCompany(data).subscribe((res: any) => {
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
            if (this.manufacturingCompanyForm.controls[field].dirty) {
              this.manufacturingCompanyForm.controls[field].setValue(null);
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
  }
}
