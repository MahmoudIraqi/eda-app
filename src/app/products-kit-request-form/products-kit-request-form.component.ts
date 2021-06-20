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
  @Input() approvedStatus;
  @Input() trackProductStatus;
  @Input() editData;
  @Input() whichVariation;
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
  @Output() requestIsDraft = new EventEmitter();
  @Output() errorMessage = new EventEmitter();
  @Output() isLoadingStatus = new EventEmitter();
  @Output() errorForAttachemntRequest = new EventEmitter();

  formData;
  selectedKitProductsStatus;
  regKitForAllRequestedType: FormGroup;
  attachmentFields = [
    {
      id: 'freeSaleDoc',
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
      id: 'freeSaleDoc',
      name: 'Free Sale',
      fileName: '',
      fileValue: '',
      required: false,
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
      required: this.selectedRequestedType === 8 ? true : false,
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
  addShortNameFieldStatus = false;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('insideFormTabs', {static: false}) insideFormTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;
  status;
  allProductsInKit = {
    tableHeader: ['Notification/Request Number', 'Product Name', 'Manufacturing Company', 'Manufacturing Country', 'Applicant', 'Actions'],
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
  filteredOptionsForProductColor: Observable<LookupState[]>;
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
  appliedProductStatus: boolean = false;
  deletedProductIdLists = [];
  objectForListOfVariationGroup: any;
  lookupForProductIdsInputForChildComponents;
  editProcessInTrackedProduct: boolean = false;

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

    this.attachmentFieldsForKits = [
      {
        id: 'freeSaleDoc',
        name: 'Free Sale',
        fileName: '',
        fileValue: '',
        required: false,
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
        required: this.selectedRequestedType === 8 ? true : false,
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

    this.getDisabledValues();

    this.lookupForProductIdsInputForChildComponents = this.lookupForProductIds;

    if (this.editData) {
      this.getFormAsStarting(this.editData);
    }

    this.setApplicant(this.companyProfile);

    if (this.editData && this.editData.productFlags) {
      Object.keys(this.editData.productFlags).map(item => {
        if (this.editData.productFlags[item]) {
          this.editProcessInTrackedProduct = true;
        }
      });
    }
  }

  ngOnInit(): void {
    this.filteredOptionsForProductColor = this.filterLookupsFunction(this.regKitForAllRequestedType.get('productColor'), this.formData.productColorList);
    this.filteredOptionsForManufacturingCompany = this.filterLookupsFunction(this.regKitForAllRequestedType.get('manufacturingCompany'), this.formData.manufacturingCompanyList);
    this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction(this.regKitForAllRequestedType.get('manufacturingCountry'), this.formData.manufacturingCountryList);
    this.filteredOptionsForApplicant = this.filterLookupsFunction(this.regKitForAllRequestedType.get('applicant'), this.formData.applicantList);
    this.filteredOptionsForLicenseHolder = this.filterLookupsFunction(this.regKitForAllRequestedType.get('licenseHolder'), this.formData.licenseHolderList);
    this.filteredOptionsForLicenseHolderCountry = this.filterLookupsFunction(this.regKitForAllRequestedType.get('countryOfLicenseHolder'), this.formData.licenseHolderCountryList);
    this.filteredOptionsForStoragePlace = this.filterLookupsFunction(this.regKitForAllRequestedType.get('storagePlace'), this.formData.storagePlaceList);

    this.regKitForAllRequestedType.valueChanges.subscribe(x => {
      for (let i = 0; i < Object.values(x).length; i++) {
        if (typeof Object.values(x)[i] !== 'object' && Object.keys(x)[i] !== 'applicant') {
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
    this._subscribeToClosingActions('productColor', this.filteredOptionsForProductColor);
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
        if (event.target.files[0].type === 'application/pdf' && event.target.files[0].size <= 2000000) {

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
            if (this.variationFieldsStatus) {
              if (this.editData.isVariationSaved === false) {
                this.saveProductForAttachmentVariation(fileControlName, file.name, 0, res.target.result, attachmentValue);
              } else {
                this.setAttachmentFileFunction(this.regKitForAllRequestedType.value.id, fileControlName, file.name, 0, res.target.result, attachmentValue);
              }
            } else {
              if (!this.regKitForAllRequestedType.value.id) {
                this.saveProductForAttachment(fileControlName, file.name, 0, res.target.result, attachmentValue);
              } else {
                this.setAttachmentFileFunction(this.regKitForAllRequestedType.value.id, fileControlName, file.name, 0, res.target.result, attachmentValue);
              }
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
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);

    const newObjectForData = {
      ...this.editData,
      ...data,
      ...this.objectForListOfVariationGroup
    };

    this.saveDataOutput.emit(newObjectForData);
  }

  onSubmit() {
    this.attachmentRequiredStatus = true;
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);

    const newObjectForData = {
      ...this.editData,
      ...data,
      ...this.objectForListOfVariationGroup
    };

    if (this.regKitForAllRequestedType.valid && this.allProductsInKit.tableBody.length > 0) {
      this.submitDataOutput.emit(newObjectForData);
    } else {
      this.errorMessage.emit('true');
    }
  }

  saveProductForAttachment(fileId, fileName, id, base64Data, fileValue) {
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);
    const allDataForSave = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, data.id, data);

    this.attachmentFieldsForKits.filter(x => x.id === fileId).map(y => {
      y.loadingStatus = true;
    });

    this.getServices.createProductKitRequest(allDataForSave).subscribe((res: any) => {
      this.editData = res;
      this.saveDataOutputForAttachment.emit(res.id);
      this.regKitForAllRequestedType.patchValue({
        id: res.id
      });

      this.requestId = res.id;
      return this.setAttachmentFileFunction(this.requestId, fileId, fileName, id, base64Data, fileValue);
    });
  }

  saveProductForAttachmentVariation(fileId, fileName, id, base64Data, fileValue) {
    this.regKitForAllRequestedType.value.ProductsForKit.splice(this.regKitForAllRequestedType.value.ProductsForKit.length - 1, 1);
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);
    const allDataForSave = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, data.id, data);

    this.attachmentFieldsForKits.filter(x => x.id === fileId).map(y => {
      y.loadingStatus = true;
    });


    const newObject = {
      ...this.editData,
      ...allDataForSave,
      isDraft: 1,
      LKUP_REQ_TYPE_ID: this.whichVariation === 'do_tell_variation' ? 4 : 3,
      ...this.objectForListOfVariationGroup
    };


    this.getServices.setVariationProduct(newObject).subscribe((res: any) => {
      this.editData = res;
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
    }, error => {
      this.errorForAttachemntRequest.emit(error);
      this.isLoadingStatus.emit(false);
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
      this.ShortName.push(this.legacyStatus ? this.fb.control('', Validators.pattern('^(?:\\b\\w+\\b[^\u0621-\u064A]|[\\b\\w]*){1,4}$')) : this.fb.control('', [Validators.required, Validators.pattern('^(?:\\b\\w+\\b[^\u0621-\u064A]|[\\b\\w]*){1,4}$')]));
    } else {
      this.addShortNameFieldStatus = true;

      setTimeout(() => {
        this.addShortNameFieldStatus = false;
      }, 1500);
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

  removeProductsGroupRows(index) {
    this.regKitForAllRequestedType.get('ProductsForKit').value.splice(index, 1);
    this.allProductsInKit.tableBody.splice(index, 1);
  }

  deletedProductsIdsList(index) {
    this.deletedProductIdLists.push(this.regKitForAllRequestedType.get('ProductsForKit').value[index].productDetails.id);
    this.regKitForAllRequestedType.get('deletedProductIdLists').patchValue(this.deletedProductIdLists);
  }

  getFormAsStarting(data) {
    if (data) {
      this.isDraft = data.isDraft === 1;
      this.requestIsDraft.emit(data.isDraft === 1);

      data.shortName.map((X, i) => {
        if (data.shortName.length > 1 && i < data.shortName.length - 1) {
          this.addShortName();
        }
      });

      this.allProductsInKit.tableBody = [];
      data.ProductsForKit && data.ProductsForKit.length > 0 ? data.ProductsForKit.map((product, i) => {
        this.formData.productColorList.filter(item => item.ID === product.productDetails.productColor).map(x => product.productDetails.productColor = x.NAME);
        this.formData.manufacturingCompanyList.filter(item => item.ID === product.productDetails.manufacturingCompany).map(x => product.productDetails.manufacturingCompany = x.NAME);
        this.formData.manufacturingCountryList.filter(item => item.ID === product.productDetails.manufacturingCountry).map(x => product.productDetails.manufacturingCountry = x.NAME);
        this.formData.applicantList.filter(option => option.ID === product.productDetails.applicant).map(x => product.productDetails.applicant = x.NAME);
        this.formData.licenseHolderList.filter(option => option.ID === product.productDetails.licenseHolder).map(x => product.productDetails.licenseHolder = x.NAME);
        this.formData.licenseHolderCountryList.filter(option => option.ID === product.productDetails.countryOfLicenseHolder).map(x => product.productDetails.countryOfLicenseHolder = x.NAME);
        this.formData.storagePlaceList.filter(option => option.ID === product.productDetails.storagePlace).map(x => product.productDetails.storagePlace = x.NAME);
        this.formData.physicalStateList.filter(option => option.ID === product.productDetails.physicalState).map(x => product.productDetails.physicalState = x.NAME);
        this.formData.purposeOfUseList.filter(option => option.ID === product.productDetails.purposeOfUse).map(x => product.productDetails.purposeOfUse = x.NAME);

        product.productDetails.packagingTable ? product.productDetails.packagingTable.map(x => {
          this.formData.unitOfMeasureList.filter(option => option.ID === x.unitOfMeasure).map(item => x.unitOfMeasure = item.NAME);
          this.formData.typeOfPackagingList.filter(option => option.ID === x.typeOfPackaging).map(item => x.typeOfPackaging = item.NAME);
        }) : null;
        product.productDetails.detailsTable ? product.productDetails.detailsTable.map(x => {
          x.ingrediantDetails.map(y => {
            this.formData.ingrediantList.filter(option => option.ID === y.ingrediant).map(item => y.ingrediant = item.NAME);
            this.formData.functionList.filter(option => option.ID === y.function).map(item => y.function = item.NAME);
          });
        }) : null;

        this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, product.productDetails];
      }) : null;

      this.formData.productColorList.filter(item => item.ID === data.productColor).map(x => data.productColor = x.NAME);
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

      data.productAttachments ? data.productAttachments.map(file => {
        this.attachmentFieldsForKits.filter(fileID => fileID.id === file.attachmentName).map(y => {
          y.fileName = file.attachmentFileName;
          y.fileValue = file.Id;
        });
      }) : null;

      this.regKitForAllRequestedType.patchValue({
        ...data
      });

      data.productAttachments.map((x, i) => {
        this.regKitForAllRequestedType.get(`${x.attachmentName}`).patchValue(x.Id);
      });

      data.receiptValue === 0 ? this.regKitForAllRequestedType.get('receiptValue').patchValue('') : null;
      // thi
    } else {
      this.regKitForAllRequestedType = this.fb.group({
        productColor: this.fb.control(''),
        id: 0,
        productArabicName: this.fb.control('', Validators.pattern('^[\u0621-\u064A]+[ 0-9\u0621-\u064A-_*]*$')),
        productEnglishName: this.fb.control('', [Validators.required, Validators.pattern('^(?:\\b\\w+\\b[^\u0621-\u064A]|[\\b\\w])*$')]),
        shortName: this.legacyStatus ? this.fb.array([this.fb.control('', Validators.pattern('^(?:\\b\\w+\\b[^\u0621-\u064A]|[\\b\\w]*){1,4}$'))]) : this.fb.array([this.fb.control('', [Validators.required, Validators.pattern('^(?:\\b\\w+\\b[^\u0621-\u064A]|[\\b\\w]*){1,4}$')])]),
        manufacturingCompany: this.fb.control(null, Validators.required),
        manufacturingCountry: this.fb.control('', Validators.required),
        applicant: this.fb.control('', Validators.required),
        licenseHolder: this.fb.control('', Validators.required),
        licenseHolderTxt: this.fb.control(''),
        countryOfLicenseHolder: this.fb.control('', Validators.required),
        tradeMark: this.fb.control(''),
        shelfLife: this.fb.control(null, Validators.required),
        storagePlace: this.fb.control('', this.selectedRequestedType === 3 || this.selectedRequestedType === 4 || this.selectedRequestedType === 7 || this.selectedRequestedType === 8 || this.selectedRequestedType === 9 ? Validators.required : null),
        receiptNumber: !this.legacyStatus ? this.fb.control('', Validators.required) : this.fb.control(''),
        receiptValue: !this.legacyStatus ? this.fb.control('', [Validators.required, Validators.pattern(/(\d*(\d{2}\.)|\d{1,3})/)]) : this.fb.control(''),
        ProductsForKit: this.fb.control([]),
        deletedProductIdLists: this.fb.control(null),
        freeSaleDoc: this.fb.control(''),
        GMP: this.fb.control(''),
        CoA: this.fb.control(''),
        artWork: this.fb.control('', Validators.required),
        leaflet: this.fb.control(''),
        reference: this.fb.control(''),
        methodOfAnalysis: this.fb.control(''),
        specificationsOfFinishedProduct: this.fb.control('', Validators.required),
        receipt: !this.legacyStatus ? this.fb.control('', Validators.required) : this.fb.control(''),
        authorizationLetter: this.fb.control('', this.selectedRequestedType === 1 || this.selectedRequestedType === 2 || this.selectedRequestedType === 3 || this.selectedRequestedType === 4 || this.selectedRequestedType === 5 || this.selectedRequestedType === 6 ? Validators.required : null),
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

  applyProduct(event) {
    if (event.status === 'Registered') {
      this.isLoading = true;
      this.appliedProductStatus = false;
      if (this.allProductsInKit.tableBody.filter(product => product.NotificationNo === event.notificationNumberOrId).length === 0) {
        this.getServices.getProductWithNotificationNumberList(event.notificationNumberOrId, 'kit').subscribe((res: any) => {
          if (res) {
            if (res.canUse) {
              const objectData = {
                ...res
              };

              this.formData.productColorList.filter(item => item.ID === objectData.productColor).map(x => objectData.productColor = x.NAME);
              this.formData.manufacturingCompanyList.filter(item => item.ID === objectData.manufacturingCompany).map(x => objectData.manufacturingCompany = x.NAME);
              this.formData.manufacturingCountryList.filter(item => item.ID === objectData.manufacturingCountry).map(x => objectData.manufacturingCountry = x.NAME);
              this.formData.applicantList.filter(option => option.ID === objectData.applicant).map(x => objectData.applicant = x.NAME);
              this.formData.licenseHolderList.filter(option => option.ID === objectData.licenseHolder).map(x => objectData.licenseHolder = x.NAME);
              this.formData.licenseHolderCountryList.filter(option => option.ID === objectData.countryOfLicenseHolder).map(x => objectData.countryOfLicenseHolder = x.NAME);
              this.formData.storagePlaceList.filter(option => option.ID === objectData.storagePlace).map(x => objectData.storagePlace = x.NAME);
              this.formData.physicalStateList.filter(option => option.ID === objectData.physicalState).map(x => objectData.physicalState = x.NAME);
              this.formData.purposeOfUseList.filter(option => option.ID === objectData.purposeOfUse).map(x => objectData.purposeOfUse = x.NAME);

              objectData.packagingTable ? objectData.packagingTable.map(x => {
                this.formData.unitOfMeasureList.filter(option => option.ID === x.unitOfMeasure).map(item => x.unitOfMeasure = item.NAME);
                this.formData.typeOfPackagingList.filter(option => option.ID === x.typeOfPackaging).map(item => x.typeOfPackaging = item.NAME);
              }) : null;
              objectData.detailsTable ? objectData.detailsTable.map(x => {
                x.ingrediantDetails.map(y => {
                  this.formData.ingrediantList.filter(option => option.ID === y.ingrediant).map(item => y.ingrediant = item.NAME);
                  this.formData.functionList.filter(option => option.ID === y.function).map(item => y.function = item.NAME);
                });
              }) : null;

              this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, objectData];


              const resObject = {
                productStatus: event.status,
                NotificationNo: event.status === 'Registered' ? event.notificationNumberOrId : '',
                productID: event.status === 'New' ? event.notificationNumberOrId : '',
                productDetails: res
              };


              this.regKitForAllRequestedType.get('ProductsForKit').value.push(resObject);


            } else {
              this.handleError(res.canuseMsg);
            }
          }
          this.isLoading = false;
          this.appliedProductStatus = true;
        }, error => this.handleError(error));
      } else {
        this.handleError('This product already added to this kit');
      }
    } else if (event.status === 'New') {
      this.isLoading = true;
      this.appliedProductStatus = false;

      if (this.allProductsInKit.tableBody.filter(product => product.id === event.notificationNumberOrId).length === 0) {
        this.getServices.getProductWithProductIDList(event.notificationNumberOrId, 'kit').subscribe((res: any) => {
          if (res) {
            if (res.canUse) {
              const objectData = {
                ...res
              };

              this.formData.productColorList.filter(item => item.ID === objectData.productColor).map(x => objectData.productColor = x.NAME);
              this.formData.manufacturingCompanyList.filter(item => item.ID === objectData.manufacturingCompany).map(x => objectData.manufacturingCompany = x.NAME);
              this.formData.manufacturingCountryList.filter(item => item.ID === objectData.manufacturingCountry).map(x => objectData.manufacturingCountry = x.NAME);
              this.formData.applicantList.filter(option => option.ID === objectData.applicant).map(x => objectData.applicant = x.NAME);
              this.formData.licenseHolderList.filter(option => option.ID === objectData.licenseHolder).map(x => objectData.licenseHolder = x.NAME);
              this.formData.licenseHolderCountryList.filter(option => option.ID === objectData.countryOfLicenseHolder).map(x => objectData.countryOfLicenseHolder = x.NAME);
              this.formData.storagePlaceList.filter(option => option.ID === objectData.storagePlace).map(x => objectData.storagePlace = x.NAME);
              this.formData.physicalStateList.filter(option => option.ID === objectData.physicalState).map(x => objectData.physicalState = x.NAME);
              this.formData.purposeOfUseList.filter(option => option.ID === objectData.purposeOfUse).map(x => objectData.purposeOfUse = x.NAME);

              objectData.packagingTable ? objectData.packagingTable.map(x => {
                this.formData.unitOfMeasureList.filter(option => option.ID === x.unitOfMeasure).map(item => x.unitOfMeasure = item.NAME);
                this.formData.typeOfPackagingList.filter(option => option.ID === x.typeOfPackaging).map(item => x.typeOfPackaging = item.NAME);
              }) : null;
              objectData.detailsTable ? objectData.detailsTable.map(x => {
                x.ingrediantDetails.map(y => {
                  this.formData.ingrediantList.filter(option => option.ID === y.ingrediant).map(item => y.ingrediant = item.NAME);
                  this.formData.functionList.filter(option => option.ID === y.function).map(item => y.function = item.NAME);
                });
              }) : null;

              this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, objectData];


              const resObject = {
                productStatus: event.status,
                NotificationNo: event.status === 'Registered' ? event.notificationNumberOrId : '',
                productID: event.status === 'New' ? event.notificationNumberOrId : '',
                productDetails: res
              };


              this.regKitForAllRequestedType.get('ProductsForKit').value.push(resObject);

              this.isLoading = false;
              this.appliedProductStatus = true;
            } else {
              this.handleError(res.canuseMsg);
            }
          }
        }, error => this.handleError(error));
      } else {
        this.handleError('This product already added to this kit');
      }
    }
  }

  getProductTypeFromNewProductInKit(event) {
    this.selectedRegisteredProductTypeForProduct = event;
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
    let variaionGroupCodeList = [];
    let variaionGroupFieldsCodeList = [];
    if (this.variationFields && this.variationFields.length > 0) {
      this.enableEditableFields = [];
      this.variationFields.map(x => {
        this.enableEditableFields = [...this.enableEditableFields, ...x.VARIATION_GROUP_FieldsDto.map(x => x.CODE)];

        variaionGroupCodeList = [...variaionGroupCodeList, x.Code];
        variaionGroupFieldsCodeList = [...variaionGroupFieldsCodeList, ...x.VARIATION_GROUP_FieldsDto.map(x => x.CODE)];

        this.objectForListOfVariationGroup = {
          variationGroups: variaionGroupCodeList,
          variationFields: variaionGroupFieldsCodeList,
        };
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
    data.productColor = this.checkControllerValueWithList(this.formData.productColorList, 'productColor', data.productColor);
    data.manufacturingCompany = this.checkControllerValueWithList(this.formData.manufacturingCompanyList, 'manufacturingCompany', data.manufacturingCompany);
    data.manufacturingCountry = this.checkControllerValueWithList(this.formData.manufacturingCountryList, 'manufacturingCountry', data.manufacturingCountry);
    data.applicant = this.checkControllerValueWithList(this.formData.applicantList, 'applicant', data.applicant);
    data.licenseHolder = this.checkControllerValueWithList(this.formData.licenseHolderList, 'licenseHolder', data.licenseHolder);
    data.countryOfLicenseHolder = this.checkControllerValueWithList(this.formData.licenseHolderCountryList, 'countryOfLicenseHolder', data.countryOfLicenseHolder);
    data.storagePlace = this.checkControllerValueWithList(this.formData.storagePlaceList, 'storagePlace', data.storagePlace);

    data.packagingTable ? data.packagingTable.map(x => {
      this.formData.unitOfMeasureList.filter(option => option.ID === x.unitOfMeasure).map(item => x.unitOfMeasure = item.NAME);
      this.formData.typeOfPackagingList.filter(option => option.ID === x.typeOfPackaging).map(item => x.typeOfPackaging = item.NAME);
    }) : null;
    data.detailsTable ? data.detailsTable.map(x => {
      x.ingrediantDetails.map(y => {
        this.formData.ingrediantList.filter(option => option.ID === y.ingrediant).map(item => y.ingrediant = item.NAME);
        this.formData.functionList.filter(option => option.ID === y.function).map(item => y.function = item.NAME);
      });
    }) : null;

    return data;
  }

  checkControllerValueWithList(list, formControlKey, formControlValue) {
    let value;
    if (list.filter(option => option.NAME === formControlValue).length > 0) {
      list.filter(option => option.NAME === formControlValue).map(x => {
        value = x.ID;
      });
    } else {
      this.regKitForAllRequestedType.get(formControlKey).patchValue('');
      value = '';
    }
    return value;
  }

  setApplicant(companyProfileID) {
    this.formData.applicantList.filter(option => option.ID === companyProfileID).map(x => this.regKitForAllRequestedType.patchValue({
      applicant: x.NAME
    }));
  }

  setShelfValue(event) {
    if (Number(event.target.value) > 60) {
      this.regKitForAllRequestedType.get('shelfLife').patchValue(60);
    } else {
      this.regKitForAllRequestedType.get('shelfLife').patchValue(Number(event.target.value));
    }
  }

  // @ts-ignore
  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
    this.appliedProductStatus = false;
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

  // private _subscribeToClosingActionsForKitProducts(field, list): void {
  //   if (this.subscription && !this.subscription.closed) {
  //     this.subscription.unsubscribe();
  //   }
  //   list ? list.subscribe(y => {
  //     if (y.length === 0) {
  //       this.ProductGroupsRows().controls.map((x) => {
  //         if (x['controls'][field].dirty) {
  //           x['controls'][field].setValue(null);
  //         }
  //       });
  //     }
  //   }) : null;
  // }

  checkValue(formControl, list, form) {
    if (list.filter(x => x.NAME === form.get(formControl).value).length === 0) {
      form.get(formControl).setValue(null);
    }
  }
}
