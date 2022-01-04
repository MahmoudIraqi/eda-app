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
  formData = {
    manufacturingCompanyList: [],
    manufacturingCountryList: [],
    applicantList: [],
    unitOfMeasureList: [],
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
    }
  };
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
  ItemAttachmentFields: AttachemntObject[] = [
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
      id: 'coa',
      name: 'COA',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'coc',
      name: 'COC',
      fileName: '',
      fileValue: '',
      required: true,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
  ];
  fileStructure;
  attachmentRequiredStatus: boolean = false;
  invoiceListTable = {
    tableHeader: ['Invoice no.', 'Invoice Date', 'Invoice Value', 'Country Of Origin', 'Currency', 'Actions'],
    tableBody: []
  };
  itemListTable = {
    tableHeader: ['Invoice no.', 'Invoice Date', 'Invoice Value', 'Country Of Origin', 'Currency', 'Actions'],
    tableBody: []
  };
  invoiceContainerDisplayStatus: boolean = false;
  itemContainerDisplayStatus: boolean = false;
  itemType;
  importReason;
  showNotificationNoStatus: boolean = false;
  notificationNo;

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
        }
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
        ProductEnglishName: this.fb.control(''),
        flagType: this.fb.control(''),
        manufacturingCompany: this.fb.control(''),
        manufacturingCountry: this.fb.control(''),
        batchNo: this.fb.control(''),
        quantity: this.fb.control(''),
        uom: this.fb.control(''),
        certificateOfOrigin: this.fb.control(''),
        companyManufactureRelationship: this.fb.control(''),
        legalizedHealthCertificate: this.fb.control(''),
        coa: this.fb.control(''),
        coc: this.fb.control(''),
        premixName: this.fb.control(''),
        sourceOfRawMaterial: this.fb.control(''),
        ingredient: this.fb.control(''),
        concentration: this.fb.control(''),
        function: this.fb.control(''),
        materialSafetyDataSheet: this.fb.control(''),
        sourceOfRawMaterialAttach: this.fb.control(''),
        declarationOfChemicalTreatment: this.fb.control(''),
        compositionOfPremixColorsFromManufacturer: this.fb.control(''),
        approvalOfThePublicSecurityAuthority: this.fb.control(''),
        delegationForImportation: this.fb.control(''),
        supplyOrder: this.fb.control(''),
        rawMaterialName: this.fb.control(''),
        declarationOfFreeOfSalmonella: this.fb.control(''),
        packingItemName: this.fb.control(''),
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
    debugger;
    console.log('formData', this.formData);
    this.formData.importReasonList[itemType].filter(item => item.id === event.value).map(res => {
      this.showNotificationNoStatus = res.showNotificationNoInput;
    });
  }

  applyProduct(notificationNumber) {

  }
}
