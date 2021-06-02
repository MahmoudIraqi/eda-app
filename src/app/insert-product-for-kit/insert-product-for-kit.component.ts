import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-insert-product-for-kit',
  templateUrl: './insert-product-for-kit.component.html',
  styleUrls: ['./insert-product-for-kit.component.css']
})
export class InsertProductForKitComponent implements OnInit, OnChanges {

  @Input() legacyStatus;
  @Input() reRegistrationStatus;
  @Input() variationFieldsStatus;
  @Input() variationFields;
  @Input() lookupsData;
  @Input() lookupForProductIds;
  @Input() disabledStatusForField;
  @Input() appliedProductStatus;
  @Output() applyProductOutput = new EventEmitter();

  productStatusField;
  notificationNoField;
  requestIdField;
  enableEditableFields = [];
  objectForListOfVariationGroup: any;

  constructor() {
  }

  ngOnChanges(): void {

    console.log('lookupsData', this.lookupsData);
    console.log('lookupForProductIds', this.lookupForProductIds);

    this.getDisabledValues();
  }

  ngOnInit(): void {
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

  applyProduct(status, notificationNumberOrId) {
    this.applyProductOutput.emit({status, notificationNumberOrId});
  }
}
