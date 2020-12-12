import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormGroupDirective, FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TabsetComponent} from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {


  formData = {
    formType: [
      {
        id: 'regProduct',
        value: 'Register Products'
      },
      {
        id: 'regKit',
        value: 'Register Kit'
      },
      {
        id: 'regHairColorantProduct',
        value: 'Register Hair Colorant Product'
      },
      {
        id: 'regHairColorantKit',
        value: 'Register Hair Colorant Kit'
      },
    ],
    requestType: [
      {
        id: 'referencedCountry',
        value: 'Imported from referenced country'
      },
      {
        id: 'nonReferencedCountry',
        value: 'Imoprted from non referenced country'
      },
      {
        id: 'underLicenseReferenced',
        value: 'Under License referenced'
      },
      {
        id: 'underLicenseNonReferenced',
        value: 'Under License non referenced'
      },
      {
        id: 'bulkImportedRef',
        value: 'Bulk imported referenced'
      },
      {
        id: 'bulkImportedNonRef',
        value: 'Bulk imported non referenced'
      },
      {
        id: 'local',
        value: 'Local'
      },
      {
        id: 'toll',
        value: 'Toll'
      },
      {
        id: 'export',
        value: 'Export'
      }
    ],
    productColorList: ['Black', 'Blond', 'Brown', 'Red'],
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
    functionList: ['function1', 'function2', 'function3'],
  };
  selectedFormType;
  selectedRequestedType;
  regProductForAllRequestedType: FormGroup;
  regHairColorantProductForAllRequestedType: FormGroup;
  fileName;
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
  activeTabIndexStatus = true;
  removeShortNameFieldStatus = false;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;
  status;

  constructor(private fb: FormBuilder) {
    this.getFormAsStarting();
  }

  ngOnInit(): void {
  }

  setStep(status) {
    this.status = !status;
  }

  getFormType(event) {
    this.selectedFormType = event.value;
    this.resetForms();
  }

  getRequestType(event) {
    this.selectedRequestedType = event.value;
    this.resetForms();
  }

  onFileSelect(event, fileControlName) {
    this.attachmentFields.filter(x => x.id === fileControlName).map(y => y.fileName = event.target.value.split(/(\\|\/)/g).pop());
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (this.selectedFormType === 'regProduct') {
        this.regProductForAllRequestedType.get(fileControlName).setValue(file);
      } else if (this.selectedFormType === 'regHairColorantProduct') {
        this.regHairColorantProductForAllRequestedType.get(fileControlName).setValue(file);
      }
    }
    event.target.files = [];
  }

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

  saveData() {
    if (this.selectedFormType === 'regProduct') {
      console.log('regProductForAllRequestedType', this.regProductForAllRequestedType.value);
    } else if (this.selectedFormType === 'regHairColorantProduct') {
      console.log('regHairColorantProductForAllRequestedType', this.regHairColorantProductForAllRequestedType.value);
    }
  }

  onSubmit() {
    if (this.selectedFormType === 'regProduct') {
      console.log('regProductForAllRequestedType', this.regProductForAllRequestedType.value);
    } else if (this.selectedFormType === 'regHairColorantProduct') {
      console.log('regHairColorantProductForAllRequestedType', this.regHairColorantProductForAllRequestedType.value);
    }
  }

  get ShortName(): FormArray {
    if (this.selectedFormType === 'regProduct') {
      return this.regProductForAllRequestedType.get('shortName') as FormArray;
    } else if (this.selectedFormType === 'regHairColorantProduct') {
      return this.regHairColorantProductForAllRequestedType.get('shortName') as FormArray;
    }
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

  get DetailsRows(): FormArray {
    if (this.selectedFormType === 'regProduct') {
      return this.regProductForAllRequestedType.get('detailsTable') as FormArray;
    } else if (this.selectedFormType === 'regHairColorantProduct') {
      return this.regHairColorantProductForAllRequestedType.get('detailsTable') as FormArray;
    }
  }

  addDetailsRows() {
    this.DetailsRows.push(this.fb.group({
      colour: this.fb.control(''),
      fragrance: this.fb.control(''),
      flavor: this.fb.control(''),
      barCode: this.fb.control(''),
      volumes: this.fb.control('', Validators.required),
      unitOfMeasure: this.fb.control('', Validators.required),
      ingrediant: this.fb.control('', Validators.required),
      concentrations: this.fb.control('', Validators.required),
      function: this.fb.control('', Validators.required),
    }));
  }

  removeDetailsRows(i: number) {
    this.DetailsRows.removeAt(i);
  }

  resetForms() {
    this.getFormAsStarting();
  }

  getFormAsStarting() {
    debugger;
    console.log('selectedFormType', this.selectedFormType);
    if (this.selectedFormType === 'regProduct') {
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
        typeOfPackaging: this.fb.control('', Validators.required),
        packagingDescription: this.fb.control(''),
        receiptNumber: this.fb.control('', Validators.required),
        receiptValue: this.fb.control('', [Validators.required, Validators.pattern(/^\d+\.\d{1}$/)]),
        detailsTable: this.fb.array([this.fb.group({
          colour: this.fb.control(''),
          fragrance: this.fb.control(''),
          flavor: this.fb.control(''),
          barCode: this.fb.control(''),
          volumes: this.fb.control('', Validators.required),
          unitOfMeasure: this.fb.control('', Validators.required),
          ingrediant: this.fb.control('', Validators.required),
          concentrations: this.fb.control('', Validators.required),
          function: this.fb.control('', Validators.required),
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
    } else if (this.selectedFormType === 'regHairColorantProduct') {
      this.regHairColorantProductForAllRequestedType = this.fb.group({
        productArabicName: this.fb.control(''),
        productEnglishName: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
        shortName: this.fb.array([this.fb.control('', Validators.pattern('^[a-zA-Z \-\']+'))]),
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
        typeOfPackaging: this.fb.control('', Validators.required),
        packagingDescription: this.fb.control(''),
        receiptNumber: this.fb.control('', Validators.required),
        receiptValue: this.fb.control('', [Validators.required, Validators.pattern(/^\d+\.\d{1}$/)]),
        detailsTable: this.fb.array([this.fb.group({
          colour: this.fb.control(''),
          fragrance: this.fb.control(''),
          flavor: this.fb.control(''),
          barCode: this.fb.control(''),
          volumes: this.fb.control('', Validators.required),
          unitOfMeasure: this.fb.control('', Validators.required),
          ingrediant: this.fb.control('', Validators.required),
          concentrations: this.fb.control('', Validators.required),
          function: this.fb.control('', Validators.required),
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
}
