import {
  AfterViewInit,
  Component, DoCheck,
  ElementRef,
  EventEmitter, HostListener,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges, TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {DecimalPipe} from '@angular/common';
import {convertToSpecialObject, formDataClass} from '../../utils/formDataFunction';
import {Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {FormService} from '../services/form.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

export interface LookupState {
  ID: number;
  NAME: string;
}

@Component({
  selector: 'app-product-request-form',
  templateUrl: './product-request-form.component.html',
  styleUrls: ['./product-request-form.component.css']
})

export class ProductRequestFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() selectedRequestedType;
  @Input() selectedFormType;
  @Input() selectedTrackType;
  @Input() selectedIsExport;
  @Input() successSubmission;
  @Input() approvedStatus;
  @Input() trackProductStatus;
  @Input() editData;
  @Input() editFromWhere;
  @Input() getAllLookupsStatus;
  @Input() legacyStatus;
  @Input() reRegistrationStatus;
  @Input() variationFieldsStatus;
  @Input() variationFields;
  @Input() whichVariation;
  @Input() lookupsData;
  @Input() manufacturingCompanyList;
  @Input() companyProfile;
  @Input() kitProductStatus;
  @Input() saveFromAttachment;
  @Input() saveResponseDataForRegisterProductID;
  @Output() saveDataOutput = new EventEmitter();
  @Output() saveTrackDataOutput = new EventEmitter();
  @Output() saveDataOutputForAttachment = new EventEmitter();
  @Output() submitDataOutput = new EventEmitter();
  @Output() selectedTrackTypeForKit = new EventEmitter();
  @Output() selectedRegisteredTypeForKit = new EventEmitter();
  @Output() selectedRegisteredProductTypeForKit = new EventEmitter();
  @Output() manufacturingSearchText = new EventEmitter();
  @Output() companyProfileSearchText = new EventEmitter();
  @Output() ingrediantSearchText = new EventEmitter();
  @Output() errorMessage = new EventEmitter();
  @Output() errorMessageForAttachment = new EventEmitter();
  @Output() requestIsDraft = new EventEmitter();
  @Output() isLoadingStatus = new EventEmitter();
  @Output() errorForAttachemntRequest = new EventEmitter();
  @Output() enableEditingForTypeOfRegistration = new EventEmitter();
  formData;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;
  @ViewChild('packagingModal') modalTemplate: TemplateRef<any>;
  @ViewChild('detailedModal') modalDetailedTemplate: TemplateRef<any>;
  @ViewChildren(MatAutocompleteTrigger) triggerCollection: QueryList<MatAutocompleteTrigger>;
  @ViewChild('autoIngrediant', {static: false}) autoIngrediantInput: ElementRef;
  isDraft: boolean = false;
  detailsListTable = {
    tableHeader: ['Colour', 'Fragrance', 'Flavor', 'BarCode', 'Actions'],
    tableBody: []
  };
  packagingListTable = {
    tableHeader: ['Volumes', 'Unit of measure', 'type of packaging', 'Actions'],
    tableBody: []
  };
  attachmentFields = [
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
      name: 'Art Work',
      fileName: '',
      fileValue: '',
      required: !this.kitProductStatus ? true : false,
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
      id: 'receipt',
      name: 'receipt',
      fileName: '',
      fileValue: '',
      required: true,
      enable: !this.legacyStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'otherFees',
      name: 'otherFees',
      fileName: '',
      fileValue: '',
      required: true,
      enable: !this.legacyStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'factoryLicense',
      name: 'Factory license',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'manufacturingAssignment',
      name: 'Manufacturing Assignment',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'commercialRecordForSeller',
      name: 'Commercial Record For Seller',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'commercialRecordForBuyer',
      name: 'Commercial Record For Buyer',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'stabilityStudy',
      name: 'Stability study',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'shelfLifeAttachment',
      name: 'Shelf life',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
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
  editIndex;
  editDetailedRowStatus = false;
  editPackagingIndex;
  editPackagingRowStatus = false;
  regProductForAllRequestedType: FormGroup;
  regPackagingForProduct: FormGroup;
  regDetailedForProduct: FormGroup;
  subscription: Subscription;
  addShortNameFieldStatus = false;
  removeShortNameFieldStatus = false;
  trackTypeForNewProductInKit;
  requestedTypeForNewProductInKit;
  requestedProductTypeForNewProductInKit;
  isLoading: boolean = false;
  rangeInput;
  activeTabIndex;
  enableEditableFields = [];
  testModel;
  myChangedGroup;
  disabledSaveButton: boolean = false;
  productFlags;
  productComments;
  deletedPackagingList = [];
  deletedDetailedList = [];
  deletedIdsListForIngrediant = [];
  deletedShortNameList = [];
  attachmentRequiredStatus: boolean = false;
  requestId;
  objectForListOfVariationGroup: any;

  filteredOptionsForProductColor: Observable<LookupState[]>;
  filteredOptionsForManufacturingCompany: Observable<LookupState[]>;
  filteredOptionsForManufacturingCountry: Observable<LookupState[]>;
  filteredOptionsForLicenseHolder: Observable<LookupState[]>;
  filteredOptionsForLicenseHolderCountry: Observable<LookupState[]>;
  filteredOptionsForPhysicalState: Observable<LookupState[]>;
  filteredOptionsForPurposeOfUse: Observable<LookupState[]>;
  filteredOptionsForStoragePlace: Observable<LookupState[]>;
  filteredOptionsForUnitOfMeasure: Observable<LookupState[]>;
  filteredOptionsForTypeOfPackaging: Observable<LookupState[]>;
  filteredOptionsForIngradiant: Observable<LookupState[]>;
  filteredOptionsForFunction: Observable<LookupState[]>;
  modalRef: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-xl packagingModal',
  };
  editProcessInTrackedProduct: boolean = false;

  constructor(private fb: FormBuilder,
              private number: DecimalPipe,
              private router: Router,
              private modalService: BsModalService,
              private getService: FormService) {
    this.getFormAsStarting('');
    this.getPackagingFormAsStarting('');
    this.getDetailedFormAsStarting('');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.formData = {...this.lookupsData};
    this.getFormAsStarting('');

    if (this.successSubmission) {
      this.resetForms();
    }

    this.rerenderFileAttachmentList();

    this.getDisabledValues();

    this.getFormAsStarting(this.editData);

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
    this.setAllLookups();
    // this.getLookupForFormArray();

    this.regProductForAllRequestedType.valueChanges.subscribe(x => {
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
    this._subscribeToClosingActions('productColor', this.filteredOptionsForProductColor);
    this._subscribeToClosingActions('manufacturingCompany', this.filteredOptionsForManufacturingCompany);
    this._subscribeToClosingActions('manufacturingCountry', this.filteredOptionsForManufacturingCountry);
    this._subscribeToClosingActions('licenseHolder', this.filteredOptionsForLicenseHolder);
    this._subscribeToClosingActions('countryOfLicenseHolder', this.filteredOptionsForLicenseHolderCountry);
    this._subscribeToClosingActions('physicalState', this.filteredOptionsForPhysicalState);
    this._subscribeToClosingActions('purposeOfUse', this.filteredOptionsForPurposeOfUse);
    this._subscribeToClosingActions('storagePlace', this.filteredOptionsForStoragePlace);
    this._subscribeToClosingActionsForPackagingFormArray('unitOfMeasure', this.filteredOptionsForUnitOfMeasure);
    this._subscribeToClosingActionsForPackagingFormArray('typeOfPackaging', this.filteredOptionsForTypeOfPackaging);

    console.log('12341234', this.autoIngrediantInput); //.nativeElement.addEventListener('scroll', this.onScrollFunction(event))
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  getFormType(event) {
    this.requestedProductTypeForNewProductInKit = event.value;
    this.selectedRegisteredProductTypeForKit.emit(this.requestedProductTypeForNewProductInKit);
  }

  // Functions for Short name array
  get ShortName(): FormArray {
    return this.regProductForAllRequestedType.get('shortName') as FormArray;
  }

  addShortName() {
    this.addShortNameFieldStatus = false;
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

      this.deletedShortNameList.push(this.ShortName.value[i]);
      this.regProductForAllRequestedType.get('deletedShortNameList').patchValue(this.deletedShortNameList);

      this.ShortName.removeAt(i);
    } else {
      this.removeShortNameFieldStatus = true;

      setTimeout(() => {
        this.removeShortNameFieldStatus = false;
      }, 1500);
    }
  }

  getLookupForFormArray() {
    this.IngrediantDetailsRows().controls.map((x) => {
      this.filteredOptionsForIngradiant = this.filterLookupsFunction('ingrediant', x.get('ingrediant'), this.formData.ingrediantList);
      this.filteredOptionsForFunction = this.filterLookupsFunction('function', x.get('function'), this.formData.functionList);
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
    let resForSetAttachment;
    let attachmentValue;

    if (this.attachmentFields.filter(x => x.loadingStatus === true).length === 0) {
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'application/pdf' && event.target.files[0].size <= 2000000) {
          this.attachmentFields.filter(x => x.id === fileControlName).map(y => {
            y.fileName = event.target.value.split(/(\\|\/)/g).pop();
            attachmentValue = y.fileValue;
          });

          this.attachmentFields.filter(x => x.id === fileControlName).map(file => {
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
                this.setAttachmentFileFunction(this.regProductForAllRequestedType.value.id, fileControlName, file.name, 0, res.target.result, attachmentValue);
              }
            } else {
              if (!this.regProductForAllRequestedType.value.id) {
                this.saveProductForAttachment(fileControlName, file.name, 0, res.target.result, attachmentValue);
              } else {
                this.setAttachmentFileFunction(this.regProductForAllRequestedType.value.id, fileControlName, file.name, 0, res.target.result, attachmentValue);
              }
            }
          };

        } else {
          this.attachmentFields.filter(x => x.id === fileControlName).map(file => {
            file.attachmentTypeStatus = 'No';
            this.isLoadingStatus.emit(false);
          });
        }
      }
    }
  }

  removePackagingRows(i) {
    this.regProductForAllRequestedType.get('packagingTable').value.splice(i, 1);

    this.packagingListTable.tableBody = [];
    this.regProductForAllRequestedType.get('packagingTable').value.map((x, i) => {
      this.packagingListTable.tableBody = [...this.packagingListTable.tableBody, x];
    });
  }

  deletedPackagingIdsList(event) {
    this.deletedPackagingList = event;
    this.regProductForAllRequestedType.get('deletedpacklstIds').patchValue(event);
  }

  editThePackagingRows(event) {
    this.editPackagingRowStatus = true;
    this.editPackagingIndex = event;
    const editRowData = this.regProductForAllRequestedType.get('packagingTable').value[event];

    this.regPackagingForProduct.patchValue({
      ...editRowData
    });

    this.openModal(this.modalTemplate);
    this.rerenderSubscribtionForClosingActionForPackagingForm();
  }

  removeDetailedRows(i) {
    this.regProductForAllRequestedType.get('detailsTable').value.splice(i, 1);

    this.detailsListTable.tableBody = [];
    this.regProductForAllRequestedType.get('detailsTable').value.map((x, i) => {
      this.detailsListTable.tableBody = [...this.detailsListTable.tableBody, x];
    });
  }

  deletedDetailedIdsList(event) {
    this.deletedDetailedList = event;
    this.regProductForAllRequestedType.get('deletedProductDetailsIds').patchValue(event);
  }

  editTheDetailedRows(event) {
    this.editDetailedRowStatus = true;
    this.editIndex = event;
    const editRowData = this.regProductForAllRequestedType.get('detailsTable').value[event];

    editRowData.ingrediantDetails.length > 1 ? editRowData.ingrediantDetails.map((row, i) => {
      if (i >= 1) {
        this.addIngrediantDetailsRows();
      }
    }) : null;

    this.regDetailedForProduct.patchValue({
      ...editRowData
    });

    this.openModal(this.modalDetailedTemplate);

    this.rerenderSubscribtionForClosingActionForDetailsForm(event);
  }

  //functions for IngrediantDetailsRows
  IngrediantDetailsRows(): FormArray {
    return this.regDetailedForProduct.get('ingrediantDetails') as FormArray;
  }

  addIngrediantDetailsRows() {
    this.IngrediantDetailsRows().push(this.fb.group({
      Ingredient_ID: this.fb.control(''),
      ingrediant: this.fb.control('', Validators.required),
      concentrations: this.fb.control('', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]),
      function: this.fb.control('', Validators.required)
    }));

    this.rerenderSubscribtionForClosingActionForDetailsForm(this.IngrediantDetailsRows().controls.length - 1);
  }

  removeIngrediantDetailsRows(index) {
    this.IngrediantDetailsRows().removeAt(index);
    if (this.IngrediantDetailsRows().length === 0) {
      this.addIngrediantDetailsRows();
    }
  }

  deletedIngrediantIdsList(row) {
    this.deletedIdsListForIngrediant.push(row.value.Ingredient_ID);
    this.regProductForAllRequestedType.get('deletedIngredientsIds').patchValue(this.deletedIdsListForIngrediant);
  }

  saveData() {
    const data = this.convertAllNamingToId(this.regProductForAllRequestedType.value);

    data.packagingTable.map((item, i) => {
      if (this.editData.packagingTable[i]) {
        item.volumesID = this.editData.packagingTable[i].volumesID;
      }
    });

    data.detailsTable.map((item, i) => {
      if (this.editData.detailsTable[i]) {
        item.DetailsID = this.editData.detailsTable[i].DetailsID;
        item.PRODUCT_ID = this.editData.detailsTable[i].PRODUCT_ID;

        item.ingrediantDetails.map((element, index) => {
          if (this.editData.detailsTable[i].ingrediantDetails[index]) {
            element.Ingredient_ID = this.editData.detailsTable[i].ingrediantDetails[index].Ingredient_ID;
          }
        });
      }
    });

    const newObjectForData = {
      ...this.editData,
      ...data,
      ...this.objectForListOfVariationGroup
    };

    this.saveDataOutput.emit(newObjectForData);
  }

  saveTrackProductData() {
    const data = this.convertAllNamingToId(this.regProductForAllRequestedType.value);
    this.saveTrackDataOutput.emit(data);
  }

  saveProductForAttachment(fileId, fileName, id, base64Data, fileValue) {
    const data = this.convertAllNamingToId(this.regProductForAllRequestedType.value);
    const allDataForSave = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, data.id, data);

    this.attachmentFields.filter(x => x.id === fileId).map(y => {
      y.loadingStatus = true;
    });

    const newObjectData = {
      ...this.editData,
      ...allDataForSave
    };

    this.getService.createProductRequest(newObjectData).subscribe((res: any) => {
      this.editData = res;
      this.getFormAsStarting(res);
      this.saveDataOutputForAttachment.emit(res.id);
      this.regProductForAllRequestedType.patchValue({
        id: res.id
      });

      this.requestId = res.id;
      return this.setAttachmentFileFunction(this.requestId, fileId, fileName, id, base64Data, fileValue);
    });
  }

  saveProductForAttachmentVariation(fileId, fileName, id, base64Data, fileValue) {
    const data = this.convertAllNamingToId(this.regProductForAllRequestedType.value);
    const allDataForSave = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, data.id, data);

    this.attachmentFields.filter(x => x.id === fileId).map(y => {
      y.loadingStatus = true;
    });

    const newObject = {
      ...this.editData,
      ...allDataForSave,
      isDraft: 1,
      LKUP_REQ_TYPE_ID: this.whichVariation === 'do_tell_variation' ? 4 : 3,
      ...this.objectForListOfVariationGroup
    };

    this.getService.setVariationProduct(newObject).subscribe((res: any) => {
      this.editData = res;
      this.getFormAsStarting(res);
      this.regProductForAllRequestedType.patchValue({
        id: res.id
      });

      this.requestId = res.id;
      return this.setAttachmentFileFunction(this.requestId, fileId, fileName, id, base64Data, fileValue);
    });
  }

  onSubmit() {
    this.attachmentRequiredStatus = true;
    const data = this.convertAllNamingToId(this.regProductForAllRequestedType.value);

    const newObjectForData = {
      ...this.editData,
      ...data,
      ...this.objectForListOfVariationGroup
    };
    if (this.regProductForAllRequestedType.valid && this.regProductForAllRequestedType.get('packagingTable').value.length > 0 && this.regProductForAllRequestedType.get('detailsTable').value.length > 0) {
      this.submitDataOutput.emit(newObjectForData);
    } else {
      this.errorMessage.emit('true');
    }
  }

  onSubmitForPackagingForm() {
    const data = this.regPackagingForProduct.value;
    data.unitOfMeasure = this.checkControllerValueWithListForPackaginArray(this.formData.unitOfMeasureList, 'unitOfMeasure', data.unitOfMeasure);
    data.typeOfPackaging = this.checkControllerValueWithListForPackaginArray(this.formData.typeOfPackagingList, 'typeOfPackaging', data.typeOfPackaging);

    if (this.regPackagingForProduct.valid) {
      if (!this.editPackagingIndex && this.editPackagingIndex !== 0) {
        this.regProductForAllRequestedType.value.packagingTable.push({...this.regPackagingForProduct.value});
      } else {
        this.regProductForAllRequestedType.get('packagingTable').value[this.editPackagingIndex] = this.regPackagingForProduct.value;
        this.editPackagingRowStatus = false;
        this.editPackagingIndex = '';
      }

      this.modalRef.hide();

      this.packagingListTable.tableBody = this.regProductForAllRequestedType.get('packagingTable').value;

      this.getPackagingFormAsStarting('');
    } else {
      this.errorMessage.emit('true');
    }
  }

  onSubmitForDetailedForm() {
    const data = this.regDetailedForProduct.value;
    data.ingrediantDetails.map((option, index) => {
      option.ingrediant = this.checkControllerValueWithListForDetailsArray(this.formData.ingrediantList, 'ingrediant', option.ingrediant, index);
      option.function = this.checkControllerValueWithListForDetailsArray(this.formData.functionList, 'function', option.function, index);
    });

    if (this.regDetailedForProduct.valid) {
      if (!this.editIndex && this.editIndex !== 0) {
        this.regProductForAllRequestedType.value.detailsTable.push({...this.regDetailedForProduct.value});
      } else {
        this.regProductForAllRequestedType.get('detailsTable').value[this.editIndex] = this.regDetailedForProduct.value;
        this.editDetailedRowStatus = false;
        this.editIndex = '';
      }

      this.modalRef.hide();

      this.detailsListTable.tableBody = this.regProductForAllRequestedType.get('detailsTable').value;

      this.getDetailedFormAsStarting('');
    } else {
      this.errorMessage.emit('true');
    }
  }

  getFormAsStarting(data) {
    if (data) {
      this.setAllLookups();
      this.isDraft = data.isDraft === 1;
      this.requestIsDraft.emit(data.isDraft === 1);

      data.shortName ? data.shortName.map((X, i) => {
        if (data.shortName.length > 1 && i < data.shortName.length - 1) {
          this.addShortName();
        }
      }) : data.shortName = [];

      this.packagingListTable.tableBody = [];
      data.packagingTable ? data.packagingTable.map((x, i) => {
        this.packagingListTable.tableBody = [...this.packagingListTable.tableBody, x];
      }) : null;

      this.detailsListTable.tableBody = [];
      data.detailsTable ? data.detailsTable.map((x, i) => {
        this.detailsListTable.tableBody = [...this.detailsListTable.tableBody, x];
      }) : null;

      this.formData.productColorList.filter(item => item.ID === data.productColor).map(x => data.productColor = x.NAME);
      this.formData.manufacturingCompanyList.filter(item => item.ID === data.manufacturingCompany).map(x => data.manufacturingCompany = x.NAME);
      this.formData.manufacturingCountryList.filter(option => option.ID === data.manufacturingCountry).map(x => data.manufacturingCountry = x.NAME);
      this.formData.applicantList.filter(option => option.ID === data.applicant).map(x => data.applicant = x.NAME);
      this.formData.licenseHolderList.filter(option => option.ID === data.licenseHolder).map(x => data.licenseHolder = x.NAME);
      this.formData.licenseHolderCountryList.filter(option => option.ID === data.countryOfLicenseHolder).map(x => data.countryOfLicenseHolder = x.NAME);
      this.formData.physicalStateList.filter(option => option.ID === data.physicalState).map(x => data.physicalState = x.NAME);
      this.formData.purposeOfUseList.filter(option => option.ID === data.purposeOfUse).map(x => data.purposeOfUse = x.NAME);
      this.formData.storagePlaceList.filter(option => option.ID === data.storagePlace).map(x => data.storagePlace = x.NAME);
      this.formData.unitOfMeasureList.filter(option => option.ID === data.unitOfMeasure).map(x => data.unitOfMeasure = x.NAME);
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

      this.regProductForAllRequestedType.valueChanges.subscribe(x => {
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
        this.attachmentFields.filter(fileID => fileID.id === file.attachmentName).map(y => {
          y.fileName = file.attachmentFileName;
          y.fileValue = file.Id;
        });
      }) : null;

      this.regProductForAllRequestedType.patchValue({
        ...data
      });

      data.productAttachments.map((x, i) => {
        this.regProductForAllRequestedType.get(`${x.attachmentName}`).patchValue(x.Id);
      });

      data.receiptValue === 0 ? this.regProductForAllRequestedType.get('receiptValue').patchValue('') : null;
    } else {
      this.regProductForAllRequestedType = this.fb.group({
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
        physicalState: this.fb.control('', Validators.required),
        physicalStateTxt: this.fb.control(''),
        purposeOfUse: this.fb.control('', Validators.required),
        purposeOfUseTxt: this.fb.control(''),
        storagePlace: this.fb.control('', this.selectedRequestedType === 3 || this.selectedRequestedType === 4 || this.selectedRequestedType === 7 || this.selectedRequestedType === 8 || this.selectedRequestedType === 9 ? Validators.required : null),
        shelfLife: this.fb.control(null, Validators.required),
        receiptNumber: !this.legacyStatus ? this.fb.control('', Validators.required) : this.fb.control(''),
        receiptValue: !this.legacyStatus ? this.fb.control('', [Validators.required, Validators.pattern(/(\d*(\d{2}\.)|\d{1,3})/)]) : this.fb.control(''),
        packagingTable: this.fb.control([]),
        detailsTable: this.fb.control([]),
        deletedShortNameList: this.fb.control([]),
        deletedIngredientsIds: this.fb.control(null),
        deletedProductDetailsIds: this.fb.control(null),
        deletedpacklstIds: this.fb.control(null),
        freeSaleDoc: this.fb.control(''),
        GMP: this.fb.control(''),
        CoA: this.fb.control('', this.selectedRequestedType === 1 && this.selectedRequestedType === 2 ? Validators.required : null),
        artWork: this.fb.control('', this.kitProductStatus !== true ? Validators.required : null),
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
        commercialRecordForSeller: this.fb.control(''),
        commercialRecordForBuyer: this.fb.control(''),
        stabilityStudy: this.fb.control(''),
        shelfLifeAttachment: this.fb.control(''),
        letterOfVariationFromLicenseHolder: this.fb.control(''),
        others: this.fb.control(''),
        otherFees: !this.legacyStatus ? this.fb.control('', Validators.required) : this.fb.control(''),
      });
    }
  }

  getPackagingFormAsStarting(data) {
    if (data) {

    } else {
      this.regPackagingForProduct = this.fb.group({
        volumesID: this.fb.control(''),
        volumes: this.fb.control('', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]),
        unitOfMeasure: this.fb.control('', Validators.required),
        typeOfPackaging: this.fb.control('', Validators.required),
        packagingDescription: this.fb.control(''),
        isCartonBox: this.fb.control(''),
      });
    }
  }

  getDetailedFormAsStarting(data) {
    if (data) {

    } else {
      this.regDetailedForProduct = this.fb.group({
        DetailsID: this.fb.control(''),
        PRODUCT_ID: this.fb.control(''),
        colour: this.fb.control(''),
        fragrance: this.fb.control(''),
        flavor: this.fb.control(''),
        barCode: this.fb.control(''),
        ingrediantDetails: this.fb.array([this.fb.group({
          Ingredient_ID: this.fb.control(''),
          ingrediant: this.fb.control('', Validators.required),
          concentrations: this.fb.control('', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]),
          function: this.fb.control('', Validators.required),
        })])
      });
    }
  }

  getDecimalValue(value) {
    this.regProductForAllRequestedType.patchValue({
      receiptValue: this.number.transform(this.regProductForAllRequestedType.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
  }

  resetForms() {
    this.getFormAsStarting('');
  }

  setShelfValue(event) {
    if (Number(event.target.value) > 60) {
      this.regProductForAllRequestedType.get('shelfLife').patchValue(60);
    } else {
      this.regProductForAllRequestedType.get('shelfLife').patchValue(Number(event.target.value));
    }
  }

  getDisabledValues() {
    let variaionGroupCodeList = [];
    let variaionGroupFieldsCodeList = [];
    if (this.variationFields && this.variationFields.length > 0) {
      this.enableEditableFields = [];
      this.rerenderFileAttachmentList();

      this.variationFields.map(x => {
        this.enableEditableFields = [...this.enableEditableFields, ...x.VARIATION_GROUP_FieldsDto.map(x => x.CODE)];


        variaionGroupCodeList = [...variaionGroupCodeList, x.Code];
        variaionGroupFieldsCodeList = [...variaionGroupFieldsCodeList, ...x.VARIATION_GROUP_FieldsDto.map(x => x.CODE)];

        this.objectForListOfVariationGroup = {
          variationGroups: variaionGroupCodeList,
          variationFields: variaionGroupFieldsCodeList,
        };
      });

      this.enableEditingForTypeOfRegistration.emit(this.enableEditableFields);
      this.enableEditableFields.map(field => {
        if (this.regProductForAllRequestedType.get(field)) {
          this.regProductForAllRequestedType.get(field).setValidators(Validators.required);

          this.attachmentFields.filter(file => file.id === field).length > 0 ?
            this.attachmentFields.filter(file => file.id === field).map(item => {
              item.required = true;
            }) : null;
        }
      });
    } else {
      this.enableEditingForTypeOfRegistration.emit([]);
    }
  }

  filterLookupsFunction(whichLookup, formControlValue, list) {
    if (formControlValue) {
      return formControlValue.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterInsideList(whichLookup, state, list).slice(0, 1000) : list.slice(0, 1000))
        );
    }
  }

  filterInsideList(lookup, value, list): LookupState[] {
    let filterValue;
    if (value) {
      filterValue = value.toLowerCase() ? value.toLowerCase() : '';
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
    data.physicalState = this.checkControllerValueWithList(this.formData.physicalStateList, 'physicalState', data.physicalState);
    data.purposeOfUse = this.checkControllerValueWithList(this.formData.purposeOfUseList, 'purposeOfUse', data.purposeOfUse);
    data.storagePlace = this.checkControllerValueWithList(this.formData.storagePlaceList, 'storagePlace', data.storagePlace);

    data.packagingTable.map(x => {
      this.formData.unitOfMeasureList.filter(option => option.NAME === x.unitOfMeasure).map(item => x.unitOfMeasure = item.ID);
      this.formData.typeOfPackagingList.filter(option => option.NAME === x.typeOfPackaging).map(item => x.typeOfPackaging = item.ID);
    });

    data.detailsTable.map(x => {
      x.ingrediantDetails.map(y => {
        this.formData.ingrediantList.filter(option => option.NAME === y.ingrediant).map(item => y.ingrediant = item.ID);
        this.formData.functionList.filter(option => option.NAME === y.function).map(item => y.function = item.ID);
      });
    });

    return data;
  }

  setApplicant(companyProfileID) {
    this.formData.applicantList.filter(option => option.ID === companyProfileID).map(x => this.regProductForAllRequestedType.patchValue({
      applicant: x.NAME
    }));
  }

  private _subscribeToClosingActions(field, list): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    list.subscribe(x => {
      if (x.length === 0) {

        if (this.regProductForAllRequestedType.controls[field].dirty) {
          this.regProductForAllRequestedType.controls[field].setValue(null);
        }
      }
    });
  }

  private _subscribeToClosingActionsForPackagingFormArray(field, list): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    list ? list.subscribe(x => {
      if (x.length === 0) {
        if (this.regPackagingForProduct.controls[field].dirty) {
          this.regPackagingForProduct.controls[field].setValue(null);
        }
      }
    }) : null;
  }

  private _subscribeToClosingActionsForDetailsFormArray(field, list, index): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    list ? list.subscribe(y => {
      if (y && y.length === 0) {
        this.IngrediantDetailsRows().controls.map((x, i) => {
          if (i === index) {
            if (x['controls'][field].dirty) {
              x['controls'][field].setValue(null);
            }
          }
        });
      }
    }) : null;
  }

  setAttachmentFileFunction(requestId, FileID, FileName, id, base64Data, fileValue) {
    const dataForRequest = this.convertDataForAttachmentRequestBody(requestId, FileID, FileName, id, base64Data, fileValue);

    this.attachmentFields.filter(x => x.id === FileID).map(y => {
      y.loadingStatus = true;
    });

    this.getService.setAttachmentFile(dataForRequest).subscribe((res: any) => {
      this.attachmentFields.filter(x => x.id === FileID).map(y => {
        y.fileValue = res.ID;
        y.loadingStatus = false;
        this.isLoadingStatus.emit(false);
        this.regProductForAllRequestedType.get(FileID).setValue(res.ID);
      });

      return res;
    }, error => this.handleError(error)); //
  }

  downloadFile(FileName) {
    this.getService.getAttachmentFileByID(this.regProductForAllRequestedType.value.id, FileName).subscribe((res: any) => {
      this.convertFilesToPDF(res.base64Data, FileName);
    });
  }

  convertDataForAttachmentRequestBody(requestId, FileID, FileName, id, base64Data, fileValue) {
    return {
      RequestId: this.regProductForAllRequestedType.value.id ? this.regProductForAllRequestedType.value.id : this.requestId,
      AttachmentName: FileID,
      AttachmentFileName: FileName,
      base64Data: base64Data,
      ID: fileValue ? fileValue : id
    };
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  closePackagingModal() {
    this.getPackagingFormAsStarting('');
    this.modalRef.hide();
    this.editPackagingRowStatus = false;
  }

  closeDetailedForm() {
    this.getDetailedFormAsStarting('');
    this.modalRef.hide();
    this.editDetailedRowStatus = false;
  }

  checkValue(formControl, list, form) {
    if (list.filter(x => x.NAME.includes(form.get(formControl).value)).length === 0) {
      form.get(formControl).setValue(null);
    }
  }

  handleError(error) {
    this.errorMessageForAttachment.emit(error);
    this.isLoadingStatus.emit(false);
  }

  checkControllerValueWithList(list, formControlKey, formControlValue) {
    let value;
    if (list.filter(option => option.NAME === formControlValue).length > 0) {
      list.filter(option => option.NAME === formControlValue).map(x => {
        value = x.ID;
      });
    } else {
      this.regProductForAllRequestedType.get(formControlKey).patchValue('');
      value = '';
    }
    return value;
  }

  checkControllerValueWithListForPackaginArray(list, formControlKey, formControlValue) {
    let value;
    if (list.filter(option => option.NAME === formControlValue).length > 0) {
      list.filter(option => option.NAME === formControlValue).map(x => {
        value = x.NAME;
      });
    } else {
      this.regPackagingForProduct.get(formControlKey).patchValue('');
      value = '';
    }
    return value;
  }

  checkControllerValueWithListForDetailsArray(list, formControlKey, formControlValue, ingrediantIndex) {
    let value;
    if (list.filter(option => option.NAME === formControlValue).length > 0) {
      list.filter(option => option.NAME === formControlValue).map(x => {
        value = x.NAME;
      });
    } else {
      this.IngrediantDetailsRows().controls[ingrediantIndex].get(formControlKey).patchValue('');

      value = '';
    }
    return value;
  }

  rerenderSubscribtionForClosingActionForPackagingForm() {
    this.filteredOptionsForUnitOfMeasure = this.filterLookupsFunction('unitOfMeasure', this.regPackagingForProduct.get('unitOfMeasure'), this.formData.unitOfMeasureList);
    this.filteredOptionsForTypeOfPackaging = this.filterLookupsFunction('typeOfPackaging', this.regPackagingForProduct.get('typeOfPackaging'), this.formData.typeOfPackagingList);

    this._subscribeToClosingActionsForPackagingFormArray('unitOfMeasure', this.filteredOptionsForUnitOfMeasure);
    this._subscribeToClosingActionsForPackagingFormArray('typeOfPackaging', this.filteredOptionsForTypeOfPackaging);
  }

  rerenderSubscribtionForClosingActionForDetailsForm(index) {
    this.getLookupForFormArray();

    this._subscribeToClosingActionsForDetailsFormArray('ingrediant', this.filteredOptionsForIngradiant, index);
    this._subscribeToClosingActionsForDetailsFormArray('function', this.filteredOptionsForFunction, index);
  }

  rerenderFileAttachmentList() {
    this.attachmentFields = [
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
        name: 'Art Work',
        fileName: '',
        fileValue: '',
        required: !this.kitProductStatus ? true : false,
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
        id: 'receipt',
        name: 'receipt',
        fileName: '',
        fileValue: '',
        required: true,
        enable: !this.legacyStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'otherFees',
        name: 'otherFees',
        fileName: '',
        fileValue: '',
        required: true,
        enable: !this.legacyStatus ? true : false,
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
        id: 'commercialRecordForSeller',
        name: 'Commercial Record For Seller',
        fileName: '',
        fileValue: '',
        required: false,
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'commercialRecordForBuyer',
        name: 'Commercial Record For Buyer',
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
  }

  filterLookupsFunctionForIngredient(whichLookup, formControlValue, list) {
    let historyValue;
    let historyList: any[];
    if (formControlValue) {
      return formControlValue.valueChanges
        .pipe(
          startWith(''),
          distinctUntilChanged(),
          map((state: string) => {
            // this.isLoading = true;
            if (state) {
              if (historyValue !== state) {
                historyValue = state;
                if (state.length > 1) {
                  this.getDataAfterFiltering(state).then(res => {
                    historyList = res;
                    this.isLoading = false;
                    return historyList;
                  });
                } else {
                  return list.slice();
                }
              } else {
                this.isLoading = false;
                if (historyList && historyList.length > 0) {
                  return historyList;
                } else {
                  return list.slice();
                }
              }
            } else {
              this.isLoading = false;
              return list.slice();
            }
          })
        );
    }
  }

  async getDataAfterFiltering(state): Promise<any[]> {
    let responseOfRequest: any[];
    const request = await this.getService.getProductIngrediantsLookUp(1, state);
    const PromiseValue = new Promise(resolve => {
      request.subscribe(res => {
        responseOfRequest = res;
      }, error => this.handleError(error), () => {
        resolve(responseOfRequest);
      });
    });

    return PromiseValue.then((res: any[]) => res);
  }

  setAllLookups() {
    this.filteredOptionsForProductColor = this.filterLookupsFunction('productColor', this.regProductForAllRequestedType.get('productColor'), this.formData.productColorList);
    this.filteredOptionsForManufacturingCompany = this.filterLookupsFunction('manufacturingCompany', this.regProductForAllRequestedType.get('manufacturingCompany'), this.formData.manufacturingCompanyList);
    this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction('manufacturingCountry', this.regProductForAllRequestedType.get('manufacturingCountry'), this.formData.manufacturingCountryList);
    this.filteredOptionsForLicenseHolder = this.filterLookupsFunction('licenseHolder', this.regProductForAllRequestedType.get('licenseHolder'), this.formData.licenseHolderList);
    this.filteredOptionsForLicenseHolderCountry = this.filterLookupsFunction('countryOfLicenseHolder', this.regProductForAllRequestedType.get('countryOfLicenseHolder'), this.formData.licenseHolderCountryList);
    this.filteredOptionsForPhysicalState = this.filterLookupsFunction('physicalState', this.regProductForAllRequestedType.get('physicalState'), this.formData.physicalStateList);
    this.filteredOptionsForPurposeOfUse = this.filterLookupsFunction('purposeOfUse', this.regProductForAllRequestedType.get('purposeOfUse'), this.formData.purposeOfUseList);
    this.filteredOptionsForStoragePlace = this.filterLookupsFunction('storagePlace', this.regProductForAllRequestedType.get('storagePlace'), this.formData.storagePlaceList);
    this.filteredOptionsForUnitOfMeasure = this.filterLookupsFunction('unitOfMeasure', this.regPackagingForProduct.get('unitOfMeasure'), this.formData.unitOfMeasureList);
    this.filteredOptionsForTypeOfPackaging = this.filterLookupsFunction('typeOfPackaging', this.regPackagingForProduct.get('typeOfPackaging'), this.formData.typeOfPackagingList);
  }

  onScrollFunction(event) {

  }
}
