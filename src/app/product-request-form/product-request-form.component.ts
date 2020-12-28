import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsetComponent} from 'ngx-bootstrap/tabs';

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
    manufacturingCompanyList: ['Comp1', 'Comp2', 'Comp3', 'Comp4'],
    manufacturingCountryList: ['Egypt', 'Brazil', 'Spain', 'Germany'],
    ApplicantList: ['Applicant1', 'Applicant2', 'Applicant3', 'Applicant4'],
    licenseHolderList: ['licenseHolder1', 'licenseHolder2', 'licenseHolder3', 'other'],
    licenseHolderCountryList: ['Egypt', 'Brazil', 'Spain', 'Germany'],
    physicalStateList: ['physicalState1', 'physicalState2', 'physicalState3', 'other'],
    purposeOfUseList: ['purposeOfUse1', 'purposeOfUse2', 'purposeOfUse3', 'other'],
    typeOfPackagingList: ['typeOfPackaging1', 'typeOfPackaging2', 'typeOfPackaging3'],
    unitOfMeasureList: ['unitOfMeasure1', 'unitOfMeasure2', 'unitOfMeasure3'],
    ingrediantList: ['ingrediant1', 'ingrediant2', 'ingrediant3'],
    functionList: ['function1', 'function2', 'function3']
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

  constructor(private fb: FormBuilder) {
    this.getFormAsStarting();
  }

  ngOnInit(): void {
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
    if (i > 0) {
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

    this.equalTheNewDetailsTable();
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
      productEnglishName: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      shortName: this.fb.array([this.fb.control('', Validators.pattern('^[a-zA-Z \-\']+'))]),
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
      receiptNumber: this.fb.control('', Validators.required),
      receiptValue: this.fb.control('', [Validators.required, Validators.pattern(/^\d+\.\d{1}$/)]),
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
      freeSale: this.fb.control('', this.selectedRequestedType !== 'local' && this.selectedRequestedType !== 'toll' && this.selectedRequestedType !== 'export' ? Validators.required : null),
      GMP: this.fb.control(''),
      CoA: this.fb.control('', this.selectedRequestedType === 'referencedCountry' && this.selectedRequestedType === 'nonReferencedCountry' ? Validators.required : null),
      shelfLifeStatement: this.fb.control('', Validators.required),
      artWork: this.fb.control('', Validators.required),
      leaflet: this.fb.control(''),
      reference: this.fb.control(''),
      methodOfAnalysis: this.fb.control(''),
      specificationsOfFinishedProduct: this.fb.control('', Validators.required),
      receipt: this.fb.control('', Validators.required),
      authorizationLetter: this.fb.control('', this.selectedRequestedType !== 'local' && this.selectedRequestedType !== 'toll' && this.selectedRequestedType !== 'export' ? Validators.required : null),
      manufacturingContract: this.fb.control(''),
      storageContract: this.fb.control(''),
      others: this.fb.control(''),
      otherFees: this.fb.control('', Validators.required),
    });
  }
}
