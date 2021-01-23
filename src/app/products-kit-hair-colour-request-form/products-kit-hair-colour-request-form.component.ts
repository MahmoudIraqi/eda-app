import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-products-kit-hair-colour-request-form',
  templateUrl: './products-kit-hair-colour-request-form.component.html',
  styleUrls: ['./products-kit-hair-colour-request-form.component.css']
})
export class ProductsKitHairColourRequestFormComponent implements OnInit, OnChanges {

  @Input() selectedRequestedType;
  @Input() lookupsData;
  @Output() saveDataOutput = new EventEmitter();
  @Output() submitDataOutput = new EventEmitter();

  formData;
  selectedKitProductsStatus;
  regColourKitForAllRequestedType: FormGroup;
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
      NotificationNo: '12345',
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
      NotificationNo: '67890',
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
      NotificationNo: '13579',
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
      NotificationNo: '24680',
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
      NotificationNo: '09876',
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
      NotificationNo: '54321',
    },
  ];
  newProductObject: any;

  constructor(private fb: FormBuilder,
              private number: DecimalPipe) {
    this.getFormAsStarting();
  }

  ngOnChanges() {
    this.formData = {...this.lookupsData, productStatusList: ['Registered', 'New']};
    this.getFormAsStarting();
  }

  ngOnInit(): void {
  }

  onFileSelect(event, fileControlName) {
    this.attachmentFields.filter(x => x.id === fileControlName).map(y => y.fileName = event.target.value.split(/(\\|\/)/g).pop());
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.regColourKitForAllRequestedType.get(fileControlName).setValue(file);
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
    this.regColourKitForAllRequestedType.value.ProductsForKit.splice(this.regColourKitForAllRequestedType.value.ProductsForKit.length - 1, 1);
    console.log('this.regColourKitForAllRequestedType.value', this.regColourKitForAllRequestedType.value);
    this.saveDataOutput.emit(this.regColourKitForAllRequestedType.value);
  }

  onSubmit() {
    this.submitDataOutput.emit(this.regColourKitForAllRequestedType.value);
  }

  get ShortName(): FormArray {
    return this.regColourKitForAllRequestedType.get('shortName') as FormArray;
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
    return this.regColourKitForAllRequestedType.get('ProductsForKit') as FormArray;
  }

  addProductsGroupRows() {
    this.editDetailedRowStatus = false;
    this.selectedKitProductsStatus = '';
    this.ProductGroupsRows().push(this.fb.group({
      productStatus: this.fb.control(''),
      NotificationNo: this.fb.control(''),
      newProduct: this.fb.group({})
    }));
  }

  removeProductsGroupRows(i) {
    this.ProductGroupsRows().removeAt(i);
  }

  getFormAsStarting() {
    console.log('this.selectedRequestedType', this.selectedRequestedType);

    this.regColourKitForAllRequestedType = this.fb.group({
      productArabicName: this.fb.control(''),
      productEnglishName: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$')]),
      shortName: this.fb.array([this.fb.control('', Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$'))]),
      productColor: this.fb.control(''),
      manufacturingCompany: this.fb.control('', Validators.required),
      manufacturingCountry: this.fb.control('', Validators.required),
      applicant: this.fb.control('', Validators.required),
      licenseHolder: this.fb.control('', Validators.required),
      licenseHolderTxt: this.fb.control(''),
      countryOfLicenseHolder: this.fb.control('', Validators.required),
      tradeMark: this.fb.control(''),
      shelfLife: this.fb.control(0),
      storagePlace: this.fb.control('', this.selectedRequestedType !== 1 && this.selectedRequestedType !== 2 && this.selectedRequestedType !== 5 && this.selectedRequestedType !== 6 ? Validators.required : null),
      receiptNumber: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$')]),
      receiptValue: this.fb.control('', [Validators.required, Validators.pattern(/^\d+\.\d*$/)]),
      groupName: this.fb.control('', Validators.required),
      ProductsForKit: this.fb.array([this.fb.group({
        productStatus: this.fb.control(''),
        NotificationNo: this.fb.control(''),
        newProduct: this.fb.group({})
      })]),
      freeSale: this.fb.control('', this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? Validators.required : null),
      GMP: this.fb.control(''),
      CoA: this.fb.control('', this.selectedRequestedType === 1 && this.selectedRequestedType === 2 ? Validators.required : null),
      artWorkForTheKit: this.fb.control('', Validators.required),
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

    this.regColourKitForAllRequestedType.valueChanges.subscribe(form => {
      if (form.receiptValue) {
        this.regColourKitForAllRequestedType.patchValue({
          receiptValue: this.number.transform(form.receiptValue, '1.2-2')
        }, {emitEvent: false});
      }
    });
  }

  equalTheNewDetailsTable(index) {
    console.log('12345', this.regColourKitForAllRequestedType.get('ProductsForKit')[index].value);
    this.detailsListTable.tableBody = this.regColourKitForAllRequestedType.get('ProductsForKit')[index];
  }

  editTheDetailsRow(event) {
    this.editDetailedRowStatus = true;
    this.editIndex = event;
  }

  applyProduct(data, status, index) {
    if (status === 'registered') {
      if (this.dummyDataForRegisteredProductForKits.filter(x => x.NotificationNo === data.value.NotificationNo)) {
        this.dummyDataForRegisteredProductForKits.filter(x => x.NotificationNo === data.value.NotificationNo).map(y => {
          const objectData = {
            groupName: this.regColourKitForAllRequestedType.get('groupName').value,
            ...y
          };
          this.ProductGroupsRows().value[index].newProduct = y;
          this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, objectData];
          this.addProductsGroupRows();
        });
      } else {

      }
    } else if (status === 'new') {
      this.newProductObject = data;
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
      groupName: this.regColourKitForAllRequestedType.get('groupName').value,
      ...this.ProductGroupsRows().value[this.ProductGroupsRows().value.length - 1]
    };

    console.log('data', data);

    this.applyProduct(data, 'new', '');
  }
}

