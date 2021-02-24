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
  SimpleChanges,
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

@Component({
  selector: 'app-products-hair-colour-request-form',
  templateUrl: './products-hair-colour-request-form.component.html',
  styleUrls: ['./products-hair-colour-request-form.component.css']
})
export class ProductsHairColourRequestFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() selectedRequestedType;
  @Input() selectedFormType;
  @Input() selectedTrackType;
  @Input() successSubmission;
  @Input() lookupsData;
  @Input() editData;
  @Input() reRegistrationStatus;
  @Input() variationFieldsStatus;
  @Input() variationFields;
  @Input() kitHairProductStatus;
  @Output() saveDataOutput = new EventEmitter();
  @Output() submitDataOutput = new EventEmitter();
  @Output() selectedTrackTypeForKit = new EventEmitter();
  @Output() selectedRegisteredTypeForKit = new EventEmitter();
  @Output() selectedRegisteredProductTypeForKit = new EventEmitter();
  formData;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;
  detailsListTable = {
    tableHeader: ['Colour', 'Fragrance', 'Flavor', 'BarCode', 'Volumes', 'Actions'],
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
      required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false
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
      required: this.selectedRequestedType === 1 && this.selectedRequestedType === 2 ? true : false
    },
    {
      id: 'artWork',
      name: 'Art Work',
      fileName: '',
      required: true
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
      required: true
    },
    {
      id: 'receipt',
      name: 'receipt',
      fileName: '',
      required: true
    },
    {
      id: 'authorizationLetter',
      name: 'Authorization Letter',
      fileName: '',
      required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false
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
      required: true
    }
  ];
  editIndex;
  editDetailedRowStatus = false;
  editPackagingIndex;
  editPackagingRowStatus = false;
  regHairColorantProductForAllRequestedType: FormGroup;
  removeShortNameFieldStatus = false;
  trackTypeForNewProductInKit;
  requestedTypeForNewProductInKit;
  requestedProductTypeForNewProductInKit;
  enableEditableFields = [];
  disabledSaveButton: boolean = false;

  filteredOptionsForProductColor: Observable<LookupState[]>;
  filteredOptionsForManufacturingCompany: Observable<LookupState[]>;
  filteredOptionsForManufacturingCountry: Observable<LookupState[]>;
  filteredOptionsForApplicant: Observable<LookupState[]>;
  filteredOptionsForLicenseHolder: Observable<LookupState[]>;
  filteredOptionsForLicenseHolderCountry: Observable<LookupState[]>;
  filteredOptionsForPhysicalState: Observable<LookupState[]>;
  filteredOptionsForPurposeOfUse: Observable<LookupState[]>;
  filteredOptionsForStoragePlace: Observable<LookupState[]>;
  filteredOptionsForUnitOfMeasure: Observable<LookupState[]>;
  filteredOptionsForTypeOfPackaging: Observable<LookupState[]>;
  filteredOptionsForIngradiant: Observable<LookupState[]>;
  filteredOptionsForFunction: Observable<LookupState[]>;

  subscription: Subscription;
  @ViewChildren(MatAutocompleteTrigger) triggerCollection: QueryList<MatAutocompleteTrigger>;

  constructor(private fb: FormBuilder,
              private number: DecimalPipe) {
    this.getFormAsStarting('');
  }

  ngOnChanges() {
    this.formData = this.lookupsData;

    this.attachmentFields = [
      {
        id: 'freeSale',
        name: 'Free Sale',
        fileName: '',
        required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false
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
        required: this.selectedRequestedType === 1 && this.selectedRequestedType === 2 ? true : false
      },
      {
        id: 'artWork',
        name: 'Art Work',
        fileName: '',
        required: !this.kitHairProductStatus ? true : false
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
        required: true
      },
      {
        id: 'receipt',
        name: 'receipt',
        fileName: '',
        required: true
      },
      {
        id: 'authorizationLetter',
        name: 'Authorization Letter',
        fileName: '',
        required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false
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
        required: true
      }
    ];

    if (this.successSubmission) {
      this.resetForms();
    }

    this.getFormAsStarting(this.editData);

    this.getDisabledValues();
  }

  ngOnInit(): void {
    this.filteredOptionsForProductColor = this.filterLookupsFunction(this.regHairColorantProductForAllRequestedType.get('productColor'), this.formData.productColorList);
    this.filteredOptionsForManufacturingCompany = this.filterLookupsFunction(this.regHairColorantProductForAllRequestedType.get('manufacturingCompany'), this.formData.manufacturingCompanyList);
    this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction(this.regHairColorantProductForAllRequestedType.get('manufacturingCountry'), this.formData.manufacturingCountryList);
    this.filteredOptionsForApplicant = this.filterLookupsFunction(this.regHairColorantProductForAllRequestedType.get('applicant'), this.formData.applicantList);
    this.filteredOptionsForLicenseHolder = this.filterLookupsFunction(this.regHairColorantProductForAllRequestedType.get('licenseHolder'), this.formData.licenseHolderList);
    this.filteredOptionsForLicenseHolderCountry = this.filterLookupsFunction(this.regHairColorantProductForAllRequestedType.get('countryOfLicenseHolder'), this.formData.licenseHolderCountryList);
    this.filteredOptionsForPhysicalState = this.filterLookupsFunction(this.regHairColorantProductForAllRequestedType.get('physicalState'), this.formData.physicalStateList);
    this.filteredOptionsForPurposeOfUse = this.filterLookupsFunction(this.regHairColorantProductForAllRequestedType.get('purposeOfUse'), this.formData.purposeOfUseList);
    this.filteredOptionsForStoragePlace = this.filterLookupsFunction(this.regHairColorantProductForAllRequestedType.get('storagePlace'), this.formData.storagePlaceList);
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
    this._subscribeToClosingActions('productColor');
    this._subscribeToClosingActions('manufacturingCompany');
    this._subscribeToClosingActions('manufacturingCountry');
    this._subscribeToClosingActions('applicant');
    this._subscribeToClosingActions('licenseHolder');
    this._subscribeToClosingActions('countryOfLicenseHolder');
    this._subscribeToClosingActions('physicalState');
    this._subscribeToClosingActions('purposeOfUse');
    this._subscribeToClosingActions('storagePlace');
    this._subscribeToClosingActionsForPackagingFormArray('unitOfMeasure');
    this._subscribeToClosingActionsForPackagingFormArray('typeOfPackaging');
    this._subscribeToClosingActionsForDetailsFormArray('ingrediant');
    this._subscribeToClosingActionsForDetailsFormArray('function');
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
    this.PackagingRows().controls.map((x) => {
      this.filteredOptionsForUnitOfMeasure = this.filterLookupsFunction(x.get('unitOfMeasure'), this.formData.unitOfMeasureList);
      this.filteredOptionsForTypeOfPackaging = this.filterLookupsFunction(x.get('typeOfPackaging'), this.formData.typeOfPackagingList);
    });

    this.DetailsRows().value.map((x, i) => {
      x.ingrediantDetails.map((item, index) => {
        this.filteredOptionsForIngradiant = this.filterLookupsFunction(this.IngrediantDetailsRows(i).controls[index].get('ingrediant'), this.formData.ingrediantList);
        this.filteredOptionsForFunction = this.filterLookupsFunction(this.IngrediantDetailsRows(i).controls[index].get('function'), this.formData.functionList);
      });
    });
  }

  // Functions for Tabs
  nextToNextTab() {
    let activeTabIndex;
    this.formTabs.tabs.filter(x => x.active).map(y => activeTabIndex = this.formTabs.tabs.indexOf(y));
    activeTabIndex + 1 <= this.formTabs.tabs.length - 1 ? this.formTabs.tabs[activeTabIndex + 1].active = true : null;
  }

  backToNextTab() {
    let activeTabIndex;
    this.formTabs.tabs.filter(x => x.active).map(y => activeTabIndex = this.formTabs.tabs.indexOf(y));
    activeTabIndex >= 0 ? this.formTabs.tabs[activeTabIndex - 1].active = true : null;
  }

  // Function for File
  onFileSelect(event, fileControlName) {
    this.attachmentFields.filter(x => x.id === fileControlName).map(y => y.fileName = event.target.value.split(/(\\|\/)/g).pop());
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (res: any) => {
        this.regHairColorantProductForAllRequestedType.get(fileControlName).setValue({name: file.name, base64Data: res.target.result});
      };
      // this.regHairColorantProductForAllRequestedType.get(fileControlName).setValue(file);
    }
  }

  // Functions for Details tabls
  PackagingRows(): FormArray {
    return this.regHairColorantProductForAllRequestedType.get('packagingTable') as FormArray;
  }

  addPackagingRows() {
    this.editDetailedRowStatus = false;
    this.equalTheNewPackagingTable('add');
    this.PackagingRows().push(this.fb.group({
      volumesID: this.fb.control(''),
      volumes: this.fb.control('', Validators.required),
      unitOfMeasure: this.fb.control('', Validators.required),
      typeOfPackaging: this.fb.control('', Validators.required),
      packagingDescription: this.fb.control(''),
    }));
  }

  removePackagingRows(i) {
    this.PackagingRows().removeAt(i);
    this.regHairColorantProductForAllRequestedType.get('packagingTable').value.pop();
    this.packagingListTable.tableBody = this.regHairColorantProductForAllRequestedType.get('packagingTable').value;
  }

  cancelThePackagingRows(index) {
    this.PackagingRows().removeAt(index);
    this.packagingListTable.tableBody.pop();
  }

  editThePackagingRows(event) {
    this.editPackagingRowStatus = true;
    this.editPackagingIndex = event;
  }

  equalTheNewPackagingTable(fromWhere) {
    if (fromWhere !== 'form') {
      if (fromWhere === 'remove') {
        this.regHairColorantProductForAllRequestedType.get('packagingTable').value.pop();
      }

      this.packagingListTable.tableBody = this.regHairColorantProductForAllRequestedType.get('packagingTable').value;
    }
  }

  DetailsRows(): FormArray {
    return this.regHairColorantProductForAllRequestedType.get('detailsTable') as FormArray;
  }

  addDetailsRows() {
    this.editDetailedRowStatus = false;
    this.equalTheNewDetailsTable('add');
    this.DetailsRows().push(this.fb.group({
      DetailsID: this.fb.control(''),
      PRODUCT_ID: this.fb.control(''),
      colour: this.fb.control(''),
      fragrance: this.fb.control(''),
      flavor: this.fb.control(''),
      barCode: this.fb.control(''),
      ingrediantDetails: this.fb.array([this.fb.group({
        Ingredient_ID: this.fb.control(''),
        ingrediant: this.fb.control('', Validators.required),
        concentrations: this.fb.control('', Validators.required),
        function: this.fb.control('', Validators.required),
      })])
    }));
  }

  cancelTheDetailsRows(index) {
    this.DetailsRows().removeAt(index);
    this.detailsListTable.tableBody.pop();
  }

  editDataDetailsRows(fromWhere) {
    this.editDetailedRowStatus = false;
    this.equalTheNewDetailsTable(fromWhere);
  }

  removeDetailsRows(i) {
    this.DetailsRows().removeAt(i);
    this.equalTheNewDetailsTable('remove');
  }

  editTheDetailsRow(event) {
    this.editDetailedRowStatus = true;
    this.editIndex = event;
  }

  equalTheNewDetailsTable(fromWhere) {

    if (fromWhere !== 'form') {
      if (fromWhere === 'remove') {
        this.regHairColorantProductForAllRequestedType.get('detailsTable').value.pop();
      }
      this.detailsListTable.tableBody = this.regHairColorantProductForAllRequestedType.get('detailsTable').value;
    }

  }

  //functions for IngrediantDetailsRows
  IngrediantDetailsRows(index): FormArray {
    return this.DetailsRows().at(index).get('ingrediantDetails') as FormArray;
  }

  addIngrediantDetailsRows(index) {
    this.IngrediantDetailsRows(index).push(this.fb.group({
      Ingredient_ID: this.fb.control(''),
      ingrediant: this.fb.control('', Validators.required),
      concentrations: this.fb.control('', Validators.required),
      function: this.fb.control('', Validators.required)
    }));
  }

  removeIngrediantDetailsRows(fromWhere, event) {
    if (this.IngrediantDetailsRows(event.i).length > 1) {
      this.IngrediantDetailsRows(event.i).removeAt(event.childIndex);
    }

    this.equalTheNewDetailsTable(fromWhere);
  }

  saveData() {
    const data = this.convertAllNamingToId(this.regHairColorantProductForAllRequestedType.value);

    this.saveDataOutput.emit(data);
  }

  onSubmit() {
    const data = this.convertAllNamingToId(this.regHairColorantProductForAllRequestedType.value);

    this.submitDataOutput.emit(data);
  }

  getFormAsStarting(data) {
    if (data) {
      data.shortName.map((X, i) => {
        if (data.shortName.length > 1 && i < data.shortName.length - 1) {
          this.addShortName();
        }
      });
      data.detailsTable.map((x, i) => {
        x.ingrediantDetails.map((y, index) => {
          if (x.ingrediantDetails.length > 1 && index < x.ingrediantDetails.length - 1) {
            this.addIngrediantDetailsRows(i);
          }
        });

        if (data.detailsTable.length > 1 && i < data.detailsTable.length - 1) {
          this.addDetailsRows();
        }
      });

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
      data.packagingTable.map(x => {
        this.formData.unitOfMeasureList.filter(option => option.ID === x.unitOfMeasure).map(item => x.unitOfMeasure = item.NAME);
        this.formData.typeOfPackagingList.filter(option => option.ID === x.typeOfPackaging).map(item => x.typeOfPackaging = item.NAME);
      });
      data.detailsTable.map(x => {
        x.ingrediantDetails.map(y => {
          this.formData.ingrediantList.filter(option => option.ID === y.ingrediant).map(item => y.ingrediant = item.NAME);
          this.formData.functionList.filter(option => option.ID === y.function).map(item => y.function = item.NAME);
        });
      });

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

      this.regHairColorantProductForAllRequestedType.patchValue({
        ...data
      });
    } else {
      this.regHairColorantProductForAllRequestedType = this.fb.group({
        productArabicName: this.fb.control(''),
        productEnglishName: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z]+[ 0-9a-zA-Z-_*]*$')]),
        shortName: this.fb.array([this.fb.control('', Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$'))]),
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
        packagingTable: this.fb.array([this.fb.group({
          volumesID: this.fb.control(''),
          volumes: this.fb.control('', Validators.required),
          unitOfMeasure: this.fb.control('', Validators.required),
          typeOfPackaging: this.fb.control('', Validators.required),
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
            ingrediant: this.fb.control('', Validators.required),
            concentrations: this.fb.control('', Validators.required),
            function: this.fb.control('', Validators.required),
          })])
        })]),
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
        manufacturingContract: this.fb.control(''),
        storageContract: this.fb.control(''),
        others: this.fb.control(''),
        otherFees: this.fb.control('', Validators.required),
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
      this.formData.functionList.filter(option => option.NAME === x.typeOfPackaging).map(item => x.typeOfPackaging = item.ID);
    });

    data.detailsTable.map(x => {
      x.ingrediantDetails.map(y => {
        this.formData.ingrediantList.filter(option => option.NAME === y.ingrediant).map(item => y.ingrediant = item.ID);
        this.formData.functionList.filter(option => option.NAME === y.function).map(item => y.function = item.ID);
      });
    });

    return data;
  }

  private _subscribeToClosingActions(field): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    for (var trigger of this.triggerCollection.toArray()) {
      this.subscription = trigger.panelClosingActions
        .subscribe(e => {
          if (!e || !e.source) {
            if (this.regHairColorantProductForAllRequestedType.controls[field].dirty) {
              this.regHairColorantProductForAllRequestedType.controls[field].setValue(null);
            }
          }
        });
    }
  }

  private _subscribeToClosingActionsForPackagingFormArray(field): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    for (var trigger of this.triggerCollection.toArray()) {
      this.subscription = trigger.panelClosingActions
        .subscribe(e => {
          if (!e || !e.source) {
            this.PackagingRows().controls.map((x) => {
              if (x['controls'][field].dirty) {
                x['controls'][field].setValue(null);
              }
            });
          }
        });
    }
  }

  private _subscribeToClosingActionsForDetailsFormArray(field): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    for (var trigger of this.triggerCollection.toArray()) {
      this.subscription = trigger.panelClosingActions
        .subscribe(e => {
          if (!e || !e.source) {
            this.DetailsRows().controls.map((x) => {
              x['controls'].ingrediantDetails.controls.map((item, index) => {
                if (item.controls[field].dirty) {
                  item.controls[field].setValue(null);
                }
              });
            });
          }
        });
    }
  }
}
