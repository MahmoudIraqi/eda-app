import {Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../services/form.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import {LookupState} from '../product-request-form/product-request-form.component';
import {Observable, Subscription} from 'rxjs';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {convertToSpecialObject} from '../../utils/formDataFunction';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {InputService} from '../services/input.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-custom-release',
  templateUrl: './custom-release.component.html',
  styleUrls: ['./custom-release.component.css']
})
export class CustomReleaseComponent implements OnInit {

  isLoading: boolean = false;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  modalRef: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-xl packagingModal',
  };
  @ViewChild('successSubmissionModal') modalDetailedTemplate: TemplateRef<any>;
  dataInAnyError: any;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  activeTabIndex;
  regCustomReleaseForm: FormGroup;
  filteredOptionsForRequestedReleaseType: Observable<LookupState[]>;
  filteredOptionsForCustomPortName: Observable<LookupState[]>;
  filteredOptionsForMeasureUnitList: Observable<LookupState[]>;
  formData = {
    manufacturingCompanyList: [],
    manufacturingCountryList: [],
    applicantList: [],
    unitOfMeasureList: [],
  };

  constructor(private fb: FormBuilder,
              private number: DecimalPipe,
              private router: Router,
              private readonly route: ActivatedRoute,
              private inputService: InputService,
              private modalService: BsModalService,
              private getService: FormService) {
    this.getFormAsStarting('', '');
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'allLookups'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.formData = res.payload;
      this.isLoading = false;
    });

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'CompanyId'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.setApplicant(res.payload);
    });
  }

  nextToNextTab() {
    this.formTabs.tabs.filter(x => x.active).map(y => this.activeTabIndex = this.formTabs.tabs.indexOf(y));
    this.activeTabIndex + 1 <= this.formTabs.tabs.length - 1 ? this.formTabs.tabs[this.activeTabIndex + 1].active = true : null;
  }

  backToNextTab() {
    let activeTabIndex;
    this.formTabs.tabs.filter(x => x.active).map(y => activeTabIndex = this.formTabs.tabs.indexOf(y));
    activeTabIndex >= 0 ? this.formTabs.tabs[activeTabIndex - 1].active = true : null;
  }

  setApplicant(companyProfileID) {
    this.formData.applicantList.filter(option => option.ID === companyProfileID).map(x => this.regCustomReleaseForm.patchValue({
      applicant: x.NAME
    }));
  }

  setShelfValue(event) {
    if (Number(event.target.value) > 500) {
      this.regCustomReleaseForm.get('grossWeight').patchValue(500);
    } else {
      this.regCustomReleaseForm.get('grossWeight').patchValue(Number(event.target.value));
    }
  }

  getDecimalValue(value, fromWhere) {
    this.regCustomReleaseForm.patchValue({
      receiptValue: this.number.transform(this.regCustomReleaseForm.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
  }

  getFormAsStarting(data, fromWhere) {
    if (data) {
    } else {
      this.regCustomReleaseForm = this.fb.group({
        id: 0,
        bol: this.fb.control('', Validators.required),
        withinIncluded: this.fb.control(false),
        requestedReleaseType: this.fb.control('', Validators.required),
        applicant: this.fb.control('', Validators.required),
        customPortName: this.fb.control('', Validators.required),
        pod: this.fb.control(''),
        supplierName: this.fb.control(''),
        supplierCounty: this.fb.control(''),
        carrierName: this.fb.control(''),
        grossWeight: this.fb.control('', Validators.required),
        measureUnit: this.fb.control('', Validators.required),
        receiptNumber: this.fb.control('', Validators.required),
        groupNumber: this.fb.control('', Validators.required),
        receiptValue: this.fb.control('', Validators.required),
        bolPolicy: this.fb.control('', Validators.required),
        packingList: this.fb.control('', Validators.required),
        receipt: this.fb.control('', Validators.required),
        exportPledge: this.fb.control(''),
        importersRecord: this.fb.control(''),
      });
    }
  }

  saveData() {
  }

  onSubmit() {
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

  closeSuccessSubmissionModal() {
    this.modalRef.hide();
  }
}
