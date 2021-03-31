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
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {DecimalPipe} from '@angular/common';
import {FormService} from '../services/form.service';
import {Observable, Subscription} from 'rxjs';
import {LookupState} from '../products-kit-request-form/products-kit-request-form.component';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'app-products-kit-hair-colour-request-form',
  templateUrl: './products-kit-hair-colour-request-form.component.html',
  styleUrls: ['./products-kit-hair-colour-request-form.component.css']
})
export class ProductsKitHairColourRequestFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() selectedRequestedType;
  @Input() selectedFormType;
  @Input() selectedTrackType;
  @Input() successSubmission;
  @Input() editData;
  @Input() reRegistrationStatus;
  @Input() variationFieldsStatus;
  @Input() variationFields;
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
      required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false,
      enable: true
    },
    {
      id: 'GMP',
      name: 'GMP',
      fileName: '',
      required: false,
      enable: true
    },
    {
      id: 'CoA',
      name: 'CoA',
      fileName: '',
      required: this.selectedRequestedType === 1 && this.selectedRequestedType === 2 ? true : false,
      enable: true
    },
    {
      id: 'artWorkForTheKit',
      name: 'Art Work For The Kit',
      fileName: '',
      required: true,
      enable: true
    },
    {
      id: 'leaflet',
      name: 'leaflet',
      fileName: '',
      required: false,
      enable: true
    },
    {
      id: 'reference',
      name: 'reference',
      fileName: '',
      required: false,
      enable: true
    },
    {
      id: 'methodOfAnalysis',
      name: 'Method of Analysis',
      fileName: '',
      required: false,
      enable: true
    },
    {
      id: 'specificationsOfFinishedProduct',
      name: 'Specifications of Finished Product',
      fileName: '',
      required: true,
      enable: true
    },
    {
      id: 'receipt',
      name: 'receipt',
      fileName: '',
      required: true,
      enable: true
    },
    {
      id: 'authorizationLetter',
      name: 'Authorization Letter',
      fileName: '',
      required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false,
      enable: true
    },
    {
      id: 'manufacturingContract',
      name: 'Manufacturing Contract',
      fileName: '',
      required: false,
      enable: true
    },
    {
      id: 'storageContract',
      name: 'Storage Contract',
      fileName: '',
      required: false,
      enable: true
    },
    {
      id: 'others',
      name: 'others',
      fileName: '',
      required: false,
      enable: true
    },
    {
      id: 'otherFees',
      name: 'otherFees',
      fileName: '',
      required: true,
      enable: true
    },
    {
      id: 'factoryLicense',
      name: 'Factory license',
      fileName: '',
      required: false,
      enable: this.variationFieldsStatus ? true : false
    },
    {
      id: 'manufacturingAssignment',
      name: 'Manufacturing Assignment',
      fileName: '',
      required: false,
      enable: this.variationFieldsStatus ? true : false
    },
    {
      id: 'commercialRecord',
      name: 'Commercial Record',
      fileName: '',
      required: false,
      enable: this.variationFieldsStatus ? true : false
    },
    {
      id: 'stabilityStudy',
      name: 'Stability study',
      fileName: '',
      required: false,
      enable: this.variationFieldsStatus ? true : false
    },
    {
      id: 'shelfLifeAttachment',
      name: 'Shelf life',
      fileName: '',
      required: false,
      enable: this.variationFieldsStatus ? true : false
    },
    {
      id: 'letterOfVariationFromLicenseHolder',
      name: 'letter of variation from license holder',
      fileName: '',
      required: false,
      enable: this.variationFieldsStatus ? true : false
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
  selectedTrackTypeForNewProduct;
  selectedRegisteredTypeForProduct;
  selectedRegisteredProductTypeForProduct;
  enableEditableFields = [];
  disabledSaveButton: boolean = false;
  isLoading: boolean = false;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  filteredOptionsForProductColor: Observable<LookupState[]>;
  filteredOptionsForManufacturingCompany: Observable<LookupState[]>;
  filteredOptionsForManufacturingCountry: Observable<LookupState[]>;
  filteredOptionsForApplicant: Observable<LookupState[]>;
  filteredOptionsForLicenseHolder: Observable<LookupState[]>;
  filteredOptionsForLicenseHolderCountry: Observable<LookupState[]>;
  filteredOptionsForStoragePlace: Observable<LookupState[]>;
  subscription: Subscription;
  @ViewChildren(MatAutocompleteTrigger) triggerCollection: QueryList<MatAutocompleteTrigger>;

  constructor(private fb: FormBuilder,
              private getServices: FormService,
              private number: DecimalPipe) {
    this.getFormAsStarting('');
  }

  ngOnChanges() {
    this.formData = {...this.lookupsData, productStatusList: ['Registered', 'New']};
    // this.getFormAsStarting();

    if (this.successSubmission) {
      this.resetForms();
    }

    if (this.editData) {
      this.getFormAsStarting(this.editData);
    }

    this.getDisabledValues();
  }

  ngOnInit(): void {
    this.filteredOptionsForProductColor = this.filterLookupsFunction(this.regColourKitForAllRequestedType.get('productColor'), this.formData.productColorList);
    this.filteredOptionsForManufacturingCompany = this.filterLookupsFunction(this.regColourKitForAllRequestedType.get('manufacturingCompany'), this.formData.manufacturingCompanyList);
    this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction(this.regColourKitForAllRequestedType.get('manufacturingCountry'), this.formData.manufacturingCountryList);
    this.filteredOptionsForApplicant = this.filterLookupsFunction(this.regColourKitForAllRequestedType.get('applicant'), this.formData.applicantList);
    this.filteredOptionsForLicenseHolder = this.filterLookupsFunction(this.regColourKitForAllRequestedType.get('licenseHolder'), this.formData.licenseHolderList);
    this.filteredOptionsForLicenseHolderCountry = this.filterLookupsFunction(this.regColourKitForAllRequestedType.get('countryOfLicenseHolder'), this.formData.licenseHolderCountryList);
    this.filteredOptionsForStoragePlace = this.filterLookupsFunction(this.regColourKitForAllRequestedType.get('storagePlace'), this.formData.storagePlaceList);

    this.regColourKitForAllRequestedType.valueChanges.subscribe(x => {
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
    this._subscribeToClosingActions('applicant', this.filteredOptionsForApplicant);
    this._subscribeToClosingActions('licenseHolder', this.filteredOptionsForLicenseHolder);
    this._subscribeToClosingActions('countryOfLicenseHolder', this.filteredOptionsForLicenseHolderCountry);
    this._subscribeToClosingActions('storagePlace', this.filteredOptionsForStoragePlace);
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  onFileSelect(event, fileControlName) {
    this.attachmentFields.filter(x => x.id === fileControlName).map(y => y.fileName = event.target.value.split(/(\\|\/)/g).pop());
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.regColourKitForAllRequestedType.get(fileControlName).setValue(file);
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
    const data = this.convertAllNamingToId(this.regColourKitForAllRequestedType.value);
    this.saveDataOutput.emit(data);
  }

  onSubmit() {
    this.regColourKitForAllRequestedType.value.ProductsForKit.splice(this.regColourKitForAllRequestedType.value.ProductsForKit.length - 1, 1);
    const data = this.convertAllNamingToId(this.regColourKitForAllRequestedType.value);

    this.submitDataOutput.emit(data);
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

      setTimeout(() => {
        this.removeShortNameFieldStatus = false;
      }, 1500);
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
      productDetails: this.fb.group({})
    }));
  }

  removeProductsGroupRows(i) {
    this.allProductsInKit.tableBody = [];

    let control = <FormArray> this.regColourKitForAllRequestedType.controls.deletedProductIdLists;
    if (control.value.filter(x => x === this.ProductGroupsRows().value[i].productDetails.id).length < 1) {
      control.push(this.fb.control(this.ProductGroupsRows().value[i].productDetails.id));
    }

    this.ProductGroupsRows().removeAt(i);

    this.ProductGroupsRows().value.filter(y => y.productStatus).map(x => {
      if (this.allProductsInKit.tableBody.length === 0) {
        this.allProductsInKit.tableBody = [x.productDetails];
      } else {
        this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, x.productDetails];
      }
    });

  }

  getFormAsStarting(data) {
    if (data) {
      data.ProductsForKit.map((x, i) => {
        const keyOfLookup = Object.keys(this.lookupsData);
        keyOfLookup.map(key => {
          const keyLowerCase = key.replace('List', '');
          const value = x[keyLowerCase];

          this.lookupsData[key].filter(y => y.ID === value).map(x => {
            x[keyLowerCase] = x.NAME;
          });
        });

        this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, x.productDetails];
      });

      data.shortName.map((X, i) => {
        if (data.shortName.length > 1 && i < data.shortName.length - 1) {
          this.addShortName();
        }
      });

      this.formData.productColorList.filter(item => item.ID === data.productColor).map(x => data.productColor = x.NAME);
      this.formData.manufacturingCompanyList.filter(item => item.ID === data.manufacturingCompany).map(x => data.manufacturingCompany = x.NAME);
      this.formData.manufacturingCountryList.filter(option => option.ID === data.manufacturingCountry).map(x => data.manufacturingCountry = x.NAME);
      this.formData.applicantList.filter(option => option.ID === data.applicant).map(x => data.applicant = x.NAME);
      this.formData.licenseHolderList.filter(option => option.ID === data.licenseHolder).map(x => data.licenseHolder = x.NAME);
      this.formData.licenseHolderCountryList.filter(option => option.ID === data.countryOfLicenseHolder).map(x => data.countryOfLicenseHolder = x.NAME);
      this.formData.storagePlaceList.filter(option => option.ID === data.storagePlace).map(x => data.storagePlace = x.NAME);

      this.regColourKitForAllRequestedType.valueChanges.subscribe(x => {
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

      this.regColourKitForAllRequestedType.patchValue({
        ...data,
      });

      let control = <FormArray> this.regColourKitForAllRequestedType.controls.ProductsForKit;
      data.ProductsForKit.map(x => {
        control.push(this.fb.group(x));
      });

      this.addProductsGroupRows();
    } else {
      this.regColourKitForAllRequestedType = this.fb.group({
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
        shelfLife: this.fb.control(0),
        storagePlace: this.fb.control('', this.selectedRequestedType !== 1 && this.selectedRequestedType !== 2 && this.selectedRequestedType !== 5 && this.selectedRequestedType !== 6 ? Validators.required : null),
        receiptNumber: this.fb.control('', Validators.required), //[Validators.required, Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$')]
        receiptValue: this.fb.control('', [Validators.required, Validators.pattern(/(\d*(\d{2}\.)|\d{1,3})/)]),
        groupName: this.fb.control('', Validators.required),
        ProductsForKit: this.fb.array([this.fb.group({
          productStatus: this.fb.control(''),
          NotificationNo: this.fb.control(''),
          productDetails: this.fb.group({})
        })]),
        deletedProductIdLists: this.fb.array([]),
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

  equalTheNewDetailsTable(index) {
    this.detailsListTable.tableBody = this.regColourKitForAllRequestedType.get('ProductsForKit')[index];
  }

  editTheDetailsRow(event) {
    this.editDetailedRowStatus = true;
    this.editIndex = event;
  }

  applyProduct(data, status, index) {
    if (status === 'registered') {
      this.isLoading = true;
      this.getServices.getProductWithNotificationNumberList(data.value.NotificationNo, 'kitProduct').subscribe((res: any) => {
        if (res) {
          const objectData = {
            ...res,
            groupName: this.regColourKitForAllRequestedType.get('groupName').value
          };

          this.ProductGroupsRows().value[index].productDetails = res;
          const keyOfLookup = Object.keys(this.lookupsData);
          keyOfLookup.map(key => {
            const keyLowerCase = key.replace('List', '');
            const value = objectData[keyLowerCase];

            this.lookupsData[key].filter(y => y.ID === value).map(x => {
              objectData[keyLowerCase] = keyLowerCase === 'manufacturingCompany' ? x.MANUFACTORY_NAME : keyLowerCase === 'manufacturingCountry' ? x.COUNTRY_NAME : keyLowerCase === 'licenseHolderCountry' ? x.COUNTRY_NAME : x.NAME;
            });
          });
          this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, objectData];
          this.addProductsGroupRows();
        }

        this.isLoading = false;
      }, error => this.handleError(error));
    } else if (status === 'new') {
      this.newProductObject = data;
      const keyOfLookup = Object.keys(this.lookupsData);
      keyOfLookup.map(key => {
        const keyLowerCase = key.replace('List', '');
        const value = data[keyLowerCase];

        this.lookupsData[key].filter(y => y.ID === value).map(x => {
          data[keyLowerCase] = keyLowerCase === 'manufacturingCompany' ? x.MANUFACTORY_NAME : keyLowerCase === 'manufacturingCountry' ? x.COUNTRY_NAME : keyLowerCase === 'licenseHolderCountry' ? x.COUNTRY_NAME : x.NAME;
        });
      });
      this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, data];

      this.addProductsGroupRows();
    }
  }

  getTrackTypeForProduct(event) {
    this.selectedTrackTypeForNewProduct = event.value;
  }

  getRegisteredTypeForProduct(event) {
    this.selectedRegisteredTypeForProduct = event.value;
  }

  getProductTypeFromNewProductInKit(event) {
    this.selectedRegisteredProductTypeForProduct = event;
  }

  getDataForNewProduct(event) {
    this.ProductGroupsRows().value.filter(x => x.productStatus === 'New').map(y => {
      y.productDetails = event;
    });

    const lastRowInArray = this.ProductGroupsRows().value.length - 1;

    const data = {
      groupName: this.regColourKitForAllRequestedType.get('groupName').value,
      typeOfMarketing: this.selectedRegisteredProductTypeForProduct,
      typeOfRegistration: this.selectedRequestedType,
      trackType: this.selectedTrackType,
      ...this.ProductGroupsRows().value[lastRowInArray].productDetails
    };

    this.applyProduct(data, 'new', '');
  }

  getDecimalValue(value) {

    this.regColourKitForAllRequestedType.patchValue({
      receiptValue: this.number.transform(this.regColourKitForAllRequestedType.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
  }

  resetForms() {
    this.getFormAsStarting('');
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
    this.formData.storagePlaceList.filter(option => option.NAME === data.storagePlace).map(x => data.storagePlace = x.ID);

    return data;
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }

  onClosedErrorAlert() {
    setTimeout(() => {
      this.alertErrorNotificationStatus = false;
    }, 2000);
  }

  private _subscribeToClosingActions(field, list): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    list.subscribe(x => {
      if (x.length === 0) {
        if (this.regColourKitForAllRequestedType.controls[field].dirty) {
          this.regColourKitForAllRequestedType.controls[field].setValue(null);
        }
      }
    });
  }
}

