import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {LookupState} from '../product-request-form/product-request-form.component';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {FormService} from '../services/form.service';
import {ActivatedRoute} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-test-custom-release',
  templateUrl: './test-custom-release.component.html',
  styleUrls: ['./test-custom-release.component.css']
})
export class TestCustomReleaseComponent implements OnInit {

  customReleaseForm: FormGroup;
  formData = {
    fieldsType: [
      {
        ID: 0,
        NAME: 'Final Products'
      },
      {
        ID: 1,
        NAME: 'Samples'
      },
      {
        ID: 2,
        NAME: 'Registered products for internal use'
      },
      {
        ID: 3,
        NAME: 'Registered products for export'
      },
      {
        ID: 4,
        NAME: 'Importers of raw materials'
      },
      {
        ID: 5,
        NAME: 'Import samples of raw materials'
      },
      {
        ID: 6,
        NAME: 'Importing articles for the production of registered or listed products for local circulation'
      },
      {
        ID: 7,
        NAME: 'Importing cosmetic production for export only (not registered or listed)'
      },
      {
        ID: 8,
        NAME: 'Importing samples for production requirements'
      },
    ],
    importReasonList: [
      {
        ID: 0,
        NAME: 'importReason1'
      },
      {
        ID: 1,
        NAME: 'importReason2'
      },
      {
        ID: 3,
        NAME: 'importReason3'
      },
      {
        ID: 4,
        NAME: 'importReason4'
      },
      {
        ID: 5,
        NAME: 'importReason5'
      }
    ],
    currencyList: [
      {
        ID: 0,
        NAME: 'currency0'
      },
      {
        ID: 1,
        NAME: 'currency1'
      },
      {
        ID: 2,
        NAME: 'currency2'
      },
      {
        ID: 3,
        NAME: 'currency3'
      },
      {
        ID: 4,
        NAME: 'currency4'
      },
    ],
    applicantList: [],
    portNameList: [
      {
        ID: 0,
        NAME: 'portName0'
      },
      {
        ID: 1,
        NAME: 'portName1'
      },
      {
        ID: 2,
        NAME: 'portName2'
      },
      {
        ID: 3,
        NAME: 'portName3'
      },
      {
        ID: 4,
        NAME: 'portName4'
      },
    ],
    rowMaterialNameList: [
      {
        ID: 0,
        NAME: 'rowMaterialName0'
      },
      {
        ID: 1,
        NAME: 'rowMaterialName1'
      },
      {
        ID: 2,
        NAME: 'rowMaterialName2'
      },
      {
        ID: 3,
        NAME: 'rowMaterialName3'
      },
      {
        ID: 4,
        NAME: 'rowMaterialName4'
      },
    ],
    packingItemNameList: [
      {
        ID: 0,
        NAME: 'packingItemName0'
      },
      {
        ID: 1,
        NAME: 'packingItemName1'
      },
      {
        ID: 2,
        NAME: 'packingItemName2'
      },
      {
        ID: 3,
        NAME: 'packingItemName3'
      },
      {
        ID: 4,
        NAME: 'packingItemName4'
      },
    ],
    manufacturingCompanyList: [],
    manufacturingCountryList: [],
    quantityList: [
      {
        ID: 0,
        NAME: 'quantity0'
      },
      {
        ID: 1,
        NAME: 'quantity1'
      },
      {
        ID: 2,
        NAME: 'quantity2'
      },
      {
        ID: 3,
        NAME: 'quantity3'
      },
      {
        ID: 4,
        NAME: 'quantity4'
      },
    ],
    unitOfMeasureList: [],
    ingrediantList: [],
    functionList: [],
  };
  attachmentFields = [];
  productId;
  selectedFormType;
  isLoading: boolean = false;
  successSubmission: boolean = false;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  subscription: Subscription;
  @ViewChildren(MatAutocompleteTrigger) triggerCollection: QueryList<MatAutocompleteTrigger>;
  editDetailedRowStatus = false;
  editIndex;

  editIngrediantDetailedRowStatus = false;
  editIngrediantIndex;
  editProductIndex = false;
  productInInvoiceTable = {
    tableHeader: ['Volumes', 'Unit of measure', 'type of packaging', 'Actions'],
    tableBody: []
  };
  IngrediantTable = {
    tableHeader: ['Ingrediant', 'Concentrations', 'Function', 'Actions'],
    tableBody: []
  };
  filteredOptionsForImportReason: Observable<LookupState[]>;
  filteredOptionsForCurrency: Observable<LookupState[]>;
  filteredOptionsForApplicant: Observable<LookupState[]>;
  filteredOptionsForPortName: Observable<LookupState[]>;
  filteredOptionsForRowMaterialName: Observable<LookupState[]>;
  filteredOptionsForPackingItemName: Observable<LookupState[]>;
  filteredOptionsForManufacturingCompany: Observable<LookupState[]>;
  filteredOptionsForManufacturingCountry: Observable<LookupState[]>;
  filteredOptionsForQuantity: Observable<LookupState[]>;
  filteredOptionsForUOM: Observable<LookupState[]>;
  filteredOptionsForIngradiant: Observable<LookupState[]>;
  filteredOptionsForFunction: Observable<LookupState[]>;
  disabledSaveButton: boolean = false;
  activeTabIndex;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;

  constructor(private getService: FormService,
              private readonly route: ActivatedRoute,
              private fb: FormBuilder,
              private number: DecimalPipe) {
  }

  ngOnInit(): void {
    this.getFormAsStarting('');

    this.getService.getCountryLookUp().subscribe((res: any) => {
      this.formData.manufacturingCountryList = res;
      this.isLoading = false;
    }, error => this.handleError(error), () => this.getLookupForFormArray());

    this.getService.getCompanyProfileLookUp().subscribe((res: any) => {
      this.formData.applicantList = res;
      this.isLoading = false;
    }, error => this.handleError(error), () => {
      this.filteredOptionsForApplicant = this.filterLookupsFunction(this.customReleaseForm.get('applicant'), this.formData.applicantList);
    });

    this.getService.getManufacturingCompanyLookUp().subscribe((res: any) => {
      this.formData.manufacturingCompanyList = res;
      this.isLoading = false;
    }, error => this.handleError(error), () => this.getLookupForFormArray());
    this.getService.getFunctionLookUp().subscribe((res: any) => {
      this.formData.functionList = res;
      this.isLoading = false;
    }, error => this.handleError(error), () => this.getLookupForFormArray());
    this.getService.getUnitOfMeasureLookUp().subscribe((res: any) => {
      this.formData.unitOfMeasureList = res;
      this.isLoading = false;
    }, error => this.handleError(error), () => this.getLookupForFormArray());
    this.getService.getProductIngrediantsLookUp().subscribe((res: any) => {
      this.formData.ingrediantList = res;
      this.isLoading = false;
    }, error => this.handleError(error), () => this.getLookupForFormArray());

    this.filteredOptionsForImportReason = this.filterLookupsFunction(this.customReleaseForm.get('importReason'), this.formData.importReasonList);
    this.filteredOptionsForCurrency = this.filterLookupsFunction(this.customReleaseForm.get('currency'), this.formData.currencyList);
    this.filteredOptionsForPortName = this.filterLookupsFunction(this.customReleaseForm.get('portName'), this.formData.portNameList);

    this.productId = this.route.snapshot.paramMap.get('id');

    this.customReleaseForm.valueChanges.subscribe(x => {
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

    this.setValueInAttachementList();
  }

  ngAfterViewInit() {
    this._subscribeToClosingActions('importReason');
    this._subscribeToClosingActions('currency');
    this._subscribeToClosingActions('applicant');
    this._subscribeToClosingActions('portName');
    this._subscribeToClosingActionsForPackagingFormArray('manufacturingCompany');
    this._subscribeToClosingActionsForPackagingFormArray('manufacturingCountry');
    this._subscribeToClosingActionsForPackagingFormArray('quantity');
    this._subscribeToClosingActionsForPackagingFormArray('UOM');
    this._subscribeToClosingActionsForIngrediants('UOM');
    this._subscribeToClosingActionsForPackagingFormArray('ingrediant');
    this._subscribeToClosingActionsForPackagingFormArray('function');
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
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
        this.customReleaseForm.get(fileControlName).setValue({name: file.name, base64Data: res.target.result});
      };

      // this.customReleaseForm.get(fileControlName).setValue(file);
    }
  }

  getLookupForFormArray() {
    this.InvoiceProductsRows().controls.map((x, i) => {
      this.filteredOptionsForRowMaterialName = this.filterLookupsFunction(x.get('rowMaterialName'), this.formData.rowMaterialNameList);
      this.filteredOptionsForPackingItemName = this.filterLookupsFunction(x.get('packingItemName'), this.formData.packingItemNameList);
      this.filteredOptionsForManufacturingCompany = this.filterLookupsFunction(x.get('manufacturingCompany'), this.formData.manufacturingCompanyList);
      this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction(x.get('manufacturingCountry'), this.formData.manufacturingCountryList);
      this.filteredOptionsForQuantity = this.filterLookupsFunction(x.get('quantity'), this.formData.quantityList);
      this.filteredOptionsForUOM = this.filterLookupsFunction(x.get('UOM'), this.formData.unitOfMeasureList);
    });

    this.IngrediantDetailsRows().controls.map((item, index) => {
      this.filteredOptionsForIngradiant = this.filterLookupsFunction(item.get('ingrediant'), this.formData.ingrediantList);
      this.filteredOptionsForFunction = this.filterLookupsFunction(item.get('function'), this.formData.functionList);
    });
  }

  getFormType(event) {
    this.selectedFormType = event.value;
    this.setValueInAttachementList();
  }

  InvoiceProductsRows(): FormArray {
    return this.customReleaseForm.get('productsInInvoice') as FormArray;
  }

  addProductInInvoiceRows() {
    this.editDetailedRowStatus = false;
    this.equalTheNewProductInInvoiceTable('add');
    this.InvoiceProductsRows().push(this.fb.group({
      productId: this.fb.control(''),
      notificationNumber: this.fb.control(''),
      productArabicName: this.fb.control(''),
      productEnglishName: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z]+[ 0-9a-zA-Z-_*]*$')]),
      manufacturingCompany: this.fb.control(''),
      manufacturingCountry: this.fb.control(''),
      batchNo: this.fb.control(''),
      quantity: this.fb.control(''),
      UOM: this.fb.control('')
    }));
  }

  removeProductInInvoiceRows(i) {
    this.InvoiceProductsRows().removeAt(i);
    this.customReleaseForm.get('productsInInvoice').value.pop();
    this.productInInvoiceTable.tableBody = this.customReleaseForm.get('productsInInvoice').value;
  }

  cancelTheProductInInvoiceRows(index) {
    this.InvoiceProductsRows().removeAt(index);
    this.productInInvoiceTable.tableBody.pop();
  }

  editTheProductInInvoiceRows(event) {
    this.editDetailedRowStatus = true;
    this.editProductIndex = event;
  }

  equalTheNewProductInInvoiceTable(fromWhere) {
    if (fromWhere !== 'form') {
      if (fromWhere === 'remove') {
        this.customReleaseForm.get('productsInInvoice').value.pop();
      }

      this.productInInvoiceTable.tableBody = this.customReleaseForm.get('productsInInvoice').value;
    }
  }

  IngrediantDetailsRows(): FormArray {
    return this.customReleaseForm.get('ingrediantDetails') as FormArray;
  }

  addIngrediantDetailsRows() {
    this.editIngrediantDetailedRowStatus = false;
    this.equalTheIngrediantDetailsTable('add');
    this.IngrediantDetailsRows().push(this.fb.group({
      Ingredient_ID: this.fb.control(''),
      ingrediant: this.fb.control('', Validators.required),
      concentrations: this.fb.control('', Validators.required),
      function: this.fb.control('', Validators.required)
    }));
  }

  editTheIngrediantDetailsRows(event) {
    this.editIngrediantDetailedRowStatus = true;
    this.editIngrediantIndex = event;
  }

  removeIngrediantDetailsRows(i) {
    this.InvoiceProductsRows().removeAt(i);
    this.customReleaseForm.get('ingrediantDetails').value.pop();
    this.IngrediantTable.tableBody = this.customReleaseForm.get('ingrediantDetails').value;
  }

  cancelTheIngrediantDetailsRows(index) {
    this.IngrediantDetailsRows().removeAt(index);
    this.IngrediantTable.tableBody.pop();
  }

  equalTheIngrediantDetailsTable(fromWhere) {
    if (fromWhere !== 'form') {
      if (fromWhere === 'remove') {
        this.customReleaseForm.get('ingrediantDetails').value.pop();
      }

      this.IngrediantTable.tableBody = this.customReleaseForm.get('ingrediantDetails').value;
    }
  }

  getFormAsStarting(data) {
    if (data) {
      // data.shortName.map((X, i) => {
      //   if (data.shortName.length > 1 && i < data.shortName.length - 1) {
      //     this.addShortName();
      //   }
      // });
      // data.detailsTable.map((x, i) => {
      //   x.ingrediantDetails.map((y, index) => {
      //     if (x.ingrediantDetails.length > 1 && index < x.ingrediantDetails.length - 1) {
      //       this.addIngrediantDetailsRows(i);
      //     }
      //   });
      //
      //   if (data.detailsTable.length > 1 && i < data.detailsTable.length - 1) {
      //     this.addDetailsRows();
      //   }
      // });
      // this.formData.manufacturingCompanyList.filter(item => item.ID === data.manufacturingCompany).map(x => data.manufacturingCompany = x.NAME);
      // this.formData.manufacturingCompanyList.filter(item => item.ID === data.manufacturingCompany).map(x => data.manufacturingCompany = x.NAME);
      // this.formData.manufacturingCountryList.filter(option => option.ID === data.manufacturingCountry).map(x => data.manufacturingCountry = x.NAME);
      // this.formData.applicantList.filter(option => option.ID === data.applicant).map(x => data.applicant = x.NAME);
      // this.formData.licenseHolderList.filter(option => option.ID === data.licenseHolder).map(x => data.licenseHolder = x.NAME);
      // this.formData.licenseHolderCountryList.filter(option => option.ID === data.countryOfLicenseHolder).map(x => data.countryOfLicenseHolder = x.NAME);
      // this.formData.physicalStateList.filter(option => option.ID === data.physicalState).map(x => data.physicalState = x.NAME);
      // this.formData.purposeOfUseList.filter(option => option.ID === data.purposeOfUse).map(x => data.purposeOfUse = x.NAME);
      // this.formData.storagePlaceList.filter(option => option.ID === data.storagePlace).map(x => data.storagePlace = x.NAME);
      // this.formData.unitOfMeasureList.filter(option => option.ID === data.unitOfMeasure).map(x => data.unitOfMeasure = x.NAME);
      // data.packagingTable.map(x => {
      //   this.formData.unitOfMeasureList.filter(option => option.ID === x.unitOfMeasure).map(item => x.unitOfMeasure = item.NAME);
      //   this.formData.typeOfPackagingList.filter(option => option.ID === x.typeOfPackaging).map(item => x.typeOfPackaging = item.NAME);
      // });
      // data.detailsTable.map(x => {
      //   x.ingrediantDetails.map(y => {
      //     this.formData.ingrediantList.filter(option => option.ID === y.ingrediant).map(item => y.ingrediant = item.NAME);
      //     this.formData.functionList.filter(option => option.ID === y.function).map(item => y.function = item.NAME);
      //   });
      // });
      //
      // this.customReleaseForm.valueChanges.subscribe(x => {
      //   for (let i = 0; i < Object.values(x).length; i++) {
      //     if (typeof Object.values(x)[i] !== 'object') {
      //       if (!Object.values(x)[i]) {
      //         this.disabledSaveButton = false;
      //       } else {
      //         this.disabledSaveButton = true;
      //         break;
      //       }
      //     }
      //   }
      // });
      //
      // this.productFlags = data.productFlags;
      // this.productComments = data.productComments;
      //
      // this.customReleaseForm.patchValue({
      //   ...data
      // });
    } else {
      this.customReleaseForm = this.fb.group({
        invoiceNo: this.fb.control('', Validators.required),
        importReason: this.fb.control(''),
        invoiceValue: this.fb.control(''),
        currency: this.fb.control('', Validators.required),
        applicant: this.fb.control('', Validators.required),
        portName: this.fb.control('', Validators.required),
        receiptNumber: this.fb.control('', Validators.required), //[Validators.required, Validators.pattern('^[a-zA-Z][0-9a-zA-Z]*$')]
        receiptValue: this.fb.control('', Validators.required),
        productsInInvoice: this.fb.array([this.fb.group({
          notificationNumber: this.fb.control('', this.selectedFormType === 0 ? Validators.required : null),
          productArabicName: this.fb.control(''),
          productEnglishName: this.fb.control('', this.selectedFormType === 1 ? Validators.required : null),
          rowMaterialName: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 || this.selectedFormType === 5 ? Validators.required : null),
          packingItemName: this.fb.control('', this.selectedFormType === 6 || this.selectedFormType === 7 || this.selectedFormType === 8 ? Validators.required : null),
          manufacturingCompany: this.fb.control('', Validators.required),
          manufacturingCountry: this.fb.control('', Validators.required),
          batchNo: this.fb.control(''),
          quantity: this.fb.control('', Validators.required),
          UOM: this.fb.control('', Validators.required)
        })]),
        ingrediantDetails: this.fb.array([this.fb.group({
          Ingredient_ID: this.fb.control(''),
          ingrediant: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 || this.selectedFormType === 5 ? Validators.required : null),
          concentrations: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 || this.selectedFormType === 5 ? Validators.required : null),
          function: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 || this.selectedFormType === 5 ? Validators.required : null),
        })]),
        invoiceInEnglish: this.fb.control('', Validators.required),
        countryOfOriginCertificate: this.fb.control(''),
        copyOfTheRelationsOfFactoriesAndCompanies: this.fb.control('', this.selectedFormType === 0 ? Validators.required : null),
        shippingPolicy: this.fb.control('', Validators.required),
        packingList: this.fb.control('', Validators.required),
        receipt: this.fb.control('', Validators.required),
        healthCertificate: this.fb.control(''),
        materialSafetyDataSheet: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 || this.selectedFormType === 5 ? Validators.required : null),
        sealedLetterFromTheExternalManufacturer: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 ? Validators.required : null),
        anExternalFactoryShallSubmitCertificateForChemicalTreatment: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 ? Validators.required : null),
        healthCertificateIsFreeFromEpidemicDiseases: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 ? Validators.required : null),
        certificateImportedFromMarineOriginFromTheManufacturerShall: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 ? Validators.required : null),
        copyOfTheRegistrationNotice: this.fb.control('', this.selectedFormType === 2 ? Validators.required : null),
        copyOfTheApprovedCompositionOfThePreparation: this.fb.control('', this.selectedFormType === 2 ? Validators.required : null),
        compositionOfTheColors: this.fb.control('', this.selectedFormType === 2 ? Validators.required : null),
        approvalOfTheGeneralSecurity: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 ? Validators.required : null),
        benefitOfManufacturingCompanyWithOthers: this.fb.control('', this.selectedFormType === 2 ? Validators.required : null),
        manufacturingCompanyImportsItselfFromOthers: this.fb.control('', this.selectedFormType === 2 ? Validators.required : null),
        benefitOfManufacturingCompanyWithThirdParty: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 6 ? Validators.required : null),
        productionEntrantEntersIntoItsManufacture: this.fb.control('', this.selectedFormType === 2 || this.selectedFormType === 6 ? Validators.required : null),
      });
    }
  }

  saveData() {
    const data = this.convertAllNamingToId(this.customReleaseForm.value);

    console.log('save_data', JSON.stringify(data));

    // this.getService.createProductRequest(data).subscribe((res: any) => {
    //   this.isLoading = false;
    //   this.alertNotificationStatus = true;
    //   this.alertNotification = this.alertForSaveRequest();
    //   this.onClosed();
    // },error => this.handleError(error));
  }

  onSubmit() {
    const data = this.convertAllNamingToId(this.customReleaseForm.value);

    console.log('submit_data', JSON.stringify(data));

    // this.getService.createProductRequest(data).subscribe((res: any) => {
    //   this.isLoading = false;
    //   this.successSubmission = true;
    //   this.alertNotificationStatus = true;
    //   this.alertNotification = this.alertForSubmitRequest();
    //   this.resetForms();
    //   this.onClosed();
    // },error => this.handleError(error));
  }

  getDecimalValue(value) {
    this.customReleaseForm.patchValue({
      receiptValue: this.number.transform(this.customReleaseForm.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
  }

  resetForms() {
    this.getFormAsStarting('');
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

  private _subscribeToClosingActions(field): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    for (var trigger of this.triggerCollection.toArray()) {
      this.subscription = trigger.panelClosingActions
        .subscribe(e => {
          if (!e || !e.source) {
            if (this.customReleaseForm.controls[field].dirty) {
              this.customReleaseForm.controls[field].setValue(null);
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
            this.InvoiceProductsRows().controls.map((x) => {
              if (x['controls'][field].dirty) {
                x['controls'][field].setValue(null);
              }
            });
          }
        });
    }
  }

  private _subscribeToClosingActionsForIngrediants(field): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    for (var trigger of this.triggerCollection.toArray()) {
      this.subscription = trigger.panelClosingActions
        .subscribe(e => {
          if (!e || !e.source) {
            this.IngrediantDetailsRows().controls.map((x) => {
              if (x['controls'][field].dirty) {
                x['controls'][field].setValue(null);
              }
            });
          }
        });
    }
  }

  convertAllNamingToId(data) {
    this.formData.importReasonList.filter(option => option.NAME === data.importReason).map(x => data.importReason = x.ID);
    this.formData.currencyList.filter(option => option.NAME === data.currency).map(x => data.currency = x.ID);
    this.formData.applicantList.filter(option => option.NAME === data.applicant).map(x => data.applicant = x.ID);
    this.formData.portNameList.filter(option => option.NAME === data.portName).map(x => data.portName = x.ID);
    this.formData.portNameList.filter(option => option.NAME === data.portName).map(x => data.portName = x.ID);

    data.productsInInvoice.map(x => {
      this.formData.manufacturingCompanyList.filter(option => option.NAME === x.manufacturingCompany).map(y => x.manufacturingCompany = y.ID);
      this.formData.manufacturingCountryList.filter(option => option.NAME === x.manufacturingCountry).map(y => x.manufacturingCountry = y.ID);
      this.formData.quantityList.filter(option => option.NAME === x.quantity).map(y => x.quantity = y.ID);
      this.formData.unitOfMeasureList.filter(option => option.NAME === x.UOM).map(y => x.UOM = y.ID);
    });
    data.ingrediantDetails.map(y => {
      this.formData.ingrediantList.filter(option => option.NAME === y.ingrediant).map(item => y.ingrediant = item.ID);
      this.formData.functionList.filter(option => option.NAME === y.function).map(item => y.function = item.ID);
    });

    return data;
  }

  alertForSaveRequest() {
    return {msg: 'You had a successful saving'};
  }

  alertForSubmitRequest() {
    return {msg: 'You had a successful Submission'};
  }

  onClosed() {
    setTimeout(() => {
      this.alertNotificationStatus = false;
    }, 2000);
  }

  onClosedErrorAlert() {
    setTimeout(() => {
      this.alertErrorNotificationStatus = false;
    }, 2000);
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }

  setValueInAttachementList() {

    this.attachmentFields = [
      {
        id: 'invoiceInEnglish',
        name: 'Invoice In English',
        fileName: '',
        enable: true,
        required: true,
      },
      {
        id: 'countryOfOriginCertificate',
        name: 'Country Of Origin Certificate',
        fileName: '',
        enable: this.selectedFormType !== 1,
        required: false
      },
      {
        id: 'copyOfTheRelationsOfFactoriesAndCompanies',
        name: 'copy Of The Relations Of Factories And Companies',
        fileName: '',
        enable: this.selectedFormType === 0,
        required: true
      },
      {
        id: 'shippingPolicy',
        name: 'Shipping Policy',
        fileName: '',
        enable: true,
        required: true,
      },
      {
        id: 'packingList',
        name: 'Packing List',
        fileName: '',
        enable: true,
        required: true,
      },
      {
        id: 'receipt',
        name: 'receipt',
        fileName: '',
        enable: true,
        required: true,
      },
      {
        id: 'healthCertificate',
        name: 'Health Certificate',
        fileName: '',
        enable: this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 || this.selectedFormType === 5,
        required: false
      },
      {
        id: 'materialSafetyDataSheet',
        name: 'Material Safety DataSheet',
        fileName: '',
        enable: this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4 || this.selectedFormType === 5,
        required: true
      },
      {
        id: 'sealedLetterFromTheExternalManufacturer',
        name: 'Sealed Letter From The External Manufacturer',
        fileName: '',
        enable: this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4,
        required: true
      },
      {
        id: 'anExternalFactoryShallSubmitCertificateForChemicalTreatment',
        name: 'An External Factory Shall Submit Certificate For Chemical Treatment',
        fileName: '',
        enable: this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4,
        required: true
      },
      {
        id: 'healthCertificateIsFreeFromEpidemicDiseases',
        name: 'Health Certificate Is Free From Epidemic Diseases',
        fileName: '',
        enable: this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4,
        required: true
      },
      {
        id: 'certificateImportedFromMarineOriginFromTheManufacturerShall',
        name: 'Certificate Imported From Marine Origin From The Manufacturer Shall',
        fileName: '',
        enable: this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4,
        required: true
      },
      {
        id: 'copyOfTheRegistrationNotice',
        name: 'Copy Of The Registration Notice',
        fileName: '',
        enable: this.selectedFormType === 2,
        required: true
      },
      {
        id: 'copyOfTheApprovedCompositionOfThePreparation',
        name: 'copy Of The Approved Composition Of The Preparation',
        fileName: '',
        enable: this.selectedFormType === 2,
        required: true
      },
      {
        id: 'compositionOfTheColors',
        name: 'Composition Of The Colors',
        fileName: '',
        enable: this.selectedFormType === 2,
        required: true
      },
      {
        id: 'approvalOfTheGeneralSecurity',
        name: 'Approval Of The General Security',
        fileName: '',
        enable: this.selectedFormType === 2 || this.selectedFormType === 3 || this.selectedFormType === 4,
        required: true
      },
      {
        id: 'benefitOfManufacturingCompanyWithOthers',
        name: 'Benefit Of Manufacturing Company With Others',
        fileName: '',
        enable: this.selectedFormType === 2,
        required: true
      },
      {
        id: 'manufacturingCompanyImportsItselfFromOthers',
        name: 'Mmanufacturing Company Imports Itself From Others',
        fileName: '',
        enable: this.selectedFormType === 2,
        required: true
      },
      {
        id: 'benefitOfManufacturingCompanyWithThirdParty',
        name: 'Benefit Of Manufacturing Company With Third Party',
        fileName: '',
        enable: this.selectedFormType === 2 || this.selectedFormType === 6,
        required: true
      },
      {
        id: 'productionEntrantEntersIntoItsManufacture',
        name: 'Production Entrant Enters Into Its Manufacture',
        fileName: '',
        enable: this.selectedFormType === 2 || this.selectedFormType === 6,
        required: true
      }
    ];
  }

  applyProduct(data) {
    console.log('data', data);
    this.isLoading = true;
    this.getService.getProductWithNotificationNumberList(data.value.notificationNumber).subscribe((res: any) => {
      console.log('res', res);
      if (res) {
        this.InvoiceProductsRows().controls[this.InvoiceProductsRows().controls.length - 1].patchValue({
          productArabicName: res.productArabicName,
          productEnglishName: res.productEnglishName,
          manufacturingCompany: this.formData.manufacturingCompanyList.filter(item => item.ID === res.manufacturingCompany).map(x => x.NAME),
          manufacturingCountry: this.formData.manufacturingCountryList.filter(option => option.ID === res.manufacturingCountry).map(x => x.NAME)
        });
      }

      this.isLoading = false;
    }, error => this.handleError(error));
  }
}
