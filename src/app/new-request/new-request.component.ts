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
  };
  selectedFormType;
  selectedRequestedType;

  constructor() {
  }

  ngOnInit(): void {
  }

  getFormType(event) {
    this.selectedFormType = event.value;
  }

  getRequestType(event) {
    this.selectedRequestedType = event.value;
  }

  saveData(event) {
    if (this.selectedFormType === 'regProduct') {
      console.log('regProductForAllRequestedType', event);
    } else if (this.selectedFormType === 'regKit') {
      console.log('regKitForAllRequestedType', event);
    } else if (this.selectedFormType === 'regHairColorantProduct') {
      console.log('regHairColorantProductForAllRequestedType', event);
    } else if (this.selectedFormType === 'regHairColorantKit') {
      console.log('regHairColorantProductKitForAllRequestedType', event);
    }
  }

  onSubmit(event) {
    if (this.selectedFormType === 'regProduct') {
      console.log('regProductForAllRequestedType', event);
    } else if (this.selectedFormType === 'regKit') {
      console.log('regKitForAllRequestedType', event);
    } else if (this.selectedFormType === 'regHairColorantProduct') {
      console.log('regHairColorantProductForAllRequestedType', event);
    } else if (this.selectedFormType === 'regHairColorantKit') {
      console.log('regHairColorantProductKitForAllRequestedType', event);
    }
  }
}
