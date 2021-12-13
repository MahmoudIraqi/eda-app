import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../services/form.service';
import {convertToSpecialObject} from '../../utils/formDataFunction';
import {Observable, Subscription} from 'rxjs';
import {LookupState} from '../product-request-form/product-request-form.component';
import {distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {InputService} from '../services/input.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

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

  attachmentFields = [
    {
      id: 'attachment',
      name: 'Attachment',
      fileName: '',
      required: true,
      enable: true,
      attachmentTypeStatus: ''
    },
  ];
  attachmentRequiredStatus: boolean = false;
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
              private inputService: InputService,
              private modalService: BsModalService,
              private fb: FormBuilder) {
    this.getFormAsStarting();
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'allLookups'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.formData.manufacturingCountryList = res.payload.manufacturingCountryList;
      this.isLoading = false;
    });

    this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction(this.manufacturingCompanyForm.get('manufacturingCountry'), this.formData.manufacturingCountryList);
  }

  ngAfterViewInit() {
    this._subscribeToClosingActions('manufacturingCountry', this.filteredOptionsForManufacturingCountry);
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
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
          this.manufacturingCompanyForm.get(fileControlName).setValue({
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

  getFormAsStarting() {
    this.manufacturingCompanyForm = this.fb.group({
      manufacturingCompany: this.fb.control('', Validators.required),
      manufacturingCountry: this.fb.control('', Validators.required),
      attachment: this.fb.control('', Validators.required),
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
    this.attachmentRequiredStatus = true;
    const data = this.convertAllNamingToId(this.manufacturingCompanyForm.value);

    this.isLoading = true;
    this.getService.setManufacturingCompany(data).subscribe((res: any) => {
      debugger;
      this.dataInAnyError = res;
      this.isLoading = false;
      this.alertNotificationStatus = true;
      this.alertNotification = this.alertForSubmitRequest();
      this.resetForms();
      this.onClosed();
      this.successSubmission = true;
      this.openModal(this.modalDetailedTemplate);
    }, error => this.handleError(error));
  }

  alertForSubmitRequest() {
    return {msg: 'You had a successful Submission'};
  }

  convertAllNamingToId(data) {
    this.formData.manufacturingCountryList.filter(option => option.NAME === data.manufacturingCountry).map(x => data.manufacturingCountry = x.ID);

    return data;
  }

  private _subscribeToClosingActions(field, list): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    list.subscribe(x => {
      if (x.length === 0) {
        if (this.manufacturingCompanyForm.controls[field].dirty) {
          this.manufacturingCompanyForm.controls[field].setValue(null);
        }
      }
    });
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
