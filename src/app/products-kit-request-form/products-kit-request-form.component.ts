import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList, SimpleChanges, TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {DecimalPipe} from '@angular/common';
import {FormService} from '../services/form.service';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {convertToSpecialObject} from '../../utils/formDataFunction';
import {InputService} from '../services/input.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

export interface LookupState {
  ID: number;
  NAME: string;
}

@Component({
  selector: 'app-products-kit-request-form',
  templateUrl: './products-kit-request-form.component.html',
  styleUrls: ['./products-kit-request-form.component.css']
})
export class ProductsKitRequestFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() selectedRequestedType;
  @Input() selectedFormType;
  @Input() selectedTrackType;
  @Input() selectedIsExport;
  @Input() successSubmission;
  @Input() approvedStatus;
  @Input() trackProductStatus;
  @Input() editData;
  @Input() editFromWhere;
  @Input() getAllLookupsStatus;
  @Input() legacyStatus;
  @Input() canBeAppealedStatus;
  @Input() canEditForApprovedProduct;
  @Input() canEditForHoldApprovedProduct;
  @Input() finalRejectedStatus;
  @Input() reRegistrationStatus;
  @Input() variationFieldsStatus;
  @Input() variationFields;
  @Input() whichVariation;
  @Input() lookupsData;
  @Input() manufacturingCompanyList;
  @Input() companyProfile;
  @Input() saveFromAttachment;
  @Input() saveResponseDataForRegisterProductID;
  @Output() saveDataOutput = new EventEmitter();
  @Output() saveTrackDataOutput = new EventEmitter();
  @Output() saveDataOutputForAttachment = new EventEmitter();
  @Output() submitDataOutput = new EventEmitter();
  @Output() errorMessage = new EventEmitter();
  @Output() errorMessageForAttachment = new EventEmitter();
  @Output() requestIsDraft = new EventEmitter();
  @Output() isLoadingStatus = new EventEmitter();
  @Output() errorForAttachemntRequest = new EventEmitter();
  @Output() enableEditingForTypeOfRegistration = new EventEmitter();

  formData;
  selectedKitProductsStatus;
  regKitForAllRequestedType: FormGroup;
  regManufacturingForProduct: FormGroup;
  attachmentFieldsForKits = [
    {
      id: 'freeSaleDoc',
      name: 'Free Sale',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'GMP',
      name: 'GMP',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'CoA',
      name: 'CoA',
      fileName: '',
      fileValue: '',
      required: this.selectedRequestedType === 1 && this.selectedRequestedType === 2 ? true : false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'artWork',
      name: 'Art Work For The Kit',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'leaflet',
      name: 'leaflet',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'reference',
      name: 'reference',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'methodOfAnalysis',
      name: 'Method of Analysis',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'specificationsOfFinishedProduct',
      name: 'Specifications of Finished Product',
      fileName: '',
      fileValue: '',
      required: !this.legacyStatus ? true : false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'receipt',
      name: 'receipt',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'authorizationLetter',
      name: 'Authorization Letter',
      fileName: '',
      fileValue: '',
      required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'manufacturingContract',
      name: 'Manufacturing Contract',
      fileName: '',
      fileValue: '',
      required: this.selectedRequestedType === 8 ? true : false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'storageContract',
      name: 'Storage Contract',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'others',
      name: 'others',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'otherFees',
      name: 'otherFees',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'factoryLicense',
      name: 'Factory license',
      fileName: '',
      fileValue: '',
      required: false,
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'manufacturingAssignment',
      name: 'Manufacturing Assignment',
      fileName: '',
      required: false,
      fileValue: '',
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'commercialRecord',
      name: 'Commercial Record',
      fileName: '',
      required: false,
      fileValue: '',
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'stabilityStudy',
      name: 'Stability study',
      fileName: '',
      required: false,
      fileValue: '',
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'shelfLifeAttachment',
      name: 'Shelf life',
      fileName: '',
      required: false,
      fileValue: '',
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'letterOfVariationFromLicenseHolder',
      name: 'letter of variation from license holder',
      fileName: '',
      required: false,
      fileValue: '',
      enable: this.variationFieldsStatus ? true : false,
      attachmentTypeStatus: '',
      loadingStatus: false,
    }
  ];
  removeShortNameFieldStatus = false;
  addShortNameFieldStatus = false;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('insideFormTabs', {static: false}) insideFormTabs: TabsetComponent;
  @ViewChild('fileUploader', {static: false}) fileTextUploader: ElementRef;
  status;
  allProductsInKit = {
    tableHeader: ['Notification/Request Number', 'Product Name', 'Manufacturing Company', 'Manufacturing Country', 'Applicant', 'Actions'],
    tableBody: []
  };
  manufacturingListTable = {
    tableHeader: ['Manufacturing Company', 'Manufacturing Country', 'Actions'],
    tableBody: []
  };
  editManufacturingIndex;
  editManufacturingRowStatus = false;
  @ViewChild('manufacturingModal') modalManufacturingTemplate: TemplateRef<any>;
  editDetailedRowStatus = false;
  editIndex;
  fileStructure;
  newProductObject: any;
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
  // filteredOptionsForProductIds: Observable<LookupState[]>;
  subscription: Subscription;
  @ViewChildren(MatAutocompleteTrigger) triggerCollection: QueryList<MatAutocompleteTrigger>;
  productFlags;
  productComments;
  requestId;
  attachmentRequiredStatus: boolean = false;
  isDraft: boolean = false;
  appliedProductStatus: boolean = false;
  deletedProductIdLists = [];
  objectForListOfVariationGroup: any;
  lookupForProductIdsInputForChildComponents;
  editProcessInTrackedProduct: boolean = false;
  deletedManufacturingList = [];
  deletedShortNameList = [];
  modalRef: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-xl packagingModal',
  };

  constructor(private fb: FormBuilder,
              private inputService: InputService,
              private getServices: FormService,
              private modalService: BsModalService,
              private number: DecimalPipe) {
    this.getFormAsStarting('', '');
    this.getManufacturingFormAsStarting('');
  }

  ngOnChanges(changes: SimpleChanges) {

    this.formData = {productStatusList: ['Registered', 'New'], ...this.lookupsData};
    this.getFormAsStarting('', '');

    if (this.successSubmission) {
      this.resetForms();
    }

    this.rerenderFileAttachmentList();

    this.getDisabledValues();

    // this.lookupForProductIdsInputForChildComponents = this.lookupForProductIds;

    this.getFormAsStarting(this.editData, '');

    this.setApplicant(this.companyProfile);

    if (this.editData && this.editData.productFlags) {
      Object.keys(this.editData.productFlags).map(item => {
        if (this.editData.productFlags[item]) {
          this.editProcessInTrackedProduct = true;
        }
      });
    }
  }

  ngOnInit(): void {
    this.setAllLookups();

    this.regKitForAllRequestedType.valueChanges.subscribe(x => {
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

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'lookupForProductsKitIds'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.lookupForProductIdsInputForChildComponents = res.payload;
    });
  }

  ngAfterViewInit() {
    this._subscribeToClosingActions('productColor', this.filteredOptionsForProductColor);
    this._subscribeToClosingActions('licenseHolder', this.filteredOptionsForLicenseHolder);
    this._subscribeToClosingActions('countryOfLicenseHolder', this.filteredOptionsForLicenseHolderCountry);
    this._subscribeToClosingActions('storagePlace', this.filteredOptionsForStoragePlace);
    this._subscribeToClosingActionsForManufacturingFormArray('manufacturingCompany', this.filteredOptionsForManufacturingCompany);
    this._subscribeToClosingActionsForManufacturingFormArray('manufacturingCountry', this.filteredOptionsForManufacturingCountry);
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  // Functions for Short name array
  get ShortName(): FormArray {
    return this.regKitForAllRequestedType.get('shortNameTable') as FormArray;
  }

  addShortName() {
    this.addShortNameFieldStatus = false;
    if (this.ShortName.length < 10) {
      this.ShortName.push(this.fb.group({
        id: null,
        APPWORKS_ID: null,
        APPWORKS_GUID: null,
        shortName: this.legacyStatus ? this.fb.control('', Validators.pattern('^(?:\\b\\w\\S+\\b[\\s][^\u0621-\u064A]|[\\b\\w\\s\\!\\"\\#\\$\\%\\&\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\>\\=\\?\\@\\[\\]\\{\\}\\\\\\\\\\^\\_\\`\\~])*$')) : this.fb.control('', [Validators.required, Validators.pattern('^(?:\\b\\w\\S+\\b[\\s][^\u0621-\u064A]|[\\b\\w\\s\\!\\"\\#\\$\\%\\&\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\>\\=\\?\\@\\[\\]\\{\\}\\\\\\\\\\^\\_\\`\\~])*$')]),
        accepted: false
      }));
    } else {
      this.addShortNameFieldStatus = true;

      setTimeout(() => {
        this.addShortNameFieldStatus = false;
      }, 1500);
    }
  }

  removeShortName(i: number) {
    if (this.ShortName.value.length > 1) {
      this.removeShortNameFieldStatus = false;

      this.deletedShortNameList.push(this.ShortName.value[i].id);
      this.regKitForAllRequestedType.get('deletedShortNameids').patchValue(this.deletedShortNameList);

      this.ShortName.removeAt(i);
    } else {
      this.removeShortNameFieldStatus = true;

      setTimeout(() => {
        this.removeShortNameFieldStatus = false;
      }, 1500);
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

  // Function for File
  onFileSelect(event, fileControlName) {
    let cardImageBase64;
    let resForSetAttachment;
    let attachmentValue;

    if (this.attachmentFieldsForKits.filter(x => x.loadingStatus === true).length === 0) {
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'application/pdf' && event.target.files[0].size <= 2000000) {
          this.attachmentFieldsForKits.filter(x => x.id === fileControlName).map(y => {
            y.fileName = event.target.value.split(/(\\|\/)/g).pop();
            attachmentValue = y.fileValue;
          });

          this.attachmentFieldsForKits.filter(x => x.id === fileControlName).map(file => {
            file.attachmentTypeStatus = 'Yes';
            this.isLoadingStatus.emit(true);
          });
          this.fileStructure = event.target.files[0];
          const reader = new FileReader();

          reader.readAsDataURL(this.fileStructure);
          reader.onload = (res: any) => {
            if (this.variationFieldsStatus) {
              if (this.editData.isVariationSaved === false) {
                this.handleError('Please save the request first');

                const newAttachmentObject = {
                  ...this.editData,
                  ...this.regKitForAllRequestedType.value,
                };
                this.editData ? this.getFormAsStarting(newAttachmentObject, 'errorOfAttachment') : null;
                // this.saveProductForAttachmentVariation(fileControlName, this.fileStructure.name, 0, res.target.result, attachmentValue);
              } else {
                this.setAttachmentFileFunction(this.regKitForAllRequestedType.value.id, fileControlName, this.fileStructure.name, 0, res.target.result, attachmentValue);
              }
            } else if (this.reRegistrationStatus) {
              if (!this.regKitForAllRequestedType.value.id) {
                this.handleError('Please save the request first');
                const newAttachmentObject = {
                  ...this.editData,
                  ...this.regKitForAllRequestedType.value,
                };
                this.editData ? this.getFormAsStarting(newAttachmentObject, 'errorOfAttachment') : null;
                // this.saveProductForAttachmentReNotification(fileControlName, this.fileStructure.name, 0, res.target.result, attachmentValue);
              } else {
                this.setAttachmentFileFunction(this.regKitForAllRequestedType.value.id, fileControlName, this.fileStructure.name, 0, res.target.result, attachmentValue);
              }
            } else {
              if (!this.regKitForAllRequestedType.value.id) {
                this.handleError('Please save the request first');
                const newAttachmentObject = {
                  ...this.editData,
                  ...this.regKitForAllRequestedType.value,
                };
                this.editData ? this.getFormAsStarting(newAttachmentObject, 'errorOfAttachment') : null;
                // this.saveProductForAttachment(fileControlName, this.fileStructure.name, 0, res.target.result, attachmentValue);
              } else {
                this.setAttachmentFileFunction(this.regKitForAllRequestedType.value.id, fileControlName, this.fileStructure.name, 0, res.target.result, attachmentValue);
              }
            }
          };

        } else {
          this.attachmentFieldsForKits.filter(x => x.id === fileControlName).map(file => {
            file.attachmentTypeStatus = 'No';
            file.loadingStatus = false;
            this.isLoadingStatus.emit(false);
          });
        }
      }
    }
  }

  removeManufacturingRows(i) {
    this.regKitForAllRequestedType.get('manufacturingTable').value.splice(i, 1);

    this.manufacturingListTable.tableBody = [];
    this.regKitForAllRequestedType.get('manufacturingTable').value.map((x, i) => {
      this.manufacturingListTable.tableBody = [...this.manufacturingListTable.tableBody, x];
    });
  }

  deletedManufacturingIdsList(event) {
    this.deletedManufacturingList = event;
    this.regKitForAllRequestedType.get('deletedManufacturinglstIds').patchValue(event);
  }

  editTheManufacturingRows(event) {
    this.editManufacturingRowStatus = true;
    this.editManufacturingIndex = event;
    const editRowData = this.regKitForAllRequestedType.get('manufacturingTable').value[event];

    this.regManufacturingForProduct.patchValue({
      ...editRowData
    });

    this.openModal(this.modalManufacturingTemplate);
    this.rerenderSubscribtionForClosingActionForManufacturingForm();
  }

  removeProductsGroupRows(index) {
    this.regKitForAllRequestedType.get('ProductsForKit').value.splice(index, 1);
    this.allProductsInKit.tableBody.splice(index, 1);
  }

  deletedProductsIdsList(index) {
    this.deletedProductIdLists.push(this.regKitForAllRequestedType.get('ProductsForKit').value[index].productDetails.id);
    this.regKitForAllRequestedType.get('deletedProductIdLists').patchValue(this.deletedProductIdLists);
  }

  saveData() {
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);

    const newObjectForData = {
      ...this.editData,
      ...data,
      ...this.objectForListOfVariationGroup
    };

    this.saveDataOutput.emit(newObjectForData);
  }

  onSubmit() {
    let newObjectForData;
    this.attachmentRequiredStatus = true;
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);

    newObjectForData = {
      ...this.editData,
      ...data,
      ...this.objectForListOfVariationGroup
    };

    if (this.regKitForAllRequestedType.valid && this.allProductsInKit.tableBody.length > 0 && this.regKitForAllRequestedType.get('manufacturingTable').value.length > 0) {
      this.submitDataOutput.emit(newObjectForData);
    } else {
      this.handleError('please complete the required values which marked with *');
      this.getFormAsStarting(newObjectForData, 'errorOfSubmit');
    }
  }

  saveProductForAttachment(fileId, fileName, id, base64Data, fileValue) {
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);
    const allDataForSave = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, data.id, data);

    this.attachmentFieldsForKits.filter(x => x.id === fileId).map(y => {
      y.loadingStatus = true;
    });

    const newObjectData = {
      ...this.editData,
      ...allDataForSave
    };

    this.getServices.createProductRequest(newObjectData).subscribe((res: any) => {

      this.editData = res;
      this.getFormAsStarting(res, '');
      this.saveDataOutputForAttachment.emit(res.id);
      this.regKitForAllRequestedType.patchValue({
        id: res.id
      });

      this.requestId = res.id;
      return this.setAttachmentFileFunction(this.requestId, fileId, fileName, id, base64Data, fileValue);
    }, error => {
      this.attachmentFieldsForKits.filter(x => x.id === fileId).map(file => {
        file.fileName = '';
        file.fileValue = '';
        file.loadingStatus = false;
      });

      this.handleError(error);
    });
  }

  saveProductForAttachmentVariation(fileId, fileName, id, base64Data, fileValue) {
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);
    const allDataForSave = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, data.id, data);

    this.attachmentFieldsForKits.filter(x => x.id === fileId).map(y => {
      y.loadingStatus = true;
    });

    const newObject = {
      ...this.editData,
      ...allDataForSave,
      isDraft: 1,
      LKUP_REQ_TYPE_ID: this.whichVariation === 'do_tell_variation' ? 4 : 3,
      ...this.objectForListOfVariationGroup
    };

    this.getServices.setVariationProduct(newObject).subscribe((res: any) => {
      this.editData = res;
      this.getFormAsStarting(res, '');
      this.regKitForAllRequestedType.patchValue({
        id: res.id
      });

      this.requestId = res.id;
      return this.setAttachmentFileFunction(this.requestId, fileId, fileName, id, base64Data, fileValue);
    }, error => {
      this.attachmentFieldsForKits.filter(x => x.id === fileId).map(file => {
        file.fileName === '';
        file.fileValue === '';
        file.loadingStatus = false;
      });

      this.handleError(error);
    });
  }

  saveProductForAttachmentReNotification(fileId, fileName, id, base64Data, fileValue) {
    const data = this.convertAllNamingToId(this.regKitForAllRequestedType.value);
    const allDataForSave = convertToSpecialObject('save', this.selectedFormType, this.selectedRequestedType, this.selectedIsExport, this.selectedTrackType, data.id, data);

    this.attachmentFieldsForKits.filter(x => x.id === fileId).map(y => {
      y.loadingStatus = true;
    });

    const newObjectData = {
      ...this.editData,
      ...allDataForSave
    };

    this.getServices.setReRegistrationProduct(newObjectData).subscribe((res: any) => {

      this.editData = res;
      this.getFormAsStarting(res, '');
      this.saveDataOutputForAttachment.emit(res.id);
      this.regKitForAllRequestedType.patchValue({
        id: res.id
      });

      this.requestId = res.id;
      return this.setAttachmentFileFunction(this.requestId, fileId, fileName, id, base64Data, fileValue);
    }, error => {
      this.attachmentFieldsForKits.filter(x => x.id === fileId).map(file => {

        file.fileName = '';
        file.fileValue = '';
        file.loadingStatus = false;
      });

      this.handleError(error);
    });
  }

  checkControllerValueWithListForManufacturingArray(list, formControlKey, formControlValue) {
    let value;

    if (list.filter(option => option.NAME === formControlValue).length > 0) {
      list.filter(option => option.NAME === formControlValue).map(x => {
        value = x.NAME;
      });
    } else {
      this.regManufacturingForProduct.get(formControlKey).patchValue('');
      value = '';
    }
    return value;
  }

  onSubmitForManufacturingForm() {
    const data = this.regManufacturingForProduct.value;

    data.manufacturingCompany = this.checkControllerValueWithListForManufacturingArray(this.formData.manufacturingCompanyList, 'manufacturingCompany', data.manufacturingCompany);
    data.manufacturingCountry = this.checkControllerValueWithListForManufacturingArray(this.formData.manufacturingCountryList, 'manufacturingCountry', data.manufacturingCountry);

    if (this.regManufacturingForProduct.valid) {
      if (!this.editManufacturingIndex && this.editManufacturingIndex !== 0) {
        this.regKitForAllRequestedType.value.manufacturingTable.push({...this.regManufacturingForProduct.value});
      } else {
        this.regKitForAllRequestedType.get('manufacturingTable').value[this.editManufacturingIndex] = {
          ...this.regKitForAllRequestedType.get('manufacturingTable').value[this.editManufacturingIndex],
          ...this.regManufacturingForProduct.value
        };
        this.editManufacturingRowStatus = false;
        this.editManufacturingIndex = '';
      }

      this.modalRef.hide();

      this.manufacturingListTable.tableBody = this.regKitForAllRequestedType.get('manufacturingTable').value;

      this.getManufacturingFormAsStarting('');
    } else {
      this.errorMessage.emit('true');
    }
  }

  setAttachmentFileFunction(requestId, FileID, FileName, id, base64Data, fileValue) {
    const dataForRequest = this.convertDataForAttachmentRequestBody(requestId, FileID, FileName, id, base64Data, fileValue);

    this.attachmentFieldsForKits.filter(x => x.id === FileID).map(y => {
      y.loadingStatus = true;
    });

    this.getServices.setAttachmentFile(dataForRequest).subscribe((res: any) => {
      this.attachmentFieldsForKits.filter(x => x.id === FileID).map(y => {
        y.fileValue = res.ID;
        y.loadingStatus = false;
        this.isLoadingStatus.emit(false);
        this.regKitForAllRequestedType.get(FileID).setValue(res.ID);
      });

      return res;
    }, error => {
      this.errorForAttachemntRequest.emit(error);
      this.isLoadingStatus.emit(false);
    });
  }

  getFormAsStarting(data, fromWhere) {
    if (data) {
      this.setAllLookups();
      this.isDraft = data.isDraft === 1;
      this.requestIsDraft.emit(data.isDraft === 1);

      if (!fromWhere) {
        data.shortNameTable ? data.shortNameTable.map((X, i) => {
          if (data.shortNameTable.length > 1 && i < data.shortNameTable.length - 1) {
            this.addShortName();
          }
        }) : data.shortNameTable = [];
      }

      this.allProductsInKit.tableBody = [];
      data.ProductsForKit && data.ProductsForKit.length > 0 ? data.ProductsForKit.map((product, i) => {
        this.formData.productColorList.filter(item => item.ID === product.productDetails.productColor).map(x => product.productDetails.productColor = x.NAME);
        this.formData.manufacturingCompanyList.filter(item => item.ID === product.productDetails.manufacturingCompany).map(x => product.productDetails.manufacturingCompany = x.NAME);
        this.formData.manufacturingCountryList.filter(item => item.ID === product.productDetails.manufacturingCountry).map(x => product.productDetails.manufacturingCountry = x.NAME);
        this.formData.applicantList.filter(option => option.ID === product.productDetails.applicant).map(x => product.productDetails.applicant = x.NAME);
        this.formData.licenseHolderList.filter(option => option.ID === product.productDetails.licenseHolder).map(x => product.productDetails.licenseHolder = x.NAME);
        this.formData.licenseHolderCountryList.filter(option => option.ID === product.productDetails.countryOfLicenseHolder).map(x => product.productDetails.countryOfLicenseHolder = x.NAME);
        this.formData.storagePlaceList.filter(option => option.ID === product.productDetails.storagePlace).map(x => product.productDetails.storagePlace = x.NAME);
        this.formData.physicalStateList.filter(option => option.ID === product.productDetails.physicalState).map(x => product.productDetails.physicalState = x.NAME);
        this.formData.purposeOfUseList.filter(option => option.ID === product.productDetails.purposeOfUse).map(x => product.productDetails.purposeOfUse = x.NAME);

        product.productDetails.packagingTable ? product.productDetails.packagingTable.map(x => {
          this.formData.unitOfMeasureList.filter(option => option.ID === x.unitOfMeasure).map(item => x.unitOfMeasure = item.NAME);
          this.formData.typeOfPackagingList.filter(option => option.ID === x.typeOfPackaging).map(item => x.typeOfPackaging = item.NAME);
        }) : null;
        product.productDetails.detailsTable ? product.productDetails.detailsTable.map(x => {
          x.ingrediantDetails.map(y => {
            this.formData.ingrediantList.filter(option => option.ID === y.ingrediant).map(item => y.ingrediant = item.NAME);
            this.formData.functionList.filter(option => option.ID === y.function).map(item => y.function = item.NAME);
          });
        }) : null;

        this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, product.productDetails];
      }) : null;

      this.formData.productColorList.filter(item => item.ID === data.productColor).map(x => data.productColor = x.NAME);
      this.formData.manufacturingCompanyList.filter(item => item.ID === data.manufacturingCompany).map(x => data.manufacturingCompany = x.NAME);
      this.formData.manufacturingCountryList.filter(item => item.ID === data.manufacturingCountry).map(x => data.manufacturingCountry = x.NAME);
      this.formData.applicantList.filter(option => option.ID === data.applicant).map(x => data.applicant = x.NAME);
      this.formData.licenseHolderList.filter(option => option.ID === data.licenseHolder).map(x => data.licenseHolder = x.NAME);
      this.formData.licenseHolderCountryList.filter(option => option.ID === data.countryOfLicenseHolder).map(x => data.countryOfLicenseHolder = x.NAME);
      this.formData.storagePlaceList.filter(option => option.ID === data.storagePlace).map(x => data.storagePlace = x.NAME);
      data.manufacturingTable ? data.manufacturingTable.map(x => {
        this.formData.manufacturingCompanyList.filter(item => item.ID === x.manufacturingCompany).map(row => x.manufacturingCompany = row.NAME);
        this.formData.manufacturingCountryList.filter(option => option.ID === x.manufacturingCountry).map(row => x.manufacturingCountry = row.NAME);
      }) : null;

      this.regKitForAllRequestedType.valueChanges.subscribe(x => {
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

      this.productFlags = data.productFlags;
      this.productComments = data.productComments;

      data.productAttachments ? data.productAttachments.map(file => {
        this.attachmentFieldsForKits.filter(fileID => fileID.id === file.attachmentName).map(y => {
          y.fileName = file.attachmentFileName;
          y.fileValue = file.Id;
        });
      }) : null;

      setTimeout(() => {
        this.manufacturingListTable.tableBody = [];
        data.manufacturingTable ? data.manufacturingTable.map((x, i) => {
          this.manufacturingListTable.tableBody = [...this.manufacturingListTable.tableBody, x];
        }) : null;
      }, 500);


      // if (this.canEditForApprovedProduct) {
      //   data.receiptValue = '';
      //   data.receiptNumber = '';
      //   data.receipt = '';
      //   this.attachmentFieldsForKits.filter(fileID => fileID.id === 'receipt').map(y => {
      //     y.fileName = '';
      //     y.fileValue = '';
      //   });
      // }

      this.regKitForAllRequestedType.patchValue({
        ...data
      });

      data.productAttachments.map((x, i) => {
        this.regKitForAllRequestedType.get(`${x.attachmentName}`).patchValue(x.Id);
      });

      data.receiptValue === 0 ? this.regKitForAllRequestedType.get('receiptValue').patchValue('') : null;

      // data.receiptValue ? this.getDecimalValue(data.receiptValue, 'edit') : null;
    } else {
      this.regKitForAllRequestedType = this.fb.group({
        productColor: this.fb.control(''),
        id: 0,
        productArabicName: this.fb.control('', Validators.pattern('^[\u0621-\u064A]+[ 0-9\u0621-\u064A-_*]*$')),
        productEnglishName: this.fb.control('', [Validators.required, Validators.pattern('^(?:\\b\\w+\\b[^.\\s]|[^\u0621-\u064A]|[\\b\\w\\s])*$')]),
        shortNameTable: this.fb.array([this.fb.group({
          id: null,
          APPWORKS_ID: null,
          APPWORKS_GUID: null,
          shortName: this.legacyStatus ? this.fb.control('', Validators.pattern('^(?:\\b\\w\\S+\\b[\\s][^\u0621-\u064A]|[\\b\\w\\s\\!\\"\\#\\$\\%\\&\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\>\\=\\?\\@\\[\\]\\{\\}\\\\\\\\\\^\\_\\`\\~])*$')) : this.fb.control('', [Validators.required, Validators.pattern('^(?:\\b\\w\\S+\\b[\\s][^\u0621-\u064A]|[\\b\\w\\s\\!\\"\\#\\$\\%\\&\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\>\\=\\?\\@\\[\\]\\{\\}\\\\\\\\\\^\\_\\`\\~])*$')]),
          accepted: false
        })]),
        applicant: this.fb.control('', Validators.required),
        licenseHolder: this.fb.control('', Validators.required),
        licenseHolderTxt: this.fb.control(''),
        countryOfLicenseHolder: this.fb.control('', Validators.required),
        tradeMark: this.fb.control(''),
        shelfLife: this.fb.control(null, Validators.required),
        storagePlace: this.fb.control('', this.selectedRequestedType === 3 || this.selectedRequestedType === 4 || this.selectedRequestedType === 7 || this.selectedRequestedType === 8 || this.selectedRequestedType === 9 ? Validators.required : null),
        receiptNumber: !this.legacyStatus ? this.fb.control('', Validators.required) : this.fb.control(''),
        receiptValue: !this.legacyStatus ? this.fb.control('', [Validators.required, Validators.pattern('^(\\d{1,3}(,\\d{3})|\\d)*(\\.\\d+)?$')]) : this.fb.control(''),
        manufacturingTable: this.fb.control([]),
        deletedManufacturinglstIds: this.fb.control(null),
        deletedShortNameids: this.fb.control([]),
        ProductsForKit: this.fb.control([]),
        deletedProductIdLists: this.fb.control(null),
        freeSaleDoc: this.fb.control(''),
        GMP: this.fb.control(''),
        CoA: this.fb.control(''),
        artWork: this.fb.control('', Validators.required),
        leaflet: this.fb.control(''),
        reference: this.fb.control(''),
        methodOfAnalysis: this.fb.control(''),
        specificationsOfFinishedProduct: this.fb.control('', Validators.required),
        receipt: !this.legacyStatus ? this.fb.control('', Validators.required) : this.fb.control(''),
        authorizationLetter: this.fb.control('', this.selectedRequestedType === 1 || this.selectedRequestedType === 2 || this.selectedRequestedType === 3 || this.selectedRequestedType === 4 || this.selectedRequestedType === 5 || this.selectedRequestedType === 6 ? Validators.required : null),
        manufacturingContract: this.fb.control('', this.selectedRequestedType === 8 ? Validators.required : null),
        storageContract: this.fb.control(''),
        factoryLicense: this.fb.control(''),
        manufacturingAssignment: this.fb.control(''),
        commercialRecord: this.fb.control(''),
        stabilityStudy: this.fb.control(''),
        shelfLifeAttachment: this.fb.control(''),
        letterOfVariationFromLicenseHolder: this.fb.control(''),
        others: this.fb.control(''),
        otherFees: this.fb.control('', Validators.required)
      });
    }
  }

  getManufacturingFormAsStarting(data) {
    if (data) {

    } else {
      this.regManufacturingForProduct = this.fb.group({
        APPWORKS_GUID: null,
        APPWORKS_ID: null,
        manufacturingID: this.fb.control(''),
        manufacturingCompany: this.fb.control(null, Validators.required),
        manufacturingCountry: this.fb.control('', Validators.required),
      });
    }
  }

  equalTheNewDetailsTable(index) {
    // this.detailsListTable.tableBody = this.regKitForAllRequestedType.get('ProductsForKit')[index]
  }

  editTheDetailsRow(event) {
    this.editDetailedRowStatus = true;
    this.editIndex = event;
  }

  applyProduct(event) {
    event.status = 'Registered';
    if (event.status === 'Registered') {
      this.isLoading = true;
      this.appliedProductStatus = false;
      if (this.allProductsInKit.tableBody.filter(product => product.NotificationNo === event.notificationNumberOrId).length === 0) {
        this.getServices.getProductWithNotificationNumberList(event.notificationNumberOrId, this.selectedFormType === 2 ? 'kit' : 'hairkit').subscribe((res: any) => {
          if (res) {
            if (res.canUse) {
              const objectData = {
                ...res
              };

              this.formData.productColorList.filter(item => item.ID === objectData.productColor).map(x => objectData.productColor = x.NAME);
              this.formData.manufacturingCompanyList.filter(item => item.ID === objectData.manufacturingCompany).map(x => objectData.manufacturingCompany = x.NAME);
              this.formData.manufacturingCountryList.filter(item => item.ID === objectData.manufacturingCountry).map(x => objectData.manufacturingCountry = x.NAME);
              this.formData.applicantList.filter(option => option.ID === objectData.applicant).map(x => objectData.applicant = x.NAME);
              this.formData.licenseHolderList.filter(option => option.ID === objectData.licenseHolder).map(x => objectData.licenseHolder = x.NAME);
              this.formData.licenseHolderCountryList.filter(option => option.ID === objectData.countryOfLicenseHolder).map(x => objectData.countryOfLicenseHolder = x.NAME);
              this.formData.storagePlaceList.filter(option => option.ID === objectData.storagePlace).map(x => objectData.storagePlace = x.NAME);
              this.formData.physicalStateList.filter(option => option.ID === objectData.physicalState).map(x => objectData.physicalState = x.NAME);
              this.formData.purposeOfUseList.filter(option => option.ID === objectData.purposeOfUse).map(x => objectData.purposeOfUse = x.NAME);

              objectData.packagingTable ? objectData.packagingTable.map(x => {
                this.formData.unitOfMeasureList.filter(option => option.ID === x.unitOfMeasure).map(item => x.unitOfMeasure = item.NAME);
                this.formData.typeOfPackagingList.filter(option => option.ID === x.typeOfPackaging).map(item => x.typeOfPackaging = item.NAME);
              }) : null;
              objectData.detailsTable ? objectData.detailsTable.map(x => {
                x.ingrediantDetails.map(y => {
                  this.formData.ingrediantList.filter(option => option.ID === y.ingrediant).map(item => y.ingrediant = item.NAME);
                  this.formData.functionList.filter(option => option.ID === y.function).map(item => y.function = item.NAME);
                });
              }) : null;

              this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, objectData];


              const resObject = {
                productStatus: event.status,
                NotificationNo: event.status === 'Registered' ? event.notificationNumberOrId : '',
                productID: event.status === 'New' ? event.notificationNumberOrId : '',
                productDetails: res
              };


              this.regKitForAllRequestedType.get('ProductsForKit').value.push(resObject);


            } else {
              this.handleError(res.canuseMsg);
            }
          }
          this.isLoading = false;
          this.appliedProductStatus = true;
        }, error => this.handleError(error));
      } else {
        this.handleError('This product already added to this kit');
      }
    } else if (event.status === 'New') {
      this.isLoading = true;
      this.appliedProductStatus = false;

      if (this.allProductsInKit.tableBody.filter(product => product.id === event.notificationNumberOrId).length === 0) {
        this.getServices.getProductWithProductIDList(event.notificationNumberOrId, 'kit').subscribe((res: any) => {
          if (res) {
            if (res.canUse) {
              const objectData = {
                ...res
              };

              this.formData.productColorList.filter(item => item.ID === objectData.productColor).map(x => objectData.productColor = x.NAME);
              this.formData.manufacturingCompanyList.filter(item => item.ID === objectData.manufacturingCompany).map(x => objectData.manufacturingCompany = x.NAME);
              this.formData.manufacturingCountryList.filter(item => item.ID === objectData.manufacturingCountry).map(x => objectData.manufacturingCountry = x.NAME);
              this.formData.applicantList.filter(option => option.ID === objectData.applicant).map(x => objectData.applicant = x.NAME);
              this.formData.licenseHolderList.filter(option => option.ID === objectData.licenseHolder).map(x => objectData.licenseHolder = x.NAME);
              this.formData.licenseHolderCountryList.filter(option => option.ID === objectData.countryOfLicenseHolder).map(x => objectData.countryOfLicenseHolder = x.NAME);
              this.formData.storagePlaceList.filter(option => option.ID === objectData.storagePlace).map(x => objectData.storagePlace = x.NAME);
              this.formData.physicalStateList.filter(option => option.ID === objectData.physicalState).map(x => objectData.physicalState = x.NAME);
              this.formData.purposeOfUseList.filter(option => option.ID === objectData.purposeOfUse).map(x => objectData.purposeOfUse = x.NAME);

              objectData.packagingTable ? objectData.packagingTable.map(x => {
                this.formData.unitOfMeasureList.filter(option => option.ID === x.unitOfMeasure).map(item => x.unitOfMeasure = item.NAME);
                this.formData.typeOfPackagingList.filter(option => option.ID === x.typeOfPackaging).map(item => x.typeOfPackaging = item.NAME);
              }) : null;
              objectData.detailsTable ? objectData.detailsTable.map(x => {
                x.ingrediantDetails.map(y => {
                  this.formData.ingrediantList.filter(option => option.ID === y.ingrediant).map(item => y.ingrediant = item.NAME);
                  this.formData.functionList.filter(option => option.ID === y.function).map(item => y.function = item.NAME);
                });
              }) : null;

              this.allProductsInKit.tableBody = [...this.allProductsInKit.tableBody, objectData];


              const resObject = {
                productStatus: event.status,
                NotificationNo: event.status === 'Registered' ? event.notificationNumberOrId : '',
                productID: event.status === 'New' ? event.notificationNumberOrId : '',
                productDetails: res
              };


              this.regKitForAllRequestedType.get('ProductsForKit').value.push(resObject);

              this.isLoading = false;
              this.appliedProductStatus = true;
            } else {
              this.handleError(res.canuseMsg);
            }
          }
        }, error => this.handleError(error));
      } else {
        this.handleError('This product already added to this kit');
      }
    }
  }

  getProductTypeFromNewProductInKit(event) {
    this.selectedRegisteredProductTypeForProduct = event;
  }

  convertDataForAttachmentRequestBody(requestId, FileID, FileName, id, base64Data, fileValue) {
    return {
      RequestId: this.regKitForAllRequestedType.value.id ? this.regKitForAllRequestedType.value.id : this.requestId,
      AttachmentName: FileID,
      AttachmentFileName: FileName,
      base64Data: base64Data,
      ID: fileValue ? fileValue : id
    };
  }

  downloadFile(FileName) {
    this.getServices.getAttachmentFileByID(this.regKitForAllRequestedType.value.id, FileName).subscribe((res: any) => {
      this.convertFilesToPDF(res.base64Data, FileName);
    });
  }

  convertFilesToPDF(base64Data, fileName) {
    let obj = document.createElement('object');
    obj.style.width = '100%';
    obj.style.height = '842pt';
    obj.type = 'application/pdf';
    obj.data = 'data:application/pdf;base64,' + base64Data;

    var link = document.createElement('a');
    link.innerHTML = 'Download PDF file';
    link.download = `${fileName}`;
    link.className = 'pdfLink';
    link.href = 'data:application/pdf;base64,' + base64Data;

    link.click();
  }

  getDecimalValue(value, fromWhere) {
    this.regKitForAllRequestedType.patchValue({
      receiptValue: this.number.transform(this.regKitForAllRequestedType.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
  }

  resetForms() {
    this.getFormAsStarting('', '');
  }

  getDisabledValues() {
    let variaionGroupCodeList = [];
    let variaionGroupFieldsCodeList = [];
    if (this.variationFields && this.variationFields.length > 0) {
      this.enableEditableFields = [];
      this.variationFields.map(x => {
        this.enableEditableFields = [...this.enableEditableFields, ...x.VARIATION_GROUP_FieldsDto.map(x => x.CODE)];

        variaionGroupCodeList = [...variaionGroupCodeList, x.Code];
        variaionGroupFieldsCodeList = [...variaionGroupFieldsCodeList, ...x.VARIATION_GROUP_FieldsDto.map(x => x.CODE)];

        this.objectForListOfVariationGroup = {
          variationGroups: variaionGroupCodeList,
          variationFields: variaionGroupFieldsCodeList,
        };
      });
    }
  }

  filterLookupsFunction(whichLookup, formControlValue, list, index?: any) {
    if (formControlValue) {
      return formControlValue.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterInsideList(whichLookup, state, list) : list.slice())
        );
    }
  }

  filterInsideList(lookup, value, list, index?: any): LookupState[] {
    let filterValue;
    if (value) {
      filterValue = value.toLowerCase();
    }

    return list.filter(option => option.NAME.toLowerCase().includes(filterValue)).map(x => x);
  }

  convertAllNamingToId(data) {
    data.productColor = this.checkControllerValueWithList(this.formData.productColorList, 'productColor', data.productColor);
    data.applicant = this.checkControllerValueWithList(this.formData.applicantList, 'applicant', data.applicant);
    data.licenseHolder = this.checkControllerValueWithList(this.formData.licenseHolderList, 'licenseHolder', data.licenseHolder);
    data.countryOfLicenseHolder = this.checkControllerValueWithList(this.formData.licenseHolderCountryList, 'countryOfLicenseHolder', data.countryOfLicenseHolder);
    data.storagePlace = this.checkControllerValueWithList(this.formData.storagePlaceList, 'storagePlace', data.storagePlace);

    data.manufacturingTable.map(x => {
      this.formData.manufacturingCompanyList.filter(option => option.NAME === x.manufacturingCompany).map(item => x.manufacturingCompany = item.ID);
      this.formData.manufacturingCountryList.filter(option => option.NAME === x.manufacturingCountry).map(item => x.manufacturingCountry = item.ID);
    });

    return data;
  }

  checkControllerValueWithList(list, formControlKey, formControlValue) {
    let value;
    if (list.filter(option => option.NAME === formControlValue).length > 0) {
      list.filter(option => option.NAME === formControlValue).map(x => {
        value = x.ID;
      });
    } else {
      this.regKitForAllRequestedType.get(formControlKey).patchValue('');
      value = '';
    }
    return value;
  }

  setApplicant(companyProfileID) {
    this.formData.applicantList.filter(option => option.ID === companyProfileID).map(x => this.regKitForAllRequestedType.patchValue({
      applicant: x.NAME
    }));
  }

  setShelfValue(event) {
    if (Number(event.target.value) > 60) {
      this.regKitForAllRequestedType.get('shelfLife').patchValue(60);
    } else {
      this.regKitForAllRequestedType.get('shelfLife').patchValue(Number(event.target.value));
    }
  }

  // @ts-ignore
  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoadingStatus.emit(false);
    this.isLoading = false;
    this.appliedProductStatus = false;
  }

  setAllLookups() {
    this.filteredOptionsForProductColor = this.filterLookupsFunction('productColor', this.regKitForAllRequestedType.get('productColor'), this.formData.productColorList);
    this.filteredOptionsForLicenseHolder = this.filterLookupsFunction('licenseHolder', this.regKitForAllRequestedType.get('licenseHolder'), this.formData.licenseHolderList);
    this.filteredOptionsForLicenseHolderCountry = this.filterLookupsFunction('countryOfLicenseHolder', this.regKitForAllRequestedType.get('countryOfLicenseHolder'), this.formData.licenseHolderCountryList);
    this.filteredOptionsForStoragePlace = this.filterLookupsFunction('storagePlace', this.regKitForAllRequestedType.get('storagePlace'), this.formData.storagePlaceList);
    this.filteredOptionsForManufacturingCompany = this.filterLookupsFunction('manufacturingCompany', this.regKitForAllRequestedType.get('manufacturingCompany'), this.formData.manufacturingCompanyList);
    this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction('manufacturingCountry', this.regKitForAllRequestedType.get('manufacturingCountry'), this.formData.manufacturingCountryList);
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
        if (this.regKitForAllRequestedType.controls[field].dirty) {
          this.regKitForAllRequestedType.controls[field].setValue(null);
        }
      }
    });
  }

  private _subscribeToClosingActionsForManufacturingFormArray(field, list): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    list ? list.subscribe(x => {
      if (x.length === 0) {
        if (this.regManufacturingForProduct.controls[field].dirty) {
          this.regManufacturingForProduct.controls[field].setValue(null);
        }
      }
    }) : null;
  }

  rerenderSubscribtionForClosingActionForManufacturingForm() {
    this.filteredOptionsForManufacturingCompany = this.filterLookupsFunction('manufacturingCompany', this.regManufacturingForProduct.get('manufacturingCompany'), this.formData.manufacturingCompanyList);
    this.filteredOptionsForManufacturingCountry = this.filterLookupsFunction('manufacturingCountry', this.regManufacturingForProduct.get('manufacturingCountry'), this.formData.manufacturingCountryList);

    this._subscribeToClosingActionsForManufacturingFormArray('manufacturingCompany', this.filteredOptionsForManufacturingCompany);
    this._subscribeToClosingActionsForManufacturingFormArray('manufacturingCountry', this.filteredOptionsForManufacturingCountry);
  }

  // private _subscribeToClosingActionsForKitProducts(field, list): void {
  //   if (this.subscription && !this.subscription.closed) {
  //     this.subscription.unsubscribe();
  //   }
  //   list ? list.subscribe(y => {
  //     if (y.length === 0) {
  //       this.ProductGroupsRows().controls.map((x) => {
  //         if (x['controls'][field].dirty) {
  //           x['controls'][field].setValue(null);
  //         }
  //       });
  //     }
  //   }) : null;
  // }

  checkValue(formControl, list, form) {
    if (list.filter(x => x.NAME === form.get(formControl).value).length === 0) {
      form.get(formControl).setValue(null);
    }
  }

  rerenderFileAttachmentList() {
    this.attachmentFieldsForKits = [
      {
        id: 'freeSaleDoc',
        name: 'Free Sale',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'GMP',
        name: 'GMP',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'CoA',
        name: 'CoA',
        fileName: '',
        fileValue: '',
        required: this.selectedRequestedType === 1 && this.selectedRequestedType === 2 ? true : false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'artWork',
        name: 'Art Work For The Kit',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'leaflet',
        name: 'leaflet',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'reference',
        name: 'reference',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'methodOfAnalysis',
        name: 'Method of Analysis',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'specificationsOfFinishedProduct',
        name: 'Specifications of Finished Product',
        fileName: '',
        fileValue: '',
        required: !this.legacyStatus ? true : false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'receipt',
        name: 'receipt',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'authorizationLetter',
        name: 'Authorization Letter',
        fileName: '',
        fileValue: '',
        required: this.selectedRequestedType !== 7 && this.selectedRequestedType !== 8 && this.selectedRequestedType !== 9 ? true : false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'manufacturingContract',
        name: 'Manufacturing Contract',
        fileName: '',
        fileValue: '',
        required: this.selectedRequestedType === 8 ? true : false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'storageContract',
        name: 'Storage Contract',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'others',
        name: 'others',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'otherFees',
        name: 'otherFees',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'factoryLicense',
        name: 'Factory license',
        fileName: '',
        fileValue: '',
        required: false,
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'manufacturingAssignment',
        name: 'Manufacturing Assignment',
        fileName: '',
        required: false,
        fileValue: '',
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'commercialRecord',
        name: 'Commercial Record',
        fileName: '',
        required: false,
        fileValue: '',
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'stabilityStudy',
        name: 'Stability study',
        fileName: '',
        required: false,
        fileValue: '',
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'shelfLifeAttachment',
        name: 'Shelf life',
        fileName: '',
        required: false,
        fileValue: '',
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'letterOfVariationFromLicenseHolder',
        name: 'letter of variation from license holder',
        fileName: '',
        required: false,
        fileValue: '',
        enable: this.variationFieldsStatus ? true : false,
        attachmentTypeStatus: '',
        loadingStatus: false,
      }
    ];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  closeManufacturingModal() {
    this.getManufacturingFormAsStarting('');
    this.modalRef.hide();
    this.editManufacturingRowStatus = false;
  }
}
