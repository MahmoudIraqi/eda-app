import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsetComponent} from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-products-kit-request-form',
  templateUrl: './products-kit-request-form.component.html',
  styleUrls: ['./products-kit-request-form.component.css']
})
export class ProductsKitRequestFormComponent implements OnInit {

  @Input() selectedRequestedType;
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
    functionList: ['function1', 'function2', 'function3'],
    productStatusList: ['Registered', 'New'],
  };
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
  attachmentFieldsForKits = [
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
      id: 'artWorkForTheKit',
      name: 'Art Work For The Kit',
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
  removeShortNameFieldStatus = false;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('insideFormTabs', {static: false}) insideFormTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;
  status;
  detailsListTable = {
    tableHeader: ['Colour', 'Fragrance', 'Flavor', 'BarCode', 'Volumes', 'Actions'],
    tableBody: []
  };
  detailsListTableForKitProduct = {
    tableHeader: ['Colour', 'Fragrance', 'Flavor', 'BarCode', 'Volumes', 'Actions'],
    tableBody: []
  };
  allProductsInKit = {
    tableHeader: ['Group Name', 'Notification Number', 'Product Name', 'Manufacturing Company', 'Manufacturing Country', 'Applicant', 'Actions'],
    tableBody: []
  };
  editDetailedRowStatus = false;
  editIndex;
  editTheKitProductDetailedRowStatus = false;
  editTheKitProductsIndex;
  dummyDataForRegisteredProductForKits = [
    {
      newProduct: {
        productArabicName: '',
        productEnglishName: 'Mahmoud',
        shortName: ['Iraqy', 'Osary'],
        manufacturingCompany: 'Comp2',
        manufacturingCountry: 'Egypt',
        applicant: 'Applicant1',
        licenseHolder: 'licenseHolder1',
        licenseHolderTxt: '',
        countryOfLicenseHolder: 'Egypt',
        tradeMark: 'Prod1',
        physicalState: 'physicalState1',
        physicalStateTxt: '',
        purposeOfUse: 'purposeOfUse2',
        purposeOfUseTxt: '',
        shelfLife: 6,
        receiptNumber: '219',
        receiptValue: '12.4',
        detailsTable: [
          {
            colour: 'Red',
            fragrance: 'Red',
            flavor: 'Red',
            barCode: 'Red',
            volumes: 'Red',
            unitOfMeasure: 'unitOfMeasure1',
            typeOfPackaging: 'typeOfPackaging1',
            packagingDescription: '',
            ingrediantDetails: [
              {
                ingrediant: 'ingrediant1',
                concentrations: 'Test1',
                function: 'function1',
              }
            ]
          }
        ],
        freeSale: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        GMP: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        CoA: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        shelfLifeStatement: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        artWork: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        leaflet: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        reference: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        methodOfAnalysis: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        specificationsOfFinishedProduct: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        receipt: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        authorizationLetter: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        manufacturingContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        storageContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        others: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        otherFees: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
      },
      productStatus: '',
      productNotificationNumber: '12345',
    },
    {
      newProduct: {
        productArabicName: '',
        productEnglishName: 'Osary',
        shortName: ['Abdel Fattah', 'Elsayed'],
        manufacturingCompany: 'Comp3',
        manufacturingCountry: 'Brazil',
        applicant: 'Applicant3',
        licenseHolder: 'licenseHolder2',
        licenseHolderTxt: '',
        countryOfLicenseHolder: 'Brazil',
        tradeMark: 'Prod3',
        physicalState: 'physicalState2',
        physicalStateTxt: '',
        purposeOfUse: 'purposeOfUse3',
        purposeOfUseTxt: '',
        shelfLife: 3,
        receiptNumber: '219',
        receiptValue: '12.4',
        detailsTable: [
          {
            colour: 'Red',
            fragrance: 'Red',
            flavor: 'Red',
            barCode: 'Red',
            volumes: 'Red',
            unitOfMeasure: 'unitOfMeasure1',
            typeOfPackaging: 'typeOfPackaging1',
            packagingDescription: '',
            ingrediantDetails: [
              {
                ingrediant: 'ingrediant1',
                concentrations: 'Test1',
                function: 'function1',
              }
            ]
          }
        ],
        freeSale: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        GMP: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        CoA: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        shelfLifeStatement: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        artWork: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        leaflet: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        reference: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        methodOfAnalysis: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        specificationsOfFinishedProduct: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        receipt: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        authorizationLetter: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        manufacturingContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        storageContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        others: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        otherFees: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
      },
      productStatus: '',
      productNotificationNumber: '67890',
    },
    {
      newProduct: {
        productArabicName: '',
        productEnglishName: 'Mahmoud',
        shortName: ['Iraqy', 'Osary'],
        manufacturingCompany: 'Comp2',
        manufacturingCountry: 'Egypt',
        applicant: 'Applicant1',
        licenseHolder: 'licenseHolder1',
        licenseHolderTxt: '',
        countryOfLicenseHolder: 'Egypt',
        tradeMark: 'Prod1',
        physicalState: 'physicalState1',
        physicalStateTxt: '',
        purposeOfUse: 'purposeOfUse2',
        purposeOfUseTxt: '',
        shelfLife: 6,
        receiptNumber: '219',
        receiptValue: '12.4',
        detailsTable: [
          {
            colour: 'Red',
            fragrance: 'Red',
            flavor: 'Red',
            barCode: 'Red',
            volumes: 'Red',
            unitOfMeasure: 'unitOfMeasure1',
            typeOfPackaging: 'typeOfPackaging1',
            packagingDescription: '',
            ingrediantDetails: [
              {
                ingrediant: 'ingrediant1',
                concentrations: 'Test1',
                function: 'function1',
              }
            ]
          }
        ],
        freeSale: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        GMP: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        CoA: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        shelfLifeStatement: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        artWork: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        leaflet: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        reference: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        methodOfAnalysis: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        specificationsOfFinishedProduct: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        receipt: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        authorizationLetter: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        manufacturingContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        storageContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        others: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        otherFees: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
      },
      productStatus: '',
      productNotificationNumber: '13579',
    },
    {
      newProduct: {
        productArabicName: '',
        productEnglishName: 'Osary',
        shortName: ['Abdel Fattah', 'Elsayed'],
        manufacturingCompany: 'Comp3',
        manufacturingCountry: 'Brazil',
        applicant: 'Applicant3',
        licenseHolder: 'licenseHolder2',
        licenseHolderTxt: '',
        countryOfLicenseHolder: 'Brazil',
        tradeMark: 'Prod3',
        physicalState: 'physicalState2',
        physicalStateTxt: '',
        purposeOfUse: 'purposeOfUse3',
        purposeOfUseTxt: '',
        shelfLife: 3,
        receiptNumber: '219',
        receiptValue: '12.4',
        detailsTable: [
          {
            colour: 'Red',
            fragrance: 'Red',
            flavor: 'Red',
            barCode: 'Red',
            volumes: 'Red',
            unitOfMeasure: 'unitOfMeasure1',
            typeOfPackaging: 'typeOfPackaging1',
            packagingDescription: '',
            ingrediantDetails: [
              {
                ingrediant: 'ingrediant1',
                concentrations: 'Test1',
                function: 'function1',
              }
            ]
          }
        ],
        freeSale: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        GMP: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        CoA: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        shelfLifeStatement: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        artWork: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        leaflet: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        reference: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        methodOfAnalysis: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        specificationsOfFinishedProduct: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        receipt: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        authorizationLetter: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        manufacturingContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        storageContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        others: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        otherFees: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
      },
      productStatus: '',
      productNotificationNumber: '24680',
    },
    {
      newProduct: {
        productArabicName: '',
        productEnglishName: 'Mahmoud',
        shortName: ['Iraqy', 'Osary'],
        manufacturingCompany: 'Comp2',
        manufacturingCountry: 'Egypt',
        applicant: 'Applicant1',
        licenseHolder: 'licenseHolder1',
        licenseHolderTxt: '',
        countryOfLicenseHolder: 'Egypt',
        tradeMark: 'Prod1',
        physicalState: 'physicalState1',
        physicalStateTxt: '',
        purposeOfUse: 'purposeOfUse2',
        purposeOfUseTxt: '',
        shelfLife: 6,
        receiptNumber: '219',
        receiptValue: '12.4',
        detailsTable: [
          {
            colour: 'Red',
            fragrance: 'Red',
            flavor: 'Red',
            barCode: 'Red',
            volumes: 'Red',
            unitOfMeasure: 'unitOfMeasure1',
            typeOfPackaging: 'typeOfPackaging1',
            packagingDescription: '',
            ingrediantDetails: [
              {
                ingrediant: 'ingrediant1',
                concentrations: 'Test1',
                function: 'function1',
              }
            ]
          }
        ],
        freeSale: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        GMP: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        CoA: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        shelfLifeStatement: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        artWork: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        leaflet: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        reference: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        methodOfAnalysis: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        specificationsOfFinishedProduct: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        receipt: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        authorizationLetter: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        manufacturingContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        storageContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        others: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        otherFees: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
      },
      productStatus: '',
      productNotificationNumber: '09876',
    },
    {
      groupName: 'Group1',
      newProduct: {
        productArabicName: '',
        productEnglishName: 'Osary',
        shortName: ['Abdel Fattah', 'Elsayed'],
        manufacturingCompany: 'Comp3',
        manufacturingCountry: 'Brazil',
        applicant: 'Applicant3',
        licenseHolder: 'licenseHolder2',
        licenseHolderTxt: '',
        countryOfLicenseHolder: 'Brazil',
        tradeMark: 'Prod3',
        physicalState: 'physicalState2',
        physicalStateTxt: '',
        purposeOfUse: 'purposeOfUse3',
        purposeOfUseTxt: '',
        shelfLife: 3,
        receiptNumber: '219',
        receiptValue: '12.4',
        detailsTable: [
          {
            colour: 'Red',
            fragrance: 'Red',
            flavor: 'Red',
            barCode: 'Red',
            volumes: 'Red',
            unitOfMeasure: 'unitOfMeasure1',
            typeOfPackaging: 'typeOfPackaging1',
            packagingDescription: '',
            ingrediantDetails: [
              {
                ingrediant: 'ingrediant1',
                concentrations: 'Test1',
                function: 'function1',
              }
            ]
          }
        ],
        freeSale: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        GMP: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        CoA: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        shelfLifeStatement: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        artWork: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        leaflet: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        reference: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        methodOfAnalysis: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        specificationsOfFinishedProduct: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        receipt: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        authorizationLetter: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        manufacturingContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        storageContract: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        others: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
        otherFees: {
          lastModified: '1608642169292',
          lastModifiedDate: 'Tue Dec 22 2020 15:02:49 GMT+0200 (Eastern European Standard Time)',
          name: 'Hausbank_RuesselsheimerVB_Einzelkunden_FK (1).csv',
          size: '374554',
          type: 'application/vnd.ms-excel',
          webkitRelativePath: ''
        },
      },
      productStatus: '',
      productNotificationNumber: '54321',
    },
  ];
  newProductObject: any;

  constructor(private fb: FormBuilder) {
    this.getFormAsStarting();
  }

  ngOnInit(): void {
  }

  onFileSelect(event, fileControlName) {
    this.attachmentFields.filter(x => x.id === fileControlName).map(y => y.fileName = event.target.value.split(/(\\|\/)/g).pop());
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.regKitForAllRequestedType.get(fileControlName).setValue(file);
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
    this.saveDataOutput.emit(this.regKitForAllRequestedType.value);
  }

  onSubmit() {
    this.submitDataOutput.emit(this.regKitForAllRequestedType.value);
  }

  get ShortName(): FormArray {
    return this.regKitForAllRequestedType.get('shortName') as FormArray;
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

  DetailsRows(index): FormArray {
    return this.ProductGroupsRows().at(index).get('detailsTable') as FormArray;
  }

  addDetailsRows(index) {
    this.editDetailedRowStatus = false;
    this.equalTheNewDetailsTable(index);
    this.DetailsRows(index).push(this.fb.group({
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

  editDataDetailsRows(index) {
    this.editDetailedRowStatus = false;
    this.equalTheNewDetailsTable(index);
  }

  removeDetailsRows(event) {
    console.log('event', event);
    this.DetailsRows(event.rowIndex).removeAt(event.i);

    this.equalTheNewDetailsTable(event.rowIndex);
  }

  IngrediantDetailsRows(index, i): FormArray {
    return this.DetailsRows(i).at(index).get('ingrediantDetails') as FormArray;
  }

  addIngrediantDetailsRows(rowIndex, index) {
    this.IngrediantDetailsRows(rowIndex, index).push(this.fb.group({
      ingrediant: this.fb.control('', Validators.required),
      concentrations: this.fb.control('', Validators.required),
      function: this.fb.control('', Validators.required)
    }));
  }

  removeIngrediantDetailsRows(fromWhere, event) {
    if (this.IngrediantDetailsRows(event.rowIndex, event.i).length > 1) {
      this.IngrediantDetailsRows(event.rowIndex, event.i).removeAt(event.childIndex);
    }

    if (fromWhere !== 'form') {
      this.equalTheNewDetailsTable(event.rowIndex);
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
      productNotificationNumber: this.fb.control(''),
      newProduct: this.fb.group({...this.newProductObject})
    }));
  }

  removeProductsGroupRows(i) {
    this.ProductGroupsRows().removeAt(i);
  }

  getFormAsStarting() {
    this.regKitForAllRequestedType = this.fb.group({
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
      shelfLife: this.fb.control(0),
      receiptNumber: this.fb.control('', Validators.required),
      receiptValue: this.fb.control('', [Validators.required, Validators.pattern(/^\d+\.\d{1}$/)]),
      groupName: this.fb.control(''),
      ProductsForKit: this.fb.array([this.fb.group({
        productStatus: this.fb.control(''),
        productNotificationNumber: this.fb.control(''),
        newProduct: this.fb.group({...this.newProductObject})
      })]),
      freeSale: this.fb.control('', this.selectedRequestedType !== 'local' && this.selectedRequestedType !== 'toll' && this.selectedRequestedType !== 'export' ? Validators.required : null),
      GMP: this.fb.control(''),
      CoA: this.fb.control('', this.selectedRequestedType === 'referencedCountry' && this.selectedRequestedType === 'nonReferencedCountry' ? Validators.required : null),
      shelfLifeStatement: this.fb.control('', Validators.required),
      artWorkForTheKit: this.fb.control('', Validators.required),
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

  equalTheNewDetailsTable(index) {
    console.log('12345', this.regKitForAllRequestedType.get('ProductsForKit')[index].value);
    // this.detailsListTable.tableBody = this.regKitForAllRequestedType.get('ProductsForKit')[index]
  }

  editTheDetailsRow(event) {
    this.editDetailedRowStatus = true;
    this.editIndex = event;
  }

  applyProduct(data, status, index) {
    if (status === 'registered') {
      this.dummyDataForRegisteredProductForKits.filter(x => x.productNotificationNumber === data.value.productNotificationNumber).map(y => {
        const objectData = {
          groupName: this.regKitForAllRequestedType.get('groupName').value,
          ...y
        };

        this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, objectData];
        this.addProductsGroupRows();
      });
    } else if (status === 'new') {
      this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, data];
      console.log('this.allProductsInKit.tableBody ', this.allProductsInKit.tableBody);

      this.addProductsGroupRows();
    }
  }

  getDataForNewProduct(event) {
    console.log('event', event);
    this.ProductGroupsRows().value.filter(x => x.productStatus === 'New').map(y => {
      y.newProduct = event;
    });
    console.log('this.ProductGroupsRows().value', this.ProductGroupsRows().value);
    const data = {
      groupName: this.regKitForAllRequestedType.get('groupName').value,
      ...this.ProductGroupsRows().value[this.ProductGroupsRows().value.length - 1]
    };

    console.log('data', data);

    this.applyProduct(data, 'new', '');
  }
}
