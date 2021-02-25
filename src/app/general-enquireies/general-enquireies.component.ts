import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {LookupState} from '../product-request-form/product-request-form.component';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {FormService} from '../services/form.service';
import {map, startWith} from 'rxjs/operators';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-general-enquireies',
  templateUrl: './general-enquireies.component.html',
  styleUrls: ['./general-enquireies.component.css']
})
export class GeneralEnquireiesComponent implements OnInit {

  formData = {
    manufacturingCountryList: [],
  };
  generalEnquiriesForm: FormGroup;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService,
              private fb: FormBuilder,
              private number: DecimalPipe) {
    this.getFormAsStarting();
  }

  ngOnInit(): void {
  }

  getFormAsStarting() {
    this.generalEnquiriesForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z]+[ 0-9a-zA-Z-_*]*$')]),
      receiptNumber: this.fb.control('', Validators.required), //[Validators.required, Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$')]
      receiptValue: this.fb.control('', [Validators.required, Validators.pattern(/(\d*(\d{2}\.)|\d{1,3})/)]),
    });
  }

  onSubmit() {
    this.isLoading = true;

    const data = this.generalEnquiriesForm.value;

    this.getService.setGeneralEnquiries(data).subscribe((res: any) => {
      this.isLoading = false;
      this.alertNotificationStatus = true;
      this.alertNotification = this.alertForSubmitRequest();
      this.resetForms();
      this.onClosed();
    }, error => this.handleError(error));
  }

  getDecimalValue(value) {
    this.generalEnquiriesForm.patchValue({
      receiptValue: this.number.transform(this.generalEnquiriesForm.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
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

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }

  resetForms() {
    this.getFormAsStarting();
  }
}
