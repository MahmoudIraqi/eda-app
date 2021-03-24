import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.getFormAsStarting('');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.successSubmission) {
      this.resetForms();
    }
  }

  ngOnInit(): void {
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
        this.regProductForAllRequestedType.get(fileControlName).setValue({name: file.name, base64Data: res.target.result});
      };

      // this.regProductForAllRequestedType.get(fileControlName).setValue(file);
    }
  }

  saveData() {
    this.saveDataOutput.emit(data);
  }

  onSubmit() {
    this.submitDataOutput.emit(data);
  }

  getFormAsStarting(data) {
    this.inspectFinalProductRequest = this.fb.group({
      notificationNo: this.fb.control('', Validators.required),
      productArabicName: this.fb.control(''),
      productEnglishName: this.fb.control('', [Validators.pattern('^[a-zA-Z]+[ 0-9a-zA-Z-_*]*$')]),
      typeOfNotification: this.fb.control(''),
      batchNo: this.fb.control('', Validators.required),
      productionDate: this.fb.control(''),
      expirationDate: this.fb.control(''),
      batchQuantity: this.fb.control(''),
      UOM: this.fb.control(''),
      visitLocation: this.fb.control(''),
      receiptNumber: this.fb.control('', Validators.required), //[Validators.required, Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$')]
      receiptValue: this.fb.control('', [Validators.required, Validators.pattern(/(\d*(\d{2}\.)|\d{1,3})/)]),
      factoryAnalysisCertificate: this.fb.control(''),
      receipt: this.fb.control(''),
    });
  }

  getDecimalValue(value) {
    this.regProductForAllRequestedType.patchValue({
      receiptValue: this.number.transform(this.regProductForAllRequestedType.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
  }

  applyProduct(form) {
    console.log('form', form);
    this.isLoading = true;
    this.getService.getProductWithNotificationNumberList(form.notificationNo).subscribe((res: any) => {
      console.log('res', res);
      if (res) {
        this.inspectFinalProductRequest.patchValue({
          productArabicName: res.productArabicName,
          productEnglishName: res.productEnglishName,
          typeOfNotification: res.typeOfNotification
        });
      }
    }, error => this.handleError(error));
  }

  handleError(message) {
  }

}
