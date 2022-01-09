import {Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../services/form.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import {AttachemntObject, LookupState} from '../product-request-form/product-request-form.component';
import {Observable, Subscription} from 'rxjs';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {convertToSpecialObject} from '../../utils/formDataFunction';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {InputService} from '../services/input.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-custom-release',
  templateUrl: './custom-release.component.html',
  styleUrls: ['./custom-release.component.css']
})
export class CustomReleaseComponent implements OnInit {

  isLoading: boolean = false;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  @ViewChildren(MatAutocompleteTrigger) triggerCollection: QueryList<MatAutocompleteTrigger>;
  modalRef: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-xl packagingModal',
  };
  @ViewChild('successSubmissionModal') modalDetailedTemplate: TemplateRef<any>;
  dataInAnyError: any;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('invoicesTabs', {static: false}) invoicesTabs: TabsetComponent;
  @ViewChild('itemsStepsTabs', {static: false}) itemsStepsTabs: TabsetComponent;
  activeTabIndex;
  regCustomReleaseForm: FormGroup;
  regInvoicesForm: FormGroup;
  regItemsForm: FormGroup;
  filteredOptionsForRequestedReleaseType: Observable<LookupState[]>;
  filteredOptionsForCustomPortName: Observable<LookupState[]>;
  filteredOptionsForMeasureUnitList: Observable<LookupState[]>;
  filteredOptionsForCountryOfOrigin: Observable<LookupState[]>;
  filteredOptionsForCurrency: Observable<LookupState[]>;
  filteredOptionsForManufacturingCompany: Observable<LookupState[]>;
  filteredOptionsForManufacturingCountry: Observable<LookupState[]>;
  filteredOptionsForUOM: Observable<LookupState[]>;
  filteredOptionsForIngredientList: Observable<LookupState[]>;
  filteredOptionsForFunctionList: Observable<LookupState[]>;
  formData = null;
  attachmentFields: AttachemntObject[] = [
    {
      id: 'bolPolicy',
      name: 'BOL',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'packingList',
      name: 'Packing List',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'receipt',
      name: 'Receipt',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'exportPledge',
      name: 'Export Pledge',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'importersRecord',
      name: 'Importers Record',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
  ];
  InvoiceAttachmentFields: AttachemntObject[] = [
    {
      id: 'invoice',
      name: 'Invoice',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    }
  ];
  ItemAttachmentFields: AttachemntObject[] = [];
  fileStructure;
  attachmentRequiredStatus: boolean = false;
  invoiceListTable = {
    tableHeader: ['Invoice no.', 'Invoice Date', 'Invoice Value', 'Country Of Origin', 'Currency', 'Actions'],
    tableBody: []
  };
  itemListTable = {
    tableHeader: ['Item type', 'Import Reason', 'Manufacturing company', 'Quantity', 'Batch No.', 'Actions'],
    tableBody: []
  };
  invoiceContainerDisplayStatus: boolean = false;
  itemContainerDisplayStatus: boolean = false;
  itemType;
  importReason;
  premixField;
  rowMaterialNameField;
  packingItemNameField;
  showNotificationNoStatus: boolean = false;
  notificationNo;
  editItemIndex;
  editItemRowStatus = false;


  allItemTypeAttachmentFields = {
    finishedProduct: [
      {
        id: 'certificateOfOrigin',
        name: 'Certificate Of Origin',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['registeredProduct'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'companyManufactureRelationship',
        name: 'Company Manufacture Relationship',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['registeredProduct'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'legalizedHealthCertificate',
        name: 'legalized Health Certificate',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['registeredProduct'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'coa',
        name: 'COA',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['registeredProduct'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'coc',
        name: 'COC',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['registeredProduct'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
    ],
    premix: [
      {
        id: 'certificateOfOrigin',
        name: 'Certificate Of Origin',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'companyManufactureRelationship',
        name: 'Company Manufacture Relationship',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'materialSafetyDataSheet',
        name: 'Material  Safety Data Sheet',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'sourceOfRawMaterialAttach',
        name: 'Source of raw material',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'legalizedHealthCertificate',
        name: 'legalized Health Certificate',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'declarationOfChemicalTreatment',
        name: 'Declaration of chemical treatment',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'compositionOfPremixColorsFromManufacturer',
        name: 'Composition of premix/Colors from manufacturer',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'coa',
        name: 'COA',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'approvalOfThePublicSecurityAuthority',
        name: 'The approval of the public security authority ',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'delegationForImportation',
        name: 'Delegation for importation (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'supplyOrder',
        name: 'Supply order (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
    ],
    rawMaterials: [
      {
        id: 'certificateOfOrigin',
        name: 'Certificate Of Origin',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'companyManufactureRelationship',
        name: 'Company Manufacture Relationship',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts', 'exportationProducts', 'importers'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'materialSafetyDataSheet',
        name: 'Material  Safety Data Sheet',
        fileName: '',
        fileValue: '',
        required: true,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'sourceOfRawMaterialAttach',
        name: 'Source of raw material',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts', 'exportationProducts', 'importers'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'declarationOfChemicalTreatment',
        name: 'Declaration of chemical treatment',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts', 'exportationProducts', 'importers'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'legalizedHealthCertificate',
        name: 'legalized Health Certificate',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts', 'exportationProducts', 'importers'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'declarationOfFreeOfSalmonella',
        name: 'Declaration free of salmonella',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts', 'exportationProducts', 'importers'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'compositionOfPremixColorsFromManufacturer',
        name: 'Composition of premix/Colors from manufacturer',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'coa',
        name: 'COA',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts', 'exportationProducts', 'importers'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'approvalOfThePublicSecurityAuthority',
        name: 'The approval of the public security authority ',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts', 'exportationProducts', 'importers'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'delegationForImportation',
        name: 'Delegation for importation (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'supplyOrder',
        name: 'Supply order (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
    ],
    packagingMaterial: [
      {
        id: 'certificateOfOrigin',
        name: 'Certificate Of Origin',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'delegationForImportation',
        name: 'Delegation for importation (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'supplyOrder',
        name: 'Supply order (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['localProducts'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
    ],
  };

  constructor(private fb: FormBuilder,
              private number: DecimalPipe,
              private router: Router,
              private readonly route: ActivatedRoute,
              private inputService: InputService,
              private modalService: BsModalService,
              private getService: FormService) {
    this.getFormAsStarting('', '');
    this.getInvoicesFormAsStarting('', '');
    this.getItemsFormAsStarting('', '');
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'allLookups'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.formData = {
        ...res.payload,
        itemTypeList: [
          {
            id: 'finishedProduct',
            name: 'Finished Product'
          },
          {
            id: 'premix',
            name: 'Premix'
          },
          {
            id: 'rawMaterials',
            name: 'Raw materials'
          },
          {
            id: 'packagingMaterial',
            name: 'Packaging Material'
          },
        ],
        importReasonList: {
          finishedProduct: [
            {
              id: 'registeredProduct',
              name: 'Registered product',
              showNotificationNoInput: true,
            },
            {
              id: 'samplesFinishedProduct',
              name: 'Samples finished product',
              showNotificationNoInput: false,
            },
          ],
          premix: [
            {
              id: 'Premix',
              name: 'Premix',
              showNotificationNoInput: true,
            }
          ],
          rawMaterials: [
            {
              id: 'localProducts',
              name: 'Local Products',
              showNotificationNoInput: true,
            },
            {
              id: 'exportationProducts',
              name: 'Exportation Products',
              showNotificationNoInput: true,
            },
            {
              id: 'importers',
              name: 'Importers',
              showNotificationNoInput: false,
            },
            {
              id: 'RDSamples',
              name: 'R&D Samples',
              showNotificationNoInput: false,
            }
          ],
          packagingMaterial: [
            {
              id: 'localProducts',
              name: 'Local Products',
              showNotificationNoInput: true,
            },
            {
              id: 'exportation',
              name: 'Exportation',
              showNotificationNoInput: true,
            },
            {
              id: 'samplesOfPackagingMaterials',
              name: 'Samples of Packaging Materials',
              showNotificationNoInput: false,
            }
          ],
        },
        premixNameList: [
          {
            id: 'localFactory',
            name: 'Local factory'
          },
          {
            id: 'premixBatches',
            name: 'Premix Batches'
          }
        ],
        rawMaterialList: [
          {
            id: 'animal',
            name: 'Animal'
          },
          {
            id: 'vegetable',
            name: 'Vegetable'
          },
          {
            id: 'marain',
            name: 'Marain'
          },
          {
            id: 'chemical',
            name: 'Chemical'
          },
          {
            id: 'wool',
            name: 'Wool'
          }
        ],
        packingMaterialList: [
          {
            id: 'animal',
            name: 'Animal'
          },
          {
            id: 'vegetable',
            name: 'Vegetable'
          },
          {
            id: 'marain',
            name: 'Marain'
          },
          {
            id: 'chemical',
            name: 'Chemical'
          },
          {
            id: 'wool',
            name: 'Wool'
          }
        ],
      };
      this.isLoading = false;
    });

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'CompanyId'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.setApplicant(res.payload);
    });
  }

  nextToNextTab(whichTab) {
    let activeTabIndex;
    whichTab.tabs.filter(x => x.active).map(y => activeTabIndex = whichTab.tabs.indexOf(y));
    activeTabIndex + 1 <= whichTab.tabs.length - 1 ? whichTab.tabs[activeTabIndex + 1].active = true : null;
  }

  backToNextTab(whichTab) {
    let activeTabIndex;
    whichTab.tabs.filter(x => x.active).map(y => activeTabIndex = whichTab.tabs.indexOf(y));
    activeTabIndex >= 0 ? whichTab.tabs[activeTabIndex - 1].active = true : null;
  }

  getTermType(event) {
    if (this.itemType === 'premix') {
      this.importReason = this.formData.importReasonList[this.itemType][0].name;

      this.getTheSelectedValueForImportedReason(this.itemType, {value: this.importReason});
    }
  }

  setApplicant(companyProfileID) {
    this.formData.applicantList.filter(option => option.ID === companyProfileID).map(x => this.regCustomReleaseForm.patchValue({
      applicant: x.NAME
    }));
  }

  onFileSelect(event, fileControlName) {
    let cardImageBase64;
    let resForSetAttachment;
    let attachmentValue;

    if (this.attachmentFields.filter(x => x.loadingStatus === true).length === 0) {
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'application/pdf' && event.target.files[0].size <= 5000000) {
          this.attachmentFields.filter(x => x.id === fileControlName).map(y => {
            y.fileName = event.target.value.split(/(\\|\/)/g).pop();
            attachmentValue = y.fileValue;
          });

          this.attachmentFields.filter(x => x.id === fileControlName).map(file => {
            file.attachmentTypeStatus = 'Yes';
          });
          this.fileStructure = event.target.files[0];
          const reader = new FileReader();

          reader.readAsDataURL(this.fileStructure);
          reader.onload = (res: any) => {
            if (!this.regCustomReleaseForm.value.id) {
              this.handleError('Please save the request first');
              const newAttachmentObject = {
                ...this.regCustomReleaseForm.value,
              };
            } else {
              this.setAttachmentFileFunction(this.regCustomReleaseForm.value.id, fileControlName, this.fileStructure.name, 0, res.target.result, attachmentValue);
            }
          };

        } else {
          this.attachmentFields.filter(x => x.id === fileControlName).map(file => {
            file.attachmentTypeStatus = 'No';
            file.loadingStatus = false;
          });
        }
      }
    }
  }

  setAttachmentFileFunction(requestId, FileID, FileName, id, base64Data, fileValue) {
    const dataForRequest = this.convertDataForAttachmentRequestBody(requestId, FileID, FileName, id, base64Data, fileValue);

    this.attachmentFields.filter(x => x.id === FileID).map(y => {
      y.loadingStatus = true;
    });

    this.getService.setAttachmentFile(dataForRequest).subscribe((res: any) => {
      this.attachmentFields.filter(x => x.id === FileID).map(y => {
        y.fileValue = res.ID;
        y.loadingStatus = false;
        this.regCustomReleaseForm.get(FileID).setValue(res.ID);
      });

      return res;
    }, error => this.handleError(error)); //
  }

  convertDataForAttachmentRequestBody(requestId, FileID, FileName, id, base64Data, fileValue) {
    return {
      RequestId: this.regCustomReleaseForm.value.id,
      AttachmentName: FileID,
      AttachmentFileName: FileName,
      base64Data: base64Data,
      ID: fileValue ? fileValue : id
    };
  }

  downloadFile(FileName) {
    this.getService.getAttachmentFileByID(this.regCustomReleaseForm.value.id, FileName).subscribe((res: any) => {
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

  setShelfValue(event) {
    if (Number(event.target.value) > 500) {
      this.regCustomReleaseForm.get('grossWeight').patchValue(500);
    } else {
      this.regCustomReleaseForm.get('grossWeight').patchValue(Number(event.target.value));
    }
  }

  getDecimalValue(value, fromWhere) {
    this.regCustomReleaseForm.patchValue({
      receiptValue: this.number.transform(this.regCustomReleaseForm.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
  }

  getFormAsStarting(data, fromWhere) {
    if (data) {
    } else {
      this.regCustomReleaseForm = this.fb.group({
        id: 0,
        estimatedValue: 0,
        bol: this.fb.control('', Validators.required),
        withinIncluded: this.fb.control(false),
        requestedReleaseType: this.fb.control('', Validators.required),
        applicant: this.fb.control('', Validators.required),
        customPortName: this.fb.control('', Validators.required),
        pod: this.fb.control(''),
        supplierName: this.fb.control(''),
        supplierCounty: this.fb.control(''),
        carrierName: this.fb.control(''),
        grossWeight: this.fb.control('', Validators.required),
        measureUnit: this.fb.control('', Validators.required),
        receiptNumber: this.fb.control('', Validators.required),
        groupNumber: this.fb.control('', Validators.required),
        receiptValue: this.fb.control('', Validators.required),
        invoiceDetails: [],
        bolPolicy: this.fb.control('', Validators.required),
        packingList: this.fb.control('', Validators.required),
        receipt: this.fb.control('', Validators.required),
        exportPledge: this.fb.control(''),
        importersRecord: this.fb.control(''),
      });
    }
  }

  getInvoicesFormAsStarting(data, fromWhere) {
    if (data) {
    } else {
      this.regInvoicesForm = this.fb.group({
        id: 0,
        invoiceNo: this.fb.control('', Validators.required),
        withinIncluded: this.fb.control(false),
        invoiceValue: this.fb.control('', Validators.required),
        invoiceDate: this.fb.control(null, Validators.required),
        countryOfOrigin: this.fb.control('', Validators.required),
        currency: this.fb.control('', Validators.required),
        itemDetails: [],
        invoice: this.fb.control('', Validators.required),
      });
    }
  }

  getItemsFormAsStarting(data, fromWhere) {
    if (data) {
    } else {
      this.regItemsForm = this.fb.group({
        id: 0,
        itemType: this.fb.control(''),
        importReason: this.fb.control(''),
        NotificationNo: this.fb.control(''),
        shortName: this.fb.control(''),
        ProductEnglishName: this.fb.control('', Validators.required),
        flagType: this.fb.control(''),
        manufacturingCompany: this.fb.control('', Validators.required),
        manufacturingCountry: this.fb.control('', Validators.required),
        batchNo: this.importReason === 'premix' ? this.fb.control('', Validators.required) : this.fb.control(''),
        quantity: this.fb.control('', Validators.required),
        uom: this.fb.control('', Validators.required),
        certificateOfOrigin: this.fb.control(''),
        companyManufactureRelationship: this.fb.control(''),
        legalizedHealthCertificate: this.fb.control(''),
        coa: this.itemType === 'premix' || (this.itemType === 'rawMaterials' && this.importReason !== 'RDSamples') ? this.fb.control('', Validators.required) : this.fb.control(''),
        coc: this.importReason === 'registeredProduct' ? this.fb.control('', Validators.required) : this.fb.control(''),
        premixName: this.fb.control(''),
        sourceOfRawMaterial: this.fb.control(''),
        ingredient: this.importReason === 'Premix' ? this.fb.control('', Validators.required) : this.fb.control(''),
        concentration: this.importReason === 'Premix' ? this.fb.control('', Validators.required) : this.fb.control(''),
        function: this.importReason === 'Premix' ? this.fb.control('', Validators.required) : this.fb.control(''),
        materialSafetyDataSheet: this.itemType === 'premix' || (this.itemType === 'rawMaterials' && this.importReason !== 'RDSamples') ? this.fb.control('', Validators.required) : this.fb.control(''),
        sourceOfRawMaterialAttach: this.itemType === 'premix' || (this.itemType === 'rawMaterials' && this.importReason !== 'RDSamples') ? this.fb.control('', Validators.required) : this.fb.control(''),
        declarationOfChemicalTreatment: this.fb.control(''),
        compositionOfPremixColorsFromManufacturer: this.importReason === 'Premix' ? this.fb.control('', Validators.required) : this.fb.control(''),
        approvalOfThePublicSecurityAuthority: this.itemType === 'premix' || (this.itemType === 'rawMaterials' && this.importReason !== 'RDSamples') ? this.fb.control('', Validators.required) : this.fb.control(''),
        delegationForImportation: this.itemType === 'premix' || (this.itemType === 'rawMaterials' && this.importReason === 'localProducts') ? this.fb.control('', Validators.required) : this.fb.control(''),
        supplyOrder: this.itemType === 'premix' || (this.itemType === 'rawMaterials' && this.importReason === 'localProducts') ? this.fb.control('', Validators.required) : this.fb.control(''),
        rawMaterialName: this.itemType === 'rawMaterials' ? this.fb.control('', Validators.required) : this.fb.control(''),
        declarationOfFreeOfSalmonella: this.itemType === 'rawMaterials' && this.importReason !== 'RDSamples' ? this.fb.control('', Validators.required) : this.fb.control(''),
        packingItemName: this.itemType === 'packagingMaterial' ? this.fb.control('', Validators.required) : this.fb.control(''),
      });
    }
  }

  saveData() {
  }

  onSubmit() {
  }

  onSubmitInvoices() {
    this.hideInvoiceContainer();
  }

  onSubmitItems() {
    console.log('this.regItemsForm.value', this.regItemsForm.value);
    if (this.regItemsForm.valid) {
      if (!this.editItemIndex && this.editItemIndex !== 0) {
        this.regInvoicesForm.value.itemDetails.push({...this.regItemsForm.value});
      } else {
        this.regInvoicesForm.get('itemDetails').value[this.editItemIndex] = {
          ...this.regInvoicesForm.get('itemDetails').value[this.editItemIndex],
          ...this.regInvoicesForm.value
        };
        this.editItemRowStatus = false;
        this.editItemIndex = '';
      }

      this.itemListTable.tableBody.push(this.regItemsForm.value);

      this.getItemsFormAsStarting('', '');

      console.log('this.itemListTable', this.itemListTable);
    } else {
      this.alertErrorNotificationStatus = true;
      this.alertErrorNotification = {msg: 'please complete the required values which marked with *'};
    }


    this.hideItemContainer();
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

  closeSuccessSubmissionModal() {
    this.modalRef.hide();
  }

  handleError(error) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: error};
    this.isLoading = false;
  }

  showInvoiceContainer() {
    this.invoiceContainerDisplayStatus = true;
  }

  showItemContainer() {
    this.itemContainerDisplayStatus = true;
  }

  hideInvoiceContainer() {
    this.invoiceContainerDisplayStatus = false;
  }

  hideItemContainer() {
    this.itemContainerDisplayStatus = false;
  }

  getTheSelectedValueForImportedReason(itemType, event) {
    this.formData.importReasonList[itemType].filter(item => item.id === event.value).map(res => {
      console.log('res', res);
      this.showNotificationNoStatus = res.showNotificationNoInput;
    });

    console.log('showNotificationNoStatus', this.showNotificationNoStatus);
    this.isLoading = true;

    setTimeout(() => {
      this.getItemsFormAsStarting('', '');
      this.renderingTheItemAttachment(itemType, event.value);
      this.isLoading = false;
    }, 500);
  }

  renderingTheItemAttachment(itemType, importReason) {
    this.ItemAttachmentFields = this.allItemTypeAttachmentFields[itemType].map(item => {
      if (item.requiredWithImportReasonCondition && item.relatedWithField.includes(importReason)) {
        item.required = true;
      } else if (item.requiredWithImportReasonCondition && !item.relatedWithField.includes(importReason)) {
        item.required = false;
      }

      if (item.enabledCondition && item.relatedWithField.includes(importReason)) {
        item.enable = true;
      } else if (item.enabledCondition && !item.relatedWithField.includes(importReason)) {
        item.enable = false;
      }

      return item;
    });

    console.log('ItemAttachmentFields', this.ItemAttachmentFields);
  }

  applyProduct(notificationNumber) {

  }
}
