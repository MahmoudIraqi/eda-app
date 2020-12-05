import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';
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
    unitOfMeasureList: ['unitOfMeasure1', 'unitOfMeasure2', 'unitOfMeasure3', 'other'],
    ingrediantList: ['ingrediant1', 'ingrediant2', 'ingrediant3', 'other'],
    functionList: ['function1', 'function2', 'function3', 'other'],
  };
  selectedFormType;
  selectedRequestedType;
  regProductFormForImportedFromRefCountry: FormGroup;
  fileName;
  attachmentFields = [
    {
      id: 'freeSale',
      name: 'Free Sale',
      fileName: ''
    },
    {
      id: 'GMP',
      name: 'GMP',
      fileName: ''
    },
    {
      id: 'CoA',
      name: 'CoA',
      fileName: ''
    },
    {
      id: 'shelfLifeStatement',
      name: 'Shelf Life Statement',
      fileName: ''
    },
    {
      id: 'artWork',
      name: 'Art Work',
      fileName: ''
    },
    {
      id: 'leaflet',
      name: 'leaflet',
      fileName: ''
    },
    {
      id: 'reference',
      name: 'reference',
      fileName: ''
    },
    {
      id: 'methodOfAnalysis',
      name: 'Method of Analysis',
      fileName: ''
    },
    {
      id: 'specificationsOfFinishedProduct',
      name: 'Specifications of Finished Product',
      fileName: ''
    },
    {
      id: 'receipt',
      name: 'receipt',
      fileName: ''
    },
    {
      id: 'authorizationLetter',
      name: 'Authorization Letter',
      fileName: ''
    },
    {
      id: 'manufacturingContract',
      name: 'Manufacturing Contract',
      fileName: ''
    },
    {
      id: 'storageContract',
      name: 'Storage Contract',
      fileName: ''
    },
    {
      id: 'others',
      name: 'others',
      fileName: ''
    },
    {
      id: 'otherFees',
      name: 'otherFees',
      fileName: ''
    }
  ];
  activeTabIndexStatus = true;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;

  constructor(private fb: FormBuilder) {
    this.regProductFormForImportedFromRefCountry = fb.group({
      productArabicName: this.fb.control(''),
      productEnglishName: this.fb.control(''),
      shortName: this.fb.control(''),
      manufacturingCompany: this.fb.control(''),
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
      shelfLife: this.fb.control(0),
      packagingDescription: this.fb.control(''),
      receiptNumber: this.fb.control(''),
      receiptValue: this.fb.control(''),
      detailsTable: this.fb.group({
        colour: this.fb.control(''),
        fragrance: this.fb.control(''),
        flavor: this.fb.control(''),
        barCode: this.fb.control(''),
        volumes: this.fb.control(''),
        unitOfMeasure: this.fb.control(''),
        ingrediant: this.fb.control(''),
        concentrations: this.fb.control(''),
        function: this.fb.control(''),
      }),
      freeSale: this.fb.control(''),
      GMP: this.fb.control(''),
      CoA: this.fb.control(''),
      shelfLifeStatement: this.fb.control(''),
      artWork: this.fb.control(''),
      leaflet: this.fb.control(''),
      reference: this.fb.control(''),
      methodOfAnalysis: this.fb.control(''),
      specificationsOfFinishedProduct: this.fb.control(''),
      receipt: this.fb.control(''),
      authorizationLetter: this.fb.control(''),
      manufacturingContract: this.fb.control(''),
      storageContract: this.fb.control(''),
      others: this.fb.control(''),
      otherFees: this.fb.control(''),
    });
  }

  ngOnInit(): void {
  }


  getFormType(event) {
    this.selectedFormType = event.target.value;
  }

  getRequestType(event) {
    this.selectedRequestedType = event.target.value;
  }

  onFileSelect(event, fileControlName) {
    this.attachmentFields.filter(x => x.id === fileControlName).map(y => y.fileName = event.target.value.split(/(\\|\/)/g).pop());
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.regProductFormForImportedFromRefCountry.get('freeSale').setValue(file);
    }
    console.log('1234', this.regProductFormForImportedFromRefCountry.value);
  }

  nextToNextTab() {
    let activeTabIndex;
    this.formTabs.tabs.filter(x => x.active).map(y => activeTabIndex = this.formTabs.tabs.indexOf(y));
    activeTabIndex + 1 <= this.formTabs.tabs.length - 1 ? this.formTabs.tabs[activeTabIndex + 1].active = true : null;
  }

  backToNextTab() {
    debugger
    let activeTabIndex;
    this.formTabs.tabs.filter(x => x.active).map(y => activeTabIndex = this.formTabs.tabs.indexOf(y));
    activeTabIndex >= 0 ? this.formTabs.tabs[activeTabIndex - 1].active = true : null;
  }

  saveData() {
    console.log('regProductFormForImportedFromRefCountry', this.regProductFormForImportedFromRefCountry.value);
  }

  onSubmit() {
    console.log('regProductFormForImportedFromRefCountry', this.regProductFormForImportedFromRefCountry.value);
  }
}
