import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {LookupState} from '../product-request-form/product-request-form.component';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {FormService} from '../services/form.service';
import {distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {InputService} from '../services/input.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

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
  estimatedValue;
  attachmentFields = [
    {
      id: 'attachment',
      name: 'Attachment & Receipt',
      fileName: '',
      required: true,
      enable: true,
      attachmentTypeStatus: ''
    },
  ];
  errorMessage: boolean = false;
  attachmentRequiredStatus: boolean = false;
  variablesPricingList: any;
  modalRef: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-xl packagingModal',
  };
  @ViewChild('successSubmissionModal') modalDetailedTemplate: TemplateRef<any>;
  successSubmission: boolean = false;
  dataInAnyError: any;

  constructor(private getService: FormService,
              private fb: FormBuilder,
              private readonly route: ActivatedRoute,
              private router: Router,
              private inputService: InputService,
              private number: DecimalPipe,
              private modalService: BsModalService,
              private currencyPipe: CurrencyPipe) {
    this.getFormAsStarting();
  }

  ngOnInit(): void {
    const pathInEditMode = this.route.snapshot.routeConfig.path.split('/')[0];

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'variablesPrices'),
      distinctUntilChanged()
    ).subscribe(res => {
      const variableGroup = pathInEditMode ? pathInEditMode : this.route.snapshot.routeConfig.path;

      res.payload.filter(x => x.groupName.toLowerCase() === variableGroup).map(variableList => {
        this.variablesPricingList = variableList;

        this.variablesPricingList.LKUPVARIABLESDto && this.variablesPricingList.LKUPVARIABLESDto.length > 0 ? this.variablesPricingList.LKUPVARIABLESDto.filter(x => x.varCode.toLowerCase() === variableGroup).map(y => {
          this.estimatedValue = this.currencyPipe.transform(y.variableValue, 'EGP', 'symbol');
        }) : null;
      });
    });
  }

  getFormAsStarting() {
    this.generalEnquiriesForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      receiptNumber: this.fb.control('', Validators.required), //[Validators.required, Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$')]
      receiptValue: this.fb.control('', [Validators.required, Validators.pattern('^(\\d{1,3}(,\\d{3})|\\d)*(\\.\\d+)?$')]),
      attachment: this.fb.control('', Validators.required),
    });
  }

  onFileSelect(event, fileControlName) {
    this.attachmentFields.filter(x => x.id === fileControlName).map(y => y.fileName = event.target.value.split(/(\\|\/)/g).pop());
    if (event.target.files.length > 0) {
      if (event.target.files[0].type === 'application/pdf' && event.target.files[0].size <= 5000000) {
        this.attachmentFields.filter(x => x.id === fileControlName).map(file => {
          file.fileName = event.target.value.split(/(\\|\/)/g).pop();
          file.attachmentTypeStatus = 'Yes';
        });
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = (res: any) => {
          this.generalEnquiriesForm.get(fileControlName).setValue({
            fileName: file.name,
            AttachName: 'manuFactureAttach',
            base64Data: res.target.result
          });
        };
      } else {
        this.attachmentFields.filter(x => x.id === fileControlName).map(file => {
          file.attachmentTypeStatus = 'No';
        });
      }
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.attachmentRequiredStatus = true;
    this.successSubmission = false;
    const data = this.generalEnquiriesForm.value;

    if (this.generalEnquiriesForm.valid) {
      this.getService.setGeneralEnquiries(data).subscribe((res: any) => {
        this.dataInAnyError = res;
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.resetForms();
        this.onClosed();
        this.successSubmission = true;
        this.openModal(this.modalDetailedTemplate);
      }, error => this.handleError(error));
    } else {
      this.handleError('please complete the required values which marked with *');
    }
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

    this.attachmentFields.map(x => {
      x.fileName = '';
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  closeSuccessSubmissionModal() {
    this.modalRef.hide();
  }
}
