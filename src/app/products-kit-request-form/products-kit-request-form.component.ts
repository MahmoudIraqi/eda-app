import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList, SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {DecimalPipe} from '@angular/common';
import {FormService} from '../services/form.service';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {convertToSpecialObject} from '../../utils/formDataFunction';

export interface LookupState {
  ID: number;
  NAME: string;
}

@Component({
  selector: 'app-products-kit-request-form',
  templateUrl: './products-kit-request-form.component.html',
  styleUrls: ['./products-kit-request-form.component.css']
})
export class ProductsKitRequestFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() selectedRequestedType;
  @Input() selectedFormType;
  @Input() selectedIsExport;
  @Input() selectedTrackType;
  @Input() successSubmission;
  @Input() editData;
  @Input() editFromWhere;
  @Input() legacyStatus;
  @Input() reRegistrationStatus;
  @Input() variationFieldsStatus;
  @Input() variationFields;
  @Input() lookupsData;
  @Input() lookupForProductIds;
  @Input() companyProfile;
  @Output() saveDataOutput = new EventEmitter();
  @Output() submitDataOutput = new EventEmitter();
  @Output() saveDataOutputForAttachment = new EventEmitter();
  @Output() errorMessage = new EventEmitter();
  @Output() isLoadingStatus = new EventEmitter();

  formData;
  selectedKitProductsStatus;
  regKitForAllRequestedType: FormGroup;
  attachmentFields = [
    {
      id: 'freeSale',
      name: 'Free Sale',
      fileName: '',
      required: false
    },
    {
      id: 'GMP',
      name: 'GMP',
      fileName: '',
      required: false
    },
    {
      id: 'CoA',
      name: 'CoA',
      fileName: '',
      required: false
    },
    {
      id: 'artWork',
      name: 'Art Work',
      fileName: '',
      required: false
    },
    {
      id: 'leaflet',
      name: 'leaflet',
      fileName: '',
      required: false
    },
    {
      id: 'reference',
      name: 'reference',
      fileName: '',
      required: false
    },
    {
      id: 'methodOfAnalysis',
      name: 'Method of Analysis',
      fileName: '',
      required: false
    },
    {
      id: 'specificationsOfFinishedProduct',
      name: 'Specifications of Finished Product',
      fileName: '',
      required: false
    },
    {
      id: 'receipt',
      name: 'receipt',
      fileName: '',
      required: false
    },
    {
      id: 'authorizationLetter',
      name: 'Authorization Letter',
      fileName: '',
      required: false
    },
    {
      id: 'manufacturingContract',
      name: 'Manufacturing Contract',
      fileName: '',
      required: false
    },
    {
      id: 'storageContract',
      name: 'Storage Contract',
      fileName: '',
      required: false
    },
    {
      id: 'others',
      name: 'others',
      fileName: '',
      required: false
    },
    {
      id: 'otherFees',
      name: 'otherFees',
      fileName: '',
      required: false
    }
  ];
  attachmentFieldsForKits = [
    {
      id: 'freeSale',
      name: 'Free Sale',
      fileName: '',
      fileValue: '',
      required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'GMP',
      name: 'GMP',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'CoA',
      name: 'CoA',
      fileName: '',
      fileValue: '',
      required: this.selectedRequestedType === 1 && this.selectedRequestedType === 2 ? true : false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'artWork',
      name: 'Art Work For The Kit',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'leaflet',
      name: 'leaflet',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'reference',
      name: 'reference',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'methodOfAnalysis',
      name: 'Method of Analysis',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'specificationsOfFinishedProduct',
      name: 'Specifications of Finished Product',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'receipt',
      name: 'receipt',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'authorizationLetter',
      name: 'Authorization Letter',
      fileName: '',
      fileValue: '',
      required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'manufacturingContract',
      name: 'Manufacturing Contract',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'storageContract',
      name: 'Storage Contract',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'others',
      name: 'others',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'otherFees',
      name: 'otherFees',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'factoryLicense',
      name: 'Factory license',
      fileName: '',
      fileValue: '',
      required: false,
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'manufacturingAssignment',
      name: 'Manufacturing Assignment',
      fileName: '',
      required: false,
      fileValue: '',
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'commercialRecord',
      name: 'Commercial Record',
      fileName: '',
      required: false,
      fileValue: '',
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'stabilityStudy',
      name: 'Stability study',
      fileName: '',
      required: false,
      fileValue: '',
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'shelfLifeAttachment',
      name: 'Shelf life',
      fileName: '',
      required: false,
      fileValue: '',
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'letterOfVariationFromLicenseHolder',
      name: 'letter of variation from license holder',
      fileName: '',
      required: false,
      fileValue: '',
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    }
  ];
  removeShortNameFieldStatus = false;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('insideFormTabs', {static: false}) insideFormTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;
  status;
  allProductsInKit = {
    tableHeader: ['Notification Number', 'Product Name', 'Manufacturing Company', 'Manufacturing Country', 'Applicant', 'Actions'],
    tableBody: []
  };
  editDetailedRowStatus = false;
  editIndex;
  newProductObject: any;
  selectedRegisteredProductTypeForProduct;
  enableEditableFields = [];
  disabledSaveButton: boolean = false;
  isLoading: boolean = false;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  filteredOptionsForManufacturingCompany: Observable<LookupState[]>;
  filteredOptionsForManufacturingCountry: Observable<LookupState[]>;
  filteredOptionsForApplicant: Observable<LookupState[]>;
  filteredOptionsForLicenseHolder: Observable<LookupState[]>;
  filteredOptionsForLicenseHolderCountry: Observable<LookupState[]>;
  filteredOptionsForStoragePlace: Observable<LookupState[]>;
  // filteredOptionsForProductIds: Observable<LookupState[]>;
  subscription: Subscription;
  @ViewChildren(MatAutocompleteTrigger) triggerCollection: QueryList<MatAutocompleteTrigger>;
  productFlags;
  productComments;
  requestId;
  attachmentRequiredStatus: boolean = false;
  isDraft: boolean = false;
  deletedProductIdLists = [];

  constructor(private fb: FormBuilder,
              private getServices: FormService,
              private number: DecimalPipe) {
    this.getFormAsStarting('');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.formData = {productStatusList: ['Registered', 'New'], ...this.lookupsData};

    if (this.successSubmission) {
      this.resetForms();
    }

    if (this.editData) {
      this.getFormAsStarting(this.editData);
    }

    this.attachmentFieldsForKits = [
      {
        id: 'freeSale',
        name: 'Free Sale',
        fileName: '',
        fileValue: '',
        required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'GMP',
        name: 'GMP',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'CoA',
        name: 'CoA',
        fileName: '',
        fileValue: '',
        required: this.selectedRequestedType === 1 && this.selectedRequestedType === 2 ? true : false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'artWork',
        name: 'Art Work For The Kit',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'leaflet',
        name: 'leaflet',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'reference',
        name: 'reference',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'methodOfAnalysis',
        name: 'Method of Analysis',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'specificationsOfFinishedProduct',
        name: 'Specifications of Finished Product',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'receipt',
        name: 'receipt',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'authorizationLetter',
        name: 'Authorization Letter',
        fileName: '',
        fileValue: '',
        required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'manufacturingContract',
        name: 'Manufacturing Contract',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'storageContract',
        name: 'Storage Contract',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'others',
        name: 'others',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'otherFees',
        name: 'otherFees',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'factoryLicense',
        name: 'Factory license',
        fileName: '',
        fileValue: '',
        required: false,
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'manufacturingAssignment',
        name: 'Manufacturing Assignment',
        fileName: '',
        fileValue: '',
        required: false,
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'commercialRecord',
        name: 'Commercial Record',
        fileName: '',
        fileValue: '',
        required: false,
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'stabilityStudy',
        name: 'Stability study',
        fileName: '',
        fileValue: '',
        required: false,
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'shelfLifeAttachment',
        name: 'Shelf life',
        fileName: '',
        fileValue: '',
        required: false,
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'letterOfVariationFromLicenseHolder',
        name: 'letter of variation from license holder',
        fileName: '',
        fileValue: '',
        required: false,
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      }
    ];

    this.setApplicant(this.companyProfile);

    this.getDisabledValues();
  }

  ngOnInit(): void {
    this.filteredOptionsForManufacturingCompany = this.filterLookupsFunction(this.regKitForAllRequestedType.get('manufacturingCompany'), this.formData.manufacturingCompanyList);
    this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction(this.regKitForAllRequestedType.get('manufacturingCountry'), this.formData.manufacturingCountryList);
    this.filteredOptionsForApplicant = this.filterLookupsFunction(this.regKitForAllRequestedType.get('applicant'), this.formData.applicantList);
    this.filteredOptionsForLicenseHolder = this.filterLookupsFunction(this.regKitForAllRequestedType.get('licenseHolder'), this.formData.licenseHolderList);
    this.filteredOptionsForLicenseHolderCountry = this.filterLookupsFunction(this.regKitForAllRequestedType.get('countryOfLicenseHolder'), this.formData.licenseHolderCountryList);
    this.filteredOptionsForStoragePlace = this.filterLookupsFunction(this.regKitForAllRequestedType.get('storagePlace'), this.formData.storagePlaceList);

    this.regKitForAllRequestedType.valueChanges.subscribe(x => {
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

  ngAfterViewInit() {
    this._subscribeToClosingActions('manufacturingCompany', this.filteredOptionsForManufacturingCompany);
    this._subscribeToClosingActions('manufacturingCountry', this.filteredOptionsForManufacturingCountry);
    this._subscribeToClosingActions('applicant', this.filteredOptionsForApplicant);
    this._subscribeToClosingActions('licenseHolder', this.filteredOptionsForLicenseHolder);
    this._subscribeToClosingActions('countryOfLicenseHolder', this.filteredOptionsForLicenseHolderCountry);
    this._subscribeToClosingActions('storagePlace', this.filteredOptionsForStoragePlace);
    // this._subscribeToClosingActionsForKitProducts('productID', this.filteredOptionsForProductIds);
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  onFileSelect(event, fileControlName) {
    let cardImageBase64;
    let resForSetAttachment;
    let attachmentValue;

    if (this.attachmentFieldsForKits.filter(x => x.loadingStatus === true).length === 0) {
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'application/pdf') {

          this.attachmentFieldsForKits.filter(x => x.id === fileControlName).map(y => {
            y.fileName = event.target.value.split(/(\\|\/)/g).pop();
            attachmentValue = y.fileValue;
          });

          this.attachmentFieldsForKits.filter(x => x.id === fileControlName).map(file => {
            file.attachmentTypeStatus = 'Yes';
            this.isLoadingStatus.emit(true);
          });
          const file = event.target.files[0];
          const reader = new FileReader();

          reader.readAsDataURL(file);
          reader.onload = (res: any) => {
            console.log('this.regKitForAllRequestedType.value', this.regKitForAllRequestedType.value);
            if (!this.regKitForAllRequestedType.value.id) {

              this.saveProductForAttachment(fileControlName, file.name, 0, res.target.result, attachmentValue);
            } else {
              this.setAttachmentFileFunction(this.regKitForAllRequestedType.value.id, fileControlName, file.name, 0, res.target.result, attachmentValue);
            }
          };

        }// this.regKitForAllRequestedType.get(fileControlName).setValue(file);
        else {
          this.attachmentFieldsForKits.filter(x => x.id === fileControlName).map(file => {
            file.attachmentTypeStatus = 'No';
            this.isLoadingStatus.emit(false);
          });
        }
      }
    }
  }

  onFileSelectFromDetailsProductForKit(event, fileControlName, index) {
    this.attachmentFields.filter(x => x.id === fileControlName).map(y => y.fileName = event.target.value.split(/(\\|\/)/g).pop());
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ProductGroupsRows().at(index).get(fileControlName).setValue(file);
    }
  }

  nextToNextTab(whichTabs) {
    let activeTabIndex;
    if (whichTabs === 'FormTabs') {
      this.formTabs.tabs.filter(x => x.active).map(y => activeTabIndex = this.formTabs.tabs.indexOf(y));
      activeTabIndex + 1 <= this.formTabs.tabs.length - 1 ? this.formTabs.tabs[activeTabIndex + 1].active = true : null;
    } else {
      this.insideFormTabs.tabs.filter(x => x.active).map(y => activeTabIndex = this.insideFormTabs.tabs.indexOf(y));
      activeTabIndex + 1 <= this.insideFormTabs.tabs.length - 1 ? this.insideFormTabs.tabs[activeTabIndex + 1].active = true : null;
    }

  }

  backToNextTab(whichTabs) {
    let activeTabIndex;
    if (whichTabs === 'FormTabs') {
      this.formTabs.tabs.filter(x => x.active).map(y => activeTabIndex = this.formTabs.tabs.indexOf(y));
      activeTabIndex >= 0 ? this.formTabs.tabs[activeTabIndex - 1].active = true : null;
    } else {
      this.insideFormTabs.tabs.filter(x => x.active).map(y => activeTabIndex = this.insideFormTabs.tabs.indexOf(y));
      activeTabIndex >= 0 ? this.insideFormTabs.tabs[activeTabIndex - 1].active = true : null;
    }
  }

  saveData() {
    this.regKitForAllRequestedType.value.ProductsForKit.splice(this.regKitForAllRequestedType.value.ProductsForKit.length - 1, 1);
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);

    this.saveDataOutput.emit(data);
  }

  onSubmit() {
    this.attachmentRequiredStatus = true;
    this.regKitForAllRequestedType.value.ProductsForKit.splice(this.regKitForAllRequestedType.value.ProductsForKit.length - 1, 1);
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);

    if (this.regKitForAllRequestedType.valid) {
      this.submitDataOutput.emit(data);
    } else {
      this.errorMessage.emit('true');
    }
  }

  saveProductForAttachment(fileId, fileName, id, base64Data, fileValue) {
    this.regKitForAllRequestedType.value.ProductsForKit.splice(this.regKitForAllRequestedType.value.ProductsForKit.length - 1, 1);
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);
    const allDataForSave = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, data.id, data);

    this.attachmentFieldsForKits.filter(x => x.id === fileId).map(y => {
      y.loadingStatus = true;
    });

    this.getServices.createProductRequest(allDataForSave).subscribe((res: any) => {
      this.saveDataOutputForAttachment.emit(res.id);
      this.regKitForAllRequestedType.patchValue({
        id: res.id
      });

      this.requestId = res.id;
      return this.setAttachmentFileFunction(this.requestId, fileId, fileName, id, base64Data, fileValue);
    });
  }

  setAttachmentFileFunction(requestId, FileID, FileName, id, base64Data, fileValue) {
    const dataForRequest = this.convertDataForAttachmentRequestBody(requestId, FileID, FileName, id, base64Data, fileValue);

    this.attachmentFieldsForKits.filter(x => x.id === FileID).map(y => {
      y.loadingStatus = true;
    });

    this.getServices.setAttachmentFile(dataForRequest).subscribe((res: any) => {
      this.attachmentFieldsForKits.filter(x => x.id === FileID).map(y => {
        y.fileValue = res.ID;
        y.loadingStatus = false;
        this.isLoadingStatus.emit(false);
        this.regKitForAllRequestedType.get(FileID).setValue(res.ID);
      });

      return res;
    });
  }

  convertDataForAttachmentRequestBody(requestId, FileID, FileName, id, base64Data, fileValue) {
    return {
      RequestId: this.regKitForAllRequestedType.value.id ? this.regKitForAllRequestedType.value.id : this.requestId,
      AttachmentName: FileID,
      AttachmentFileName: FileName,
      base64Data: base64Data,
      ID: fileValue ? fileValue : id
    };
  }

  downloadFile(FileName) {
    this.getServices.getAttachmentFileByID(this.regKitForAllRequestedType.value.id, FileName).subscribe((res: any) => {
      this.convertFilesToPDF(res.base64Data, FileName);
    });
  }

  convertFilesToPDF(base64Data, fileName) {
    let obj = document.createElement('object');
    obj.style.width = '100%';
    obj.style.height = '842pt';
    obj.type = 'application/pdf';
    obj.data = 'data:application/pdf;base64,' + base64Data;

    var link = document.createElement('a');
    link.innerHTML = 'Download PDF file';
    link.download = `${fileName}`;
    link.className = 'pdfLink';
    link.href = 'data:application/pdf;base64,' + base64Data;

    link.click();
  }

  get ShortName(): FormArray {
    return this.regKitForAllRequestedType.get('shortName') as FormArray;
  }

  addShortName() {
    this.removeShortNameFieldStatus = false;
    if (this.ShortName.length < 10) {
      this.ShortName.push(this.fb.control('', Validators.pattern('^[a-zA-Z \-\']+'))); //
    }
  }

  removeShortName(i: number) {
    if (this.ShortName.value.length > 1) {
      this.removeShortNameFieldStatus = false;
      this.ShortName.removeAt(i);
    } else {
      this.removeShortNameFieldStatus = true;

      setTimeout(() => {
        this.removeShortNameFieldStatus = false;
      }, 1500);
    }
  }

  ProductGroupsRows(): FormArray {
    return this.regKitForAllRequestedType.get('ProductsForKit') as FormArray;
  }

  addProductsGroupRows() {
    this.editDetailedRowStatus = false;
    this.selectedKitProductsStatus = '';
    this.ProductGroupsRows().push(this.fb.group({
      productStatus: this.fb.control(''),
      NotificationNo: this.fb.control(''),
      productID: this.fb.control(''),
      productDetails: this.fb.group({
        id: 0,
        productArabicName: this.fb.control(''),
        productEnglishName: this.fb.control(''),
        shortName: this.fb.array([this.fb.control('')]),
        manufacturingCompany: this.fb.control(null),
        manufacturingCountry: this.fb.control(''),
        applicant: this.fb.control(''),
        licenseHolder: this.fb.control(''),
        licenseHolderTxt: this.fb.control(''),
        countryOfLicenseHolder: this.fb.control(''),
        tradeMark: this.fb.control(''),
        physicalState: this.fb.control(''),
        physicalStateTxt: this.fb.control(''),
        purposeOfUse: this.fb.control(''),
        purposeOfUseTxt: this.fb.control(''),
        storagePlace: this.fb.control(''),
        shelfLife: this.fb.control(0),
        receiptNumber: this.fb.control(''),
        receiptValue: this.fb.control(''),
        packagingTable: this.fb.array([this.fb.group({
          volumesID: this.fb.control(''),
          volumes: this.fb.control(''),
          unitOfMeasure: this.fb.control(''),
          typeOfPackaging: this.fb.control(''),
          packagingDescription: this.fb.control(''),
        })]),
        detailsTable: this.fb.array([this.fb.group({
          DetailsID: this.fb.control(''),
          PRODUCT_ID: this.fb.control(''),
          colour: this.fb.control(''),
          fragrance: this.fb.control(''),
          flavor: this.fb.control(''),
          barCode: this.fb.control(''),
          ingrediantDetails: this.fb.array([this.fb.group({
            Ingredient_ID: this.fb.control(''),
            ingrediant: this.fb.control(''),
            concentrations: this.fb.control(''),
            function: this.fb.control(''),
          })])
        })]),
        deletedIngredientsIds: this.fb.control(null),
        deletedProductDetailsIds: this.fb.control(null),
        deletedpacklstIds: this.fb.control(null),
        freeSale: this.fb.control(''),
        GMP: this.fb.control(''),
        CoA: this.fb.control(''),
        artWork: this.fb.control(''),
        leaflet: this.fb.control(''),
        reference: this.fb.control(''),
        methodOfAnalysis: this.fb.control(''),
        specificationsOfFinishedProduct: this.fb.control(''),
        receipt: this.fb.control(''),
        authorizationLetter: this.fb.control(''),
        manufacturingContract: this.fb.control(''),
        storageContract: this.fb.control(''),
        factoryLicense: this.fb.control(''),
        manufacturingAssignment: this.fb.control(''),
        commercialRecord: this.fb.control(''),
        stabilityStudy: this.fb.control(''),
        shelfLifeAttachment: this.fb.control(''),
        letterOfVariationFromLicenseHolder: this.fb.control(''),
        others: this.fb.control(''),
        otherFees: this.fb.control(''),
      })
    }));
  }

  removeProductsGroupRows(index) {
    this.ProductGroupsRows().removeAt(index);
    this.allProductsInKit.tableBody.splice(index, 1);
  }

  deletedProductsIdsList(index) {
    console.log('qwrqwerqwer', this.ProductGroupsRows().controls[index].value);
    console.log('qwrqwerqwer212121', this.ProductGroupsRows().controls[index].value.productDetails);
    this.deletedProductIdLists.push(this.ProductGroupsRows().controls[index].value.productDetails.id);
    this.regKitForAllRequestedType.get('deletedProductIdLists').patchValue(this.deletedProductIdLists);
  }

  getFormAsStarting(data) {
    if (data) {
      console.log('data', data);
      console.log('editFromWhere', this.editFromWhere);
      this.isDraft = data.isDraft === 1;
      if (this.editFromWhere) {
        data.shortName.map((X, i) => {
          if (data.shortName.length > 1 && i < data.shortName.length - 1) {
            this.addShortName();
          }
        });

        data.ProductsForKit.length > 0 ? data.ProductsForKit.map((x, i) => {
          if (data.ProductsForKit.length > 1 && i < data.ProductsForKit.length - 1) {
            this.addProductsGroupRows();
          }
        }) : data.ProductsForKit = [];
      }

      this.allProductsInKit.tableBody = [];
      data.ProductsForKit.length > 0 ? data.ProductsForKit.map((product, i) => {
        product.productStatus = '';
        this.formData.manufacturingCompanyList.filter(item => item.ID === product.productDetails.manufacturingCompany).map(x => product.productDetails.manufacturingCompany = x.NAME);
        this.formData.manufacturingCountryList.filter(item => item.ID === product.productDetails.manufacturingCountry).map(x => product.productDetails.manufacturingCountry = x.NAME);
        this.formData.applicantList.filter(option => option.ID === product.productDetails.applicant).map(x => product.productDetails.applicant = x.NAME);
        this.formData.licenseHolderList.filter(option => option.ID === product.productDetails.licenseHolder).map(x => product.productDetails.licenseHolder = x.NAME);
        this.formData.licenseHolderCountryList.filter(option => option.ID === product.productDetails.countryOfLicenseHolder).map(x => product.productDetails.countryOfLicenseHolder = x.NAME);
        this.formData.storagePlaceList.filter(option => option.ID === product.productDetails.storagePlace).map(x => product.productDetails.storagePlace = x.NAME);
        this.formData.physicalStateList.filter(option => option.ID === product.productDetails.physicalState).map(x => product.productDetails.physicalState = x.NAME);
        this.formData.purposeOfUseList.filter(option => option.ID === product.productDetails.purposeOfUse).map(x => product.productDetails.purposeOfUse = x.NAME);

        product.productDetails.detailsTable ? product.productDetails.detailsTable.map(x => {
          x.ingrediantDetails.map(y => {
            this.formData.ingrediantList.filter(option => option.ID === y.ingrediant).map(item => y.ingrediant = item.NAME);
            this.formData.functionList.filter(option => option.ID === y.function).map(item => y.function = item.NAME);
          });
        }) : null;

        this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, product.productDetails];
      }) : null;

      this.formData.manufacturingCompanyList.filter(item => item.ID === data.manufacturingCompany).map(x => data.manufacturingCompany = x.NAME);
      this.formData.manufacturingCountryList.filter(item => item.ID === data.manufacturingCountry).map(x => data.manufacturingCountry = x.NAME);
      this.formData.applicantList.filter(option => option.ID === data.applicant).map(x => data.applicant = x.NAME);
      this.formData.licenseHolderList.filter(option => option.ID === data.licenseHolder).map(x => data.licenseHolder = x.NAME);
      this.formData.licenseHolderCountryList.filter(option => option.ID === data.countryOfLicenseHolder).map(x => data.countryOfLicenseHolder = x.NAME);
      this.formData.storagePlaceList.filter(option => option.ID === data.storagePlace).map(x => data.storagePlace = x.NAME);

      this.regKitForAllRequestedType.valueChanges.subscribe(x => {
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

      this.productFlags = data.productFlags;
      this.productComments = data.productComments;

      this.regKitForAllRequestedType.patchValue({
        ...data
      });

      console.log('regKitForAllRequestedType', this.regKitForAllRequestedType.value);
    } else {
      this.regKitForAllRequestedType = this.fb.group({
        id: 0,
        productArabicName: this.fb.control(''),
        productEnglishName: this.fb.control('', Validators.required),
        shortName: this.fb.array([this.fb.control('', Validators.pattern('[A-Za-z0-9]+'))]),
        manufacturingCompany: this.fb.control(null, Validators.required),
        manufacturingCountry: this.fb.control('', Validators.required),
        applicant: this.fb.control('', Validators.required),
        licenseHolder: this.fb.control('', Validators.required),
        licenseHolderTxt: this.fb.control(''),
        countryOfLicenseHolder: this.fb.control('', Validators.required),
        tradeMark: this.fb.control(''),
        shelfLife: this.fb.control(null, Validators.required),
        storagePlace: this.fb.control('', this.selectedRequestedType !== 1 && this.selectedRequestedType !== 2 && this.selectedRequestedType !== 5 && this.selectedRequestedType !== 6 ? Validators.required : null),
        receiptNumber: !this.legacyStatus ? this.fb.control('', Validators.required) : this.fb.control(''),
        receiptValue: !this.legacyStatus ? this.fb.control('', [Validators.required, Validators.pattern(/(\d*(\d{2}\.)|\d{1,3})/)]) : this.fb.control(''),
        ProductsForKit: this.fb.array([this.fb.group({
          productStatus: this.fb.control(''),
          NotificationNo: this.fb.control(''),
          productID: this.fb.control(''),
          productDetails: this.fb.group({
            id: 0,
            productArabicName: this.fb.control(''),
            productEnglishName: this.fb.control(''),
            shortName: this.fb.array([this.fb.control('')]),
            manufacturingCompany: this.fb.control(null),
            manufacturingCountry: this.fb.control(''),
            applicant: this.fb.control(''),
            licenseHolder: this.fb.control(''),
            licenseHolderTxt: this.fb.control(''),
            countryOfLicenseHolder: this.fb.control(''),
            tradeMark: this.fb.control(''),
            physicalState: this.fb.control(''),
            physicalStateTxt: this.fb.control(''),
            purposeOfUse: this.fb.control(''),
            purposeOfUseTxt: this.fb.control(''),
            storagePlace: this.fb.control(''),
            shelfLife: this.fb.control(0),
            receiptNumber: this.fb.control(''),
            receiptValue: this.fb.control(''),
            packagingTable: this.fb.array([this.fb.group({
              volumesID: this.fb.control(''),
              volumes: this.fb.control(''),
              unitOfMeasure: this.fb.control(''),
              typeOfPackaging: this.fb.control(''),
              packagingDescription: this.fb.control(''),
            })]),
            detailsTable: this.fb.array([this.fb.group({
              DetailsID: this.fb.control(''),
              PRODUCT_ID: this.fb.control(''),
              colour: this.fb.control(''),
              fragrance: this.fb.control(''),
              flavor: this.fb.control(''),
              barCode: this.fb.control(''),
              ingrediantDetails: this.fb.array([this.fb.group({
                Ingredient_ID: this.fb.control(''),
                ingrediant: this.fb.control(''),
                concentrations: this.fb.control(''),
                function: this.fb.control(''),
              })])
            })]),
            deletedIngredientsIds: this.fb.control(null),
            deletedProductDetailsIds: this.fb.control(null),
            deletedpacklstIds: this.fb.control(null),
            freeSale: this.fb.control(''),
            GMP: this.fb.control(''),
            CoA: this.fb.control(''),
            artWork: this.fb.control(''),
            leaflet: this.fb.control(''),
            reference: this.fb.control(''),
            methodOfAnalysis: this.fb.control(''),
            specificationsOfFinishedProduct: this.fb.control(''),
            receipt: this.fb.control(''),
            authorizationLetter: this.fb.control(''),
            manufacturingContract: this.fb.control(''),
            storageContract: this.fb.control(''),
            factoryLicense: this.fb.control(''),
            manufacturingAssignment: this.fb.control(''),
            commercialRecord: this.fb.control(''),
            stabilityStudy: this.fb.control(''),
            shelfLifeAttachment: this.fb.control(''),
            letterOfVariationFromLicenseHolder: this.fb.control(''),
            others: this.fb.control(''),
            otherFees: this.fb.control(''),
          })
        })]),
        deletedProductIdLists: this.fb.control(null),
        freeSale: this.fb.control('', this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? Validators.required : null),
        GMP: this.fb.control(''),
        CoA: this.fb.control(''),
        artWork: this.fb.control('', Validators.required),
        leaflet: this.fb.control(''),
        reference: this.fb.control(''),
        methodOfAnalysis: this.fb.control(''),
        specificationsOfFinishedProduct: this.fb.control('', Validators.required),
        receipt: this.fb.control('', Validators.required),
        authorizationLetter: this.fb.control('', this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? Validators.required : null),
        manufacturingContract: this.fb.control('', this.selectedRequestedType === 8 ? Validators.required : null),
        storageContract: this.fb.control(''),
        factoryLicense: this.fb.control(''),
        manufacturingAssignment: this.fb.control(''),
        commercialRecord: this.fb.control(''),
        stabilityStudy: this.fb.control(''),
        shelfLifeAttachment: this.fb.control(''),
        letterOfVariationFromLicenseHolder: this.fb.control(''),
        others: this.fb.control(''),
        otherFees: this.fb.control('', Validators.required)
      });
    }
  }

  equalTheNewDetailsTable(index) {
    // this.detailsListTable.tableBody = this.regKitForAllRequestedType.get('ProductsForKit')[index]
  }

  editTheDetailsRow(event) {
    this.editDetailedRowStatus = true;
    this.editIndex = event;
  }

  applyProduct(data, status, index) {
    if (status === 'registered') {
      this.isLoading = true;
      this.getServices.getProductWithNotificationNumberList(Number(data.value.NotificationNo), 'kit').subscribe((res: any) => {
        if (res) {
          if (res.canUse) {
            const objectData = {
              ...res
            };

            this.ProductGroupsRows().value[index].productDetails = res;
            const keyOfLookup = Object.keys(this.lookupsData);
            keyOfLookup.map(key => {
              const keyLowerCase = key.replace('List', '');
              const value = objectData[keyLowerCase];

              this.lookupsData[key].filter(y => y.ID === value).map(x => {
                objectData[keyLowerCase] = x.NAME;
              });
            });

            this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, objectData];
            this.addProductsGroupRows();
          } else {
            this.handleError(res.canuseMsg);
          }
        }

        this.isLoading = false;
      }, error => this.handleError(error));

    } else if (status === 'new') {
      this.isLoading = true;
      console.log('data', data);
      console.log('status', status);
      this.getServices.getProductWithProductIDList(data.value.productID, 'kit').subscribe((res: any) => {
        if (res) {
          // if (res.canUse) {
          //
          // } else {
          //   this.handleError(res.canuseMsg);
          // }
          const objectData = {
            ...res
          };

          this.ProductGroupsRows().value[index].productID = res.id;
          this.ProductGroupsRows().value[index].productDetails = res;

          console.log('this.regKit', this.regKitForAllRequestedType);
          const keyOfLookup = Object.keys(this.lookupsData);
          keyOfLookup.map(key => {
            const keyLowerCase = key.replace('List', '');
            const value = objectData[keyLowerCase];

            this.lookupsData[key].filter(y => y.ID === value).map(x => {
              objectData[keyLowerCase] = x.NAME;
            });
          });

          this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, objectData];
          this.addProductsGroupRows();
        }

        this.isLoading = false;
      }, error => this.handleError(error));
    }
  }

  getProductTypeFromNewProductInKit(event) {
    this.selectedRegisteredProductTypeForProduct = event;
  }

  getDataForNewProduct(event) {
    this.ProductGroupsRows().value.filter(x => x.productStatus === 'New').map(y => {
      y.productDetails = event;
    });

    const lastRowInArray = this.ProductGroupsRows().value.length - 1;
    const data = {
      typeOfMarketing: this.selectedRegisteredProductTypeForProduct,
      typeOfRegistration: this.selectedRequestedType,
      trackType: this.selectedTrackType,
      ...this.ProductGroupsRows().value[lastRowInArray].productDetails
    };

    this.applyProduct(data, 'new', '');
  }

  getDecimalValue(value) {
    this.regKitForAllRequestedType.patchValue({
      receiptValue: this.number.transform(this.regKitForAllRequestedType.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
  }

  resetForms() {
    this.getFormAsStarting('');
  }

  getDisabledValues() {
    if (this.variationFields && this.variationFields.length > 0) {
      this.enableEditableFields = [];
      this.variationFields.map(x => {
        this.enableEditableFields = [...this.enableEditableFields, ...x.VARIATION_GROUP_FieldsDto.map(x => x.CODE)];
      });
    }
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

  convertAllNamingToId(data) {
    this.formData.manufacturingCompanyList.filter(option => option.NAME === data.manufacturingCompany).map(x => data.manufacturingCompany = x.ID);
    this.formData.manufacturingCountryList.filter(option => option.NAME === data.manufacturingCountry).map(x => data.manufacturingCountry = x.ID);
    this.formData.applicantList.filter(option => option.NAME === data.applicant).map(x => data.applicant = x.ID);
    this.formData.licenseHolderList.filter(option => option.NAME === data.licenseHolder).map(x => data.licenseHolder = x.ID);
    this.formData.licenseHolderCountryList.filter(option => option.NAME === data.countryOfLicenseHolder).map(x => data.countryOfLicenseHolder = x.ID);
    this.formData.physicalStateList.filter(option => option.NAME === data.physicalState).map(x => data.physicalState = x.ID);
    this.formData.purposeOfUseList.filter(option => option.NAME === data.purposeOfUse).map(x => data.purposeOfUse = x.ID);
    this.formData.storagePlaceList.filter(option => option.NAME === data.storagePlace).map(x => data.storagePlace = x.ID);

    return data;
  }

  setApplicant(companyProfileID) {
    this.formData.applicantList.filter(option => option.ID === companyProfileID).map(x => this.regKitForAllRequestedType.patchValue({
      applicant: x.NAME
    }));
  }

  // @ts-ignore
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

  private _subscribeToClosingActions(field, list): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    list.subscribe(x => {
      if (x.length === 0) {
        if (this.regKitForAllRequestedType.controls[field].dirty) {
          this.regKitForAllRequestedType.controls[field].setValue(null);
        }
      }
    });
  }

  private _subscribeToClosingActionsForKitProducts(field, list): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    list ? list.subscribe(y => {
      if (y.length === 0) {
        this.ProductGroupsRows().controls.map((x) => {
          if (x['controls'][field].dirty) {
            x['controls'][field].setValue(null);
          }
        });
      }
    }) : null;
  }

  checkValue(formControl, list, form) {
    console.log('formControl', formControl);
    console.log('list', list);
    console.log('form', form);
    if (list.filter(x => x.NAME === form.get(formControl).value).length === 0) {
      form.get(formControl).setValue(null);
    }
  }
}
