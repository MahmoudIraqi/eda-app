import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {FormService} from '../services/form.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-inspection-final-product',
  templateUrl: './inspection-final-product.component.html',
  styleUrls: ['./inspection-final-product.component.css']
})
export class InspectionFinalProductComponent implements OnInit, OnChanges {
  @Input() fieldsType;
  @Input() successSubmission;
  @Output() saveDataOutput = new EventEmitter();
  @Output() submitDataOutput = new EventEmitter();
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;
  requestType = [];
  inspectFinalProductRequest: FormGroup;
  attachmentFields = [
    {
      id: 'factoryAnalysisCertificate',
      name: 'factory analysis certificate',
      fileName: '',
      required: false,
      enable: true
    },
    {
      id: 'receipt',
      name: 'receipt (or online payment)',
      fileName: '',
      required: false,
      enable: true
    }
  ];
  disabledSaveButton: boolean = false;
  isLoading: boolean = false;
  activeTabIndex;
  batchList = [
    {
      batchNumber: '12345',
      expirationDate: '2021-02-27T09:09:35.617',
      id: 0,
      notificationNumber: null,
      productID: 37,
      productionDate: '2021-02-27T09:09:35.617',
      submitionDate: '2021-02-27T11:11:34.047',
      batchQuantity: 'test1',
      UOM: 'test1',
    },
    {
      batchNumber: '23456',
      expirationDate: '2021-02-27T09:09:35.617',
      id: 0,
      notificationNumber: null,
      productID: 37,
      productionDate: '2021-02-27T09:09:35.617',
      submitionDate: '2021-02-27T11:11:34.047',
      batchQuantity: 'test2',
      UOM: 'test2',
    },
    {
      batchNumber: '34567',
      expirationDate: '2021-02-27T09:09:35.617',
      id: 0,
      notificationNumber: null,
      productID: 37,
      productionDate: '2021-02-27T09:09:35.617',
      submitionDate: '2021-02-27T11:11:34.047',
      batchQuantity: 'test3',
      UOM: 'test3',
    },
    {
      batchNumber: '45678',
      expirationDate: '2021-02-27T09:09:35.617',
      id: 0,
      notificationNumber: null,
      productID: 37,
      productionDate: '2021-02-27T09:09:35.617',
      submitionDate: '2021-02-27T11:11:34.047',
      batchQuantity: 'test4',
      UOM: 'test4',
    },
    {
      batchNumber: '56789',
      expirationDate: '2021-02-27T09:09:35.617',
      id: 0,
      notificationNumber: null,
      productID: 37,
      productionDate: '2021-02-27T09:09:35.617',
      submitionDate: '2021-02-27T11:11:34.047',
      batchQuantity: 'test5',
      UOM: 'test5',
    }
  ];

  constructor(private fb: FormBuilder,
              private number: DecimalPipe,
              private getService: FormService,
              private readonly route: ActivatedRoute) {
    this.getFormAsStarting('');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.successSubmission) {
      this.resetForms();
    }
  }

  ngOnInit(): void {
    this.getService.getRequestTypeLookUp().subscribe((res: any) => {
      this.requestType = res;
      this.isLoading = false;
    }, error => this.handleError(error));

    this.inspectFinalProductRequest.valueChanges.subscribe(x => {
      for (let i = 0; i < Object.values(x).length; i++) {
        if (typeof Object.values(x)[i] !== 'object') {
          if (!Object.values(x)[i]) {
            this.disabledSaveButton = false;
          } else {
            this.disabledSaveButton = true;
            break;
          }
        }
      }
    });
  }

  // Functions for Tabs
  nextToNextTab() {
    this.formTabs.tabs.filter(x => x.active).map(y => this.activeTabIndex = this.formTabs.tabs.indexOf(y));
    this.activeTabIndex + 1 <= this.formTabs.tabs.length - 1 ? this.formTabs.tabs[this.activeTabIndex + 1].active = true : null;
  }

  backToNextTab() {
    let activeTabIndex;
    this.formTabs.tabs.filter(x => x.active).map(y => activeTabIndex = this.formTabs.tabs.indexOf(y));
    activeTabIndex >= 0 ? this.formTabs.tabs[activeTabIndex - 1].active = true : null;
  }

  // Function for File
  onFileSelect(event, fileControlName) {
    let cardImageBase64;
    this.attachmentFields.filter(x => x.id === fileControlName).map(y => y.fileName = event.target.value.split(/(\\|\/)/g).pop());
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (res: any) => {
        this.inspectFinalProductRequest.get(fileControlName).setValue({name: file.name, base64Data: res.target.result});
      };

      // this.inspectFinalProductRequest.get(fileControlName).setValue(file);
    }
  }

  saveData() {
    this.saveDataOutput.emit(this.inspectFinalProductRequest.value);
  }

  onSubmit() {
    this.submitDataOutput.emit(this.inspectFinalProductRequest.value);
  }

  getFormAsStarting(data) {
    this.inspectFinalProductRequest = this.fb.group({
      notificationNo: this.fb.control('', Validators.required),
      productArabicName: this.fb.control('', Validators.pattern('^[\u0621-\u064A]+[ 0-9\u0621-\u064A-_*]*$')),
      productEnglishName: this.fb.control('', [Validators.required, Validators.pattern('^(?:\\b\\w+\\b[^.\\s]|[^\u0621-\u064A]|[\\b\\w\\s])*$')]),
      typeOfNotification: this.fb.control(''),
      batchNo: this.fb.control('', Validators.required),
      productionDate: this.fb.control(''),
      expirationDate: this.fb.control(''),
      batchQuantity: this.fb.control(''),
      UOM: this.fb.control(''),
      visitLocation: this.fb.control(''),
      receiptNumber: this.fb.control('', Validators.required), //[Validators.required, Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$')]
      receiptValue: this.fb.control('', [Validators.required, Validators.pattern('^(\\d{1,3}(,\\d{3})|\\d)*(\\.\\d+)?$')]),
      factoryAnalysisCertificate: this.fb.control(''),
      receipt: this.fb.control(''),
    });
  }

  getDecimalValue(value) {
    this.inspectFinalProductRequest.patchValue({
      receiptValue: this.number.transform(this.inspectFinalProductRequest.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
  }

  applyProduct(form) {
    this.isLoading = true;
    this.getService.getProductWithNotificationNumberList(form.notificationNo, 'inspection').subscribe((res: any) => {
      if (res) {
        const notificationType = this.requestType.filter(item => item.ID === res.typeOfRegistration).map(x => x.NAME);

        this.inspectFinalProductRequest.patchValue({
          productArabicName: res.productArabicName,
          productEnglishName: res.productEnglishName,
          typeOfNotification: notificationType
        });
      }
    }, error => this.handleError(error));
  }

  getBatchValues(form) {
    // this.isLoading = true;
    // this.getService.getProductWithNotificationNumberList(form.notificationNo).subscribe((res: any) => {
    //   if (res) {
    //     const notificationType = this.requestType.filter(item => item.ID === res.typeOfRegistration).map(x => x.NAME);
    //
    //     this.inspectFinalProductRequest.patchValue({
    //       productArabicName: res.productArabicName,
    //       productEnglishName: res.productEnglishName,
    //       typeOfNotification: notificationType
    //     });
    //   }
    // }, error => this.handleError(error));

    this.batchList.filter(x => x.batchNumber === form.batchNo).map(y => {
      this.inspectFinalProductRequest.patchValue({
        productionDate: y.productionDate,
        expirationDate: y.expirationDate,
        batchQuantity: y.batchQuantity,
        UOM: y.UOM,
      });
    });
  }

  handleError(message) {
  }

  resetForms() {
    this.getFormAsStarting('');
  }

}
