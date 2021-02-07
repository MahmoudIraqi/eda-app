import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {DecimalPipe} from '@angular/common';
import {FormService} from '../services/form.service';
import {formDataClass} from '../../utils/formDataFunction';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-product-request-form',
  templateUrl: './product-request-form.component.html',
  styleUrls: ['./product-request-form.component.css']
})
export class ProductRequestFormComponent implements OnInit, OnChanges {

  @Input() selectedRequestedType;
  @Input() selectedFormType;
  @Input() selectedTrackType;
  @Input() successSubmission;
  @Input() editData;
  @Input() reRegistrationStatus;
  @Input() variationFieldsStatus;
  @Input() variationFields;
  @Input() lookupsData;
  @Input() kitProductStatus;
  @Output() saveDataOutput = new EventEmitter();
  @Output() submitDataOutput = new EventEmitter();
  @Output() selectedTrackTypeForKit = new EventEmitter();
  @Output() selectedRegisteredTypeForKit = new EventEmitter();
  @Output() selectedRegisteredProductTypeForKit = new EventEmitter();
  formData;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;
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
      required: !this.kitProductStatus ? true : false
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
      required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false,
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
  regProductForAllRequestedType: FormGroup;
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
  filteredOptionsForManufacturingCompany: Observable<any[]>;
  filteredOptionsForIngradiant: Observable<any[]>;
  filteredOptionsForfunction: Observable<any[]>;

  constructor(private fb: FormBuilder,
              private getService: FormService,
              private number: DecimalPipe) {
    this.getFormAsStarting('');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.formData = {...this.lookupsData};

    this.filteredOptionsForManufacturingCompany = this.regProductForAllRequestedType.get('manufacturingCompany').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterForManufacturing(value))
      );

    if (this.successSubmission) {
      this.resetForms();
    }

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
        required: !this.kitProductStatus ? true : false
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
        required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false,
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

    this.getFormAsStarting(this.editData);

    this.getDisabledValues();
  }

  ngOnInit(): void {
    this.filteredOptionsForManufacturingCompany = this.regProductForAllRequestedType.get('manufacturingCompany').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterForManufacturing(value))
      );

    this.filteredOptionsForIngradiant = this.filterInIngrediant(0, 0);
    this.filteredOptionsForfunction = this.filterInFunction(0, 0);
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
    }
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

  // Functions for Details tabls
  PackagingRows(): FormArray {
    return this.regProductForAllRequestedType.get('packagingTable') as FormArray;
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
    this.equalTheNewDetailsTable('remove');
  }

  editThePackagingRows(event) {
    this.editPackagingRowStatus = true;
    this.editPackagingIndex = event;
  }

  equalTheNewPackagingTable(fromWhere) {
    if (fromWhere !== 'form') {
      if (fromWhere === 'remove') {
        this.regProductForAllRequestedType.get('packagingTable').value.pop();
      }

      this.packagingListTable.tableBody = this.regProductForAllRequestedType.get('packagingTable').value;
    }
  }

  DetailsRows(): FormArray {
    return this.regProductForAllRequestedType.get('detailsTable') as FormArray;
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
        this.regProductForAllRequestedType.get('detailsTable').value.pop();
      }
      this.detailsListTable.tableBody = this.regProductForAllRequestedType.get('detailsTable').value;
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
    this.formData.manufacturingCompanyList.filter(option => option.MANUFACTORY === this.regProductForAllRequestedType.value.manufacturingCompany).map(x => this.regProductForAllRequestedType.value.manufacturingCompany = x.ID);
    this.regProductForAllRequestedType.value.detailsTable.map(x => {
      x.ingrediantDetails.map(y => {
        this.formData.ingrediantList.filter(option => option.INCI_name === y.ingrediant).map(item => y.ingrediant = item.ID);
        this.formData.functionList.filter(option => option.FUNCTION_NAME === y.function).map(item => y.function = item.ID);
      });
    });
    this.saveDataOutput.emit(this.regProductForAllRequestedType.value);
  }

  onSubmit() {
    this.formData.manufacturingCompanyList.filter(option => option.MANUFACTORY === this.regProductForAllRequestedType.value.manufacturingCompany).map(x => this.regProductForAllRequestedType.value.manufacturingCompany = x.ID);
    this.regProductForAllRequestedType.value.detailsTable.map(x => {
      x.ingrediantDetails.map(y => {
        this.formData.ingrediantList.filter(option => option.INCI_name === y.ingrediant).map(item => y.ingrediant = item.ID);
        this.formData.functionList.filter(option => option.FUNCTION_NAME === y.function).map(item => y.function = item.ID);
      });
    });
    this.submitDataOutput.emit(this.regProductForAllRequestedType.value);
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

      this.formData.manufacturingCompanyList.filter(item => item.ID === data.manufacturingCompany).map(x => data.manufacturingCompany = x.MANUFACTORY);
      data.detailsTable.map(x => {
        x.ingrediantDetails.map(y => {
          this.formData.ingrediantList.filter(option => option.ID === y.ingrediant).map(item => y.ingrediant = item.INCI_name);
          this.formData.functionList.filter(option => option.ID === y.function).map(item => y.function = item.FUNCTION_NAME);
        });
      });

      this.regProductForAllRequestedType.patchValue({
        ...data
      });
    } else {
      this.regProductForAllRequestedType = this.fb.group({
        productArabicName: this.fb.control(''),
        productEnglishName: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z]+[ 0-9a-zA-Z-_*]*$')]),
        shortName: this.fb.array([this.fb.control('', Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$'))]),
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
        storagePlace: this.fb.control('', this.selectedRequestedType !== 1 && this.selectedRequestedType !== 2 && this.selectedRequestedType !== 5 && this.selectedRequestedType !== 6 ? Validators.required : null),
        shelfLife: this.fb.control(0),
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
        artWork: this.fb.control('', this.kitProductStatus !== true ? Validators.required : null),
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
    if (this.variationFields && this.variationFields.length > 0) {
      this.enableEditableFields = [];
      this.variationFields.map(x => {
        this.enableEditableFields = [...this.enableEditableFields, ...x.VARIATION_GROUP_FieldsDto.map(x => x.CODE)];
      });
    }
  }

  filterInIngrediant(parentIndex, index) {
    return this.IngrediantDetailsRows(parentIndex).controls[index].get('ingrediant').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterForIngrediant(value))
      );
  }

  filterInFunction(parentIndex, index) {
    return this.IngrediantDetailsRows(parentIndex).controls[index].get('function').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterForFunction(value))
      );
  }

  private _filterForManufacturing(value: string): string[] {
    let filterValue;
    if (value) {
      filterValue = value.toLowerCase();
    }
    return this.formData.manufacturingCompanyList.filter(option => option.MANUFACTORY.toLowerCase().includes(filterValue)).map(x => x);
  }

  private _filterForIngrediant(value: string): string[] {
    let filterValue;
    if (value) {
      filterValue = value.toLowerCase();
    }
    return this.formData.ingrediantList.filter(option => option.INCI_name.toLowerCase().includes(filterValue)).map(x => x);
  }

  private _filterForFunction(value: string): string[] {
    let filterValue;
    if (value) {
      filterValue = value.toLowerCase();
    }
    return this.formData.functionList.filter(option => option.FUNCTION_NAME.toLowerCase().includes(filterValue)).map(x => x);
  }

}
