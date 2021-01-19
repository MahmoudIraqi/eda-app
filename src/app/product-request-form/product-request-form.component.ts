import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {DecimalPipe} from '@angular/common';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-product-request-form',
  templateUrl: './product-request-form.component.html',
  styleUrls: ['./product-request-form.component.css']
})
export class ProductRequestFormComponent implements OnInit {

  @Input() selectedRequestedType;
  @Input() kitProductStatus;
  @Output() saveDataOutput = new EventEmitter();
  @Output() submitDataOutput = new EventEmitter();
  formData = {
    manufacturingCompanyList: [],
    manufacturingCountryList: [],
    ApplicantList: ['Applicant1', 'Applicant2', 'Applicant3', 'Applicant4'],
    licenseHolderList: ['licenseHolder1', 'licenseHolder2', 'licenseHolder3', 'other'],
    licenseHolderCountryList: [],
    physicalStateList: [],
    purposeOfUseList: [],
    typeOfPackagingList: [],
    unitOfMeasureList: [],
    ingrediantList: ['ingrediant1', 'ingrediant2', 'ingrediant3'],
    functionList: []
  };
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;
  detailsListTable = {
    tableHeader: ['Colour', 'Fragrance', 'Flavor', 'BarCode', 'Volumes', 'Actions'],
    tableBody: []
  };
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
      id: 'shelfLifeStatement',
      name: 'Shelf Life Statement',
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
  editIndex;
  editDetailedRowStatus = false;
  regProductForAllRequestedType: FormGroup;
  removeShortNameFieldStatus = false;

  constructor(private fb: FormBuilder,
              private getService: FormService,
              private number: DecimalPipe) {
    this.getFormAsStarting();
  }

  ngOnInit(): void {
    this.getService.getCountryLookUp().subscribe((res: any) => {
      this.formData.manufacturingCountryList = res;
      this.formData.licenseHolderCountryList = res;
    });
    this.getService.getManufacturingCompanyLookUp().subscribe((res: any) => {
      this.formData.manufacturingCompanyList = res;
    });
    this.getService.getFunctionLookUp().subscribe((res: any) => {
      this.formData.functionList = res;
    });
    this.getService.getPackagingTypeLookUp().subscribe((res: any) => {
      this.formData.typeOfPackagingList = res;
    });
    this.getService.getPhysicalStateLookUp().subscribe((res: any) => {
      this.formData.physicalStateList = res;
    });
    this.getService.getUnitOfMeasureLookUp().subscribe((res: any) => {
      this.formData.unitOfMeasureList = res;
    });
    this.getService.getUsePurposeLookUp().subscribe((res: any) => {
      this.formData.purposeOfUseList = res;
    });
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
      this.regProductForAllRequestedType.get(fileControlName).setValue(file);
    }
  }

  // Functions for Details tabls
  DetailsRows(): FormArray {
    return this.regProductForAllRequestedType.get('detailsTable') as FormArray;
  }

  addDetailsRows() {
    this.editDetailedRowStatus = false;
    this.equalTheNewDetailsTable();
    this.DetailsRows().push(this.fb.group({
      colour: this.fb.control(''),
      fragrance: this.fb.control(''),
      flavor: this.fb.control(''),
      barCode: this.fb.control(''),
      volumes: this.fb.control('', Validators.required),
      unitOfMeasure: this.fb.control('', Validators.required),
      typeOfPackaging: this.fb.control('', Validators.required),
      packagingDescription: this.fb.control(''),
      ingrediantDetails: this.fb.array([this.fb.group({
        ingrediant: this.fb.control('', Validators.required),
        concentrations: this.fb.control('', Validators.required),
        function: this.fb.control('', Validators.required),
      })])
    }));
  }

  editDataDetailsRows() {
    this.editDetailedRowStatus = false;
    this.equalTheNewDetailsTable();
  }

  removeDetailsRows(i) {
    this.DetailsRows().removeAt(i);
    this.equalTheNewDetailsTable();
  }

  editTheDetailsRow(event) {
    this.editDetailedRowStatus = true;
    this.editIndex = event;
  }

  equalTheNewDetailsTable() {
    this.detailsListTable.tableBody = this.regProductForAllRequestedType.get('detailsTable').value;
  }

  //functions for IngrediantDetailsRows
  IngrediantDetailsRows(index): FormArray {
    return this.DetailsRows().at(index).get('ingrediantDetails') as FormArray;
  }

  addIngrediantDetailsRows(index) {
    this.IngrediantDetailsRows(index).push(this.fb.group({
      ingrediant: this.fb.control('', Validators.required),
      concentrations: this.fb.control('', Validators.required),
      function: this.fb.control('', Validators.required)
    }));
  }

  removeIngrediantDetailsRows(fromWhere, event) {
    if (this.IngrediantDetailsRows(event.i).length > 1) {
      this.IngrediantDetailsRows(event.i).removeAt(event.childIndex);
    }

  }

  // Function For Forms
  saveData() {
    this.saveDataOutput.emit(this.regProductForAllRequestedType.value);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitDataOutput.emit(this.regProductForAllRequestedType.value);
  }

  getFormAsStarting() {
    this.regProductForAllRequestedType = this.fb.group({
      productArabicName: this.fb.control(''),
      productEnglishName: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$')]),
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
      shelfLife: this.fb.control(0),
      receiptNumber: this.fb.control('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      receiptValue: this.fb.control('', [Validators.required, Validators.pattern(/^\d+\.\d*$/)]),
      detailsTable: this.fb.array([this.fb.group({
        colour: this.fb.control(''),
        fragrance: this.fb.control(''),
        flavor: this.fb.control(''),
        barCode: this.fb.control(''),
        volumes: this.fb.control('', Validators.required),
        unitOfMeasure: this.fb.control('', Validators.required),
        typeOfPackaging: this.fb.control('', Validators.required),
        packagingDescription: this.fb.control(''),
        ingrediantDetails: this.fb.array([this.fb.group({
          ingrediant: this.fb.control('', Validators.required),
          concentrations: this.fb.control('', Validators.required),
          function: this.fb.control('', Validators.required),
        })])
      })]),
      freeSale: this.fb.control('', this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? Validators.required : null),
      GMP: this.fb.control(''),
      CoA: this.fb.control('', this.selectedRequestedType === 1 && this.selectedRequestedType === 2 ? Validators.required : null),
      shelfLifeStatement: this.fb.control('', Validators.required),
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

    this.regProductForAllRequestedType.valueChanges.subscribe(form => {
      if (form.receiptValue) {
        this.regProductForAllRequestedType.patchValue({
          receiptValue: this.number.transform(form.receiptValue, '1.2-2')
        }, {emitEvent: false});
      }
    });
  }
}
