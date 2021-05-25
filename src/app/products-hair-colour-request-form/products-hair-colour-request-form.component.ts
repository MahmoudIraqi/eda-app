import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges, TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {LookupState} from '../product-request-form/product-request-form.component';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';
import {FormService} from '../services/form.service';
import {convertToSpecialObject} from '../../utils/formDataFunction';

@Component({
  selector: 'app-products-hair-colour-request-form',
  templateUrl: './products-hair-colour-request-form.component.html',
  styleUrls: ['./products-hair-colour-request-form.component.css']
})
export class ProductsHairColourRequestFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() selectedRequestedType;
  @Input() selectedFormType;
  @Input() selectedTrackType;
  @Input() selectedIsExport;
  @Input() successSubmission;
  @Input() editData;
  @Input() editFromWhere;
  @Input() getAllLookupsStatus;
  @Input() legacyStatus;
  @Input() reRegistrationStatus;
  @Input() variationFieldsStatus;
  @Input() variationFields;
  @Input() lookupsData;
  @Input() manufacturingCompanyList;
  @Input() companyProfile;
  @Input() kitProductStatus;
  @Input() saveFromAttachment;
  @Input() saveResponseDataForRegisterProductID;
  @Output() saveDataOutput = new EventEmitter();
  @Output() saveDataOutputForAttachment = new EventEmitter();
  @Output() submitDataOutput = new EventEmitter();
  @Output() selectedTrackTypeForKit = new EventEmitter();
  @Output() selectedRegisteredTypeForKit = new EventEmitter();
  @Output() selectedRegisteredProductTypeForKit = new EventEmitter();
  @Output() manufacturingSearchText = new EventEmitter();
  @Output() companyProfileSearchText = new EventEmitter();
  @Output() ingrediantSearchText = new EventEmitter();
  @Output() errorMessage = new EventEmitter();
  @Output() isLoadingStatus = new EventEmitter();
  formData;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;
  @ViewChild('packagingModal') modalTemplate: TemplateRef<any>;
  @ViewChild('detailedModal') modalDetailedTemplate: TemplateRef<any>;
  @ViewChildren(MatAutocompleteTrigger) triggerCollection: QueryList<MatAutocompleteTrigger>;
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
      id: 'commercialRecord',
      name: 'Commercial Record',
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
  regHairColorantProductForAllRequestedType: FormGroup;
  regPackagingForProduct: FormGroup;
  regDetailedForProduct: FormGroup;
  subscription: Subscription;
  removeShortNameFieldStatus = false;
  trackTypeForNewProductInKit;
  requestedTypeForNewProductInKit;
  requestedProductTypeForNewProductInKit;
  isloading: boolean = false;
  rangeInput;
  activeTabIndex;
  enableEditableFields = [];
  testModel;
  myChangedGroup;
  disabledSaveButton: boolean = false;
  productFlags;
  productComments;
  requestId;
  deletedPackagingList = [];
  deletedDetailedList = [];
  deletedIdsListForIngrediant = [];

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
  attachmentRequiredStatus: boolean = false;

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

    this.attachmentFields = [
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

    this.getFormAsStarting(this.editData);

    this.setApplicant(this.companyProfile);

    this.getDisabledValues();
  }

  ngOnInit(): void {
    this.filteredOptionsForProductColor = this.filterLookupsFunction('productColor', this.regHairColorantProductForAllRequestedType.get('productColor'), this.formData.productColorList);
    this.filteredOptionsForManufacturingCompany = this.filterLookupsFunction('manufacturingCompany', this.regHairColorantProductForAllRequestedType.get('manufacturingCompany'), this.formData.manufacturingCompanyList);
    this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction('manufacturingCountry', this.regHairColorantProductForAllRequestedType.get('manufacturingCountry'), this.formData.manufacturingCountryList);
    this.filteredOptionsForLicenseHolder = this.filterLookupsFunction('licenseHolder', this.regHairColorantProductForAllRequestedType.get('licenseHolder'), this.formData.licenseHolderList);
    this.filteredOptionsForLicenseHolderCountry = this.filterLookupsFunction('countryOfLicenseHolder', this.regHairColorantProductForAllRequestedType.get('countryOfLicenseHolder'), this.formData.licenseHolderCountryList);
    this.filteredOptionsForPhysicalState = this.filterLookupsFunction('physicalState', this.regHairColorantProductForAllRequestedType.get('physicalState'), this.formData.physicalStateList);
    this.filteredOptionsForPurposeOfUse = this.filterLookupsFunction('purposeOfUse', this.regHairColorantProductForAllRequestedType.get('purposeOfUse'), this.formData.purposeOfUseList);
    this.filteredOptionsForStoragePlace = this.filterLookupsFunction('storagePlace', this.regHairColorantProductForAllRequestedType.get('storagePlace'), this.formData.storagePlaceList);
    this.filteredOptionsForUnitOfMeasure = this.filterLookupsFunction('unitOfMeasure', this.regPackagingForProduct.get('unitOfMeasure'), this.formData.unitOfMeasureList);
    this.filteredOptionsForTypeOfPackaging = this.filterLookupsFunction('typeOfPackaging', this.regPackagingForProduct.get('typeOfPackaging'), this.formData.typeOfPackagingList);

    this.getLookupForFormArray();

    this.regHairColorantProductForAllRequestedType.valueChanges.subscribe(x => {
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
    this._subscribeToClosingActionsForDetailsFormArray('ingrediant', this.filteredOptionsForIngradiant);
    this._subscribeToClosingActionsForDetailsFormArray('function', this.filteredOptionsForFunction);
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
    return this.regHairColorantProductForAllRequestedType.get('shortName') as FormArray;
  }

  addShortName() {
    this.removeShortNameFieldStatus = false;
    if (this.ShortName.length < 10) {
      this.ShortName.push(this.fb.control('', Validators.pattern('^[a-zA-Z \-\']+')));
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
        if (event.target.files[0].type === 'application/pdf') {

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
            if (!this.regHairColorantProductForAllRequestedType.value.id) {

              this.saveProductForAttachment(fileControlName, file.name, 0, res.target.result, attachmentValue);
            } else {
              this.setAttachmentFileFunction(this.regHairColorantProductForAllRequestedType.value.id, fileControlName, file.name, 0, res.target.result, attachmentValue);
            }
          };

        }// this.regHairColorantProductForAllRequestedType.get(fileControlName).setValue(file);
        else {
          this.attachmentFields.filter(x => x.id === fileControlName).map(file => {
            file.attachmentTypeStatus = 'No';
            this.isLoadingStatus.emit(false);
          });
        }
      }
    }
  }

  removePackagingRows(i) {
    this.regHairColorantProductForAllRequestedType.get('packagingTable').value.splice(i, 1);

    this.packagingListTable.tableBody = [];
    this.regHairColorantProductForAllRequestedType.get('packagingTable').value.map((x, i) => {
      this.packagingListTable.tableBody = [...this.packagingListTable.tableBody, x];
    });
  }

  deletedPackagingIdsList(event) {
    this.deletedPackagingList = event;
    this.regHairColorantProductForAllRequestedType.get('deletedpacklstIds').patchValue(event);
  }

  editThePackagingRows(event) {
    this.editPackagingRowStatus = true;
    this.editPackagingIndex = event;
    const editRowData = this.regHairColorantProductForAllRequestedType.get('packagingTable').value[event];

    this.regPackagingForProduct.patchValue({
      ...editRowData
    });

    this.openModal(this.modalTemplate);
  }

  removeDetailedRows(i) {
    this.regHairColorantProductForAllRequestedType.get('detailsTable').value.splice(i, 1);

    this.detailsListTable.tableBody = [];
    this.regHairColorantProductForAllRequestedType.get('detailsTable').value.map((x, i) => {
      this.detailsListTable.tableBody = [...this.detailsListTable.tableBody, x];
    });
  }

  deletedDetailedIdsList(event) {
    this.deletedDetailedList = event;
    this.regHairColorantProductForAllRequestedType.get('deletedProductDetailsIds').patchValue(event);
  }

  editTheDetailedRows(event) {
    this.editDetailedRowStatus = true;
    this.editIndex = event;
    const editRowData = this.regHairColorantProductForAllRequestedType.get('detailsTable').value[event];

    editRowData.ingrediantDetails.length > 1 ? editRowData.ingrediantDetails.map((row, i) => {
      if (i >= 1) {
        this.addIngrediantDetailsRows();
      }
    }) : null;

    this.regDetailedForProduct.patchValue({
      ...editRowData
    });

    this.openModal(this.modalDetailedTemplate);
  }

  //functions for IngrediantDetailsRows
  IngrediantDetailsRows(): FormArray {
    return this.regDetailedForProduct.get('ingrediantDetails') as FormArray;
  }

  addIngrediantDetailsRows() {
    this.IngrediantDetailsRows().push(this.fb.group({
      Ingredient_ID: this.fb.control(''),
      ingrediant: this.fb.control('', Validators.required),
      concentrations: this.fb.control('', Validators.required),
      function: this.fb.control('', Validators.required)
    }));
  }

  removeIngrediantDetailsRows(index) {
    this.IngrediantDetailsRows().removeAt(index);
    if (this.IngrediantDetailsRows().length === 0) {
      this.addIngrediantDetailsRows();
    }
  }

  deletedIngrediantIdsList(row) {
    this.deletedIdsListForIngrediant.push(row.value.Ingredient_ID);
    this.regHairColorantProductForAllRequestedType.get('deletedIngredientsIds').patchValue(this.deletedIdsListForIngrediant);
  }

  saveData() {
    const data = this.convertAllNamingToId(this.regHairColorantProductForAllRequestedType.value);
    this.saveDataOutput.emit(data);
  }

  saveProductForAttachment(fileId, fileName, id, base64Data, fileValue) {
    const data = this.convertAllNamingToId(this.regHairColorantProductForAllRequestedType.value);
    const allDataForSave = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, data.id, data);

    this.attachmentFields.filter(x => x.id === fileId).map(y => {
      y.loadingStatus = true;
    });

    this.getService.createProductRequest(allDataForSave).subscribe((res: any) => {
      this.saveDataOutputForAttachment.emit(res.id);
      this.regHairColorantProductForAllRequestedType.patchValue({
        id: res.id
      });

      this.requestId = res.id;
      return this.setAttachmentFileFunction(this.requestId, fileId, fileName, id, base64Data, fileValue);
    });
  }

  onSubmit() {
    this.attachmentRequiredStatus = true;
    const data = this.convertAllNamingToId(this.regHairColorantProductForAllRequestedType.value);

    if (this.regHairColorantProductForAllRequestedType.valid && this.regHairColorantProductForAllRequestedType.get('packagingTable').value.length > 0 && this.regHairColorantProductForAllRequestedType.get('detailsTable').value.length > 0) {
      this.submitDataOutput.emit(data);
    } else {
      this.errorMessage.emit('true');
    }
  }

  onSubmitForPackagingForm() {
    if (this.regPackagingForProduct.valid) {
      if (!this.editPackagingIndex && this.editPackagingIndex !== 0) {
        this.regHairColorantProductForAllRequestedType.value.packagingTable.push({...this.regPackagingForProduct.value});
      } else {
        this.regHairColorantProductForAllRequestedType.get('packagingTable').value[this.editPackagingIndex] = this.regPackagingForProduct.value;
        this.editPackagingRowStatus = false;
        this.editPackagingIndex = '';
      }

      this.modalRef.hide();

      this.packagingListTable.tableBody = this.regHairColorantProductForAllRequestedType.get('packagingTable').value;

      this.getPackagingFormAsStarting('');
    } else {
      this.errorMessage.emit('true');
    }
  }

  onSubmitForDetailedForm() {
    if (this.regDetailedForProduct.valid) {
      if (!this.editIndex && this.editIndex !== 0) {
        this.regHairColorantProductForAllRequestedType.value.detailsTable.push({...this.regDetailedForProduct.value});
      } else {
        this.regHairColorantProductForAllRequestedType.get('detailsTable').value[this.editIndex] = this.regDetailedForProduct.value;
        this.editDetailedRowStatus = false;
        this.editIndex = '';
      }

      this.modalRef.hide();

      this.detailsListTable.tableBody = this.regHairColorantProductForAllRequestedType.get('detailsTable').value;

      this.getDetailedFormAsStarting('');
    } else {
      this.errorMessage.emit('true');
    }
  }

  getFormAsStarting(data) {
    if (data) {
      this.isDraft = data.isDraft === 1;
      if (this.editFromWhere) {
        data.shortName ? data.shortName.map((X, i) => {
          if (data.shortName.length > 1 && i < data.shortName.length - 1) {
            this.addShortName();
          }
        }) : data.shortName = [];
      }

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

      this.regHairColorantProductForAllRequestedType.valueChanges.subscribe(x => {
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

      this.regHairColorantProductForAllRequestedType.patchValue({
        ...data
      });

      data.productAttachments.map((x, i) => {
        this.regHairColorantProductForAllRequestedType.get(`${x.attachmentName}`).patchValue(x.Id);
      });
    } else {
      this.regHairColorantProductForAllRequestedType = this.fb.group({
        id: 0,
        productArabicName: this.fb.control(''),
        productEnglishName: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z]+[ 0-9a-zA-Z-_*]*$')]),
        shortName: this.fb.array([this.fb.control('', [this.selectedRequestedType !== 6 && this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 ? Validators.required : null, Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$')])]),
        productColor: this.fb.control(''),
        manufacturingCompany: this.fb.control('', Validators.required),
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
        shelfLife: this.fb.control(0),
        storagePlace: this.fb.control('', this.selectedRequestedType !== 1 && this.selectedRequestedType !== 2 && this.selectedRequestedType !== 5 && this.selectedRequestedType !== 6 ? Validators.required : null),
        receiptNumber: this.fb.control('', Validators.required), //[Validators.required, Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$')]
        receiptValue: this.fb.control('', [Validators.required, Validators.pattern(/(\d*(\d{2}\.)|\d{1,3})/)]),
        packagingTable: this.fb.control([]),
        detailsTable: this.fb.control([]),
        deletedIngredientsIds: this.fb.control(null),
        deletedProductDetailsIds: this.fb.control(null),
        deletedpacklstIds: this.fb.control(null),
        freeSale: this.fb.control('', this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? Validators.required : null),
        GMP: this.fb.control(''),
        CoA: this.fb.control('', this.selectedRequestedType === 1 && this.selectedRequestedType === 2 ? Validators.required : null),
        artWork: this.fb.control('', Validators.required),
        leaflet: this.fb.control(''),
        reference: this.fb.control(''),
        methodOfAnalysis: this.fb.control(''),
        specificationsOfFinishedProduct: this.fb.control('', Validators.required),
        receipt: this.fb.control('', Validators.required),
        authorizationLetter: this.fb.control('', this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? Validators.required : null),
        manufacturingContract: this.fb.control('', this.selectedRequestedType === 7 ? Validators.required : null),
        storageContract: this.fb.control(''),
        factoryLicense: this.fb.control(''),
        manufacturingAssignment: this.fb.control(''),
        commercialRecord: this.fb.control(''),
        stabilityStudy: this.fb.control(''),
        shelfLifeAttachment: this.fb.control(''),
        letterOfVariationFromLicenseHolder: this.fb.control(''),
        others: this.fb.control(''),
        otherFees: this.fb.control('', Validators.required),
      });
    }
  }

  getPackagingFormAsStarting(data) {
    if (data) {

    } else {
      this.regPackagingForProduct = this.fb.group({
        volumesID: this.fb.control(''),
        volumes: this.fb.control('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
        unitOfMeasure: this.fb.control('', Validators.required),
        typeOfPackaging: this.fb.control('', Validators.required),
        packagingDescription: this.fb.control(''),
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
          concentrations: this.fb.control('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          function: this.fb.control('', Validators.required),
        })])
      });
    }
  }

  getDecimalValue(value) {
    this.regHairColorantProductForAllRequestedType.patchValue({
      receiptValue: this.number.transform(this.regHairColorantProductForAllRequestedType.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
  }

  resetForms() {
    this.getFormAsStarting('');
  }

  setShelfValue(event) {
    if (Number(event.target.value) > 60) {
      this.regHairColorantProductForAllRequestedType.get('shelfLife').patchValue(60);
    } else {
      this.regHairColorantProductForAllRequestedType.get('shelfLife').patchValue(Number(event.target.value));
    }
  }

  getDisabledValues() {
    if (this.variationFields && this.variationFields.length > 0) {
      this.enableEditableFields = [];
      this.variationFields.map(x => {
        this.enableEditableFields = [...this.enableEditableFields, ...x.VARIATION_GROUP_FieldsDto.map(x => x.CODE)];
      });
    }
  }

  filterLookupsFunction(whichLookup, formControlValue, list) {
    if (formControlValue) {
      return formControlValue.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterInsideList(whichLookup, state, list) : list.slice())
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
    this.formData.productColorList.filter(option => option.NAME === data.productColor).map(x => data.productColor = x.ID);
    this.formData.manufacturingCompanyList.filter(option => option.NAME === data.manufacturingCompany).map(x => data.manufacturingCompany = x.ID);
    this.formData.manufacturingCountryList.filter(option => option.NAME === data.manufacturingCountry).map(x => data.manufacturingCountry = x.ID);
    this.formData.applicantList.filter(option => option.NAME === data.applicant).map(x => data.applicant = x.ID);
    this.formData.licenseHolderList.filter(option => option.NAME === data.licenseHolder).map(x => data.licenseHolder = x.ID);
    this.formData.licenseHolderCountryList.filter(option => option.NAME === data.countryOfLicenseHolder).map(x => data.countryOfLicenseHolder = x.ID);
    this.formData.physicalStateList.filter(option => option.NAME === data.physicalState).map(x => data.physicalState = x.ID);
    this.formData.purposeOfUseList.filter(option => option.NAME === data.purposeOfUse).map(x => data.purposeOfUse = x.ID);
    this.formData.storagePlaceList.filter(option => option.NAME === data.storagePlace).map(x => data.storagePlace = x.ID);

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
    this.formData.applicantList.filter(option => option.ID === companyProfileID).map(x => this.regHairColorantProductForAllRequestedType.patchValue({
      applicant: x.NAME
    }));
  }

  private _subscribeToClosingActions(field, list): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    list.subscribe(x => {
      if (x.length === 0) {
        if (this.regHairColorantProductForAllRequestedType.controls[field].dirty) {
          this.regHairColorantProductForAllRequestedType.controls[field].setValue(null);
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

  private _subscribeToClosingActionsForDetailsFormArray(field, list): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    list ? list.subscribe(y => {
      if (y.length === 0) {
        this.IngrediantDetailsRows().controls.map((x) => {
          if (x['controls'][field].dirty) {
            x['controls'][field].setValue(null);
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
        this.regHairColorantProductForAllRequestedType.get(FileID).setValue(res.ID);
      });

      return res;
    });
  }

  downloadFile(FileName) {
    this.getService.getAttachmentFileByID(this.regHairColorantProductForAllRequestedType.value.id, FileName).subscribe((res: any) => {
      this.convertFilesToPDF(res.base64Data, FileName);
    });
  }

  convertDataForAttachmentRequestBody(requestId, FileID, FileName, id, base64Data, fileValue) {
    return {
      RequestId: this.regHairColorantProductForAllRequestedType.value.id ? this.regHairColorantProductForAllRequestedType.value.id : this.requestId,
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
    this.modalRef.hide();
    this.getPackagingFormAsStarting('');
    this.editPackagingRowStatus = false;
  }

  closeDetailedForm() {
    this.modalRef.hide();
    this.getDetailedFormAsStarting('');
    this.editDetailedRowStatus = false;
  }

  checkValue(formControl, list, form) {
    if (list.filter(x => x.NAME === form.get(formControl).value).length === 0) {
      form.get(formControl).setValue(null);
    }
  }
}
