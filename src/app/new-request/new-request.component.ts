import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormGroupDirective, FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {FormService} from '../services/form.service';


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
    requestType: [],
  };
  selectedFormType;
  selectedRequestedType;
  error: boolean;
  errorMessage;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.getService.getMarketingTypeLookUp().subscribe((res: any) => {
      this.formData.formType = res;
    });
    this.getService.getRequestTypeLookUp().subscribe((res: any) => {
      this.formData.requestType = res;
    });
  }

  getFormType(event) {
    this.selectedFormType = event.value;
  }

  getRequestType(event) {
    this.selectedRequestedType = event.value;
  }

  saveData(event) {
    if (this.selectedFormType === 'regProduct') {
      const regProductData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regProductForAllRequestedType', regProductData);
    } else if (this.selectedFormType === 'regKit') {
      const regProductForAllRequestedTypeData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regKitForAllRequestedType', regProductForAllRequestedTypeData);
    } else if (this.selectedFormType === 'regHairColorantProduct') {
      const regKitForAllRequestedTypeData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regHairColorantProductForAllRequestedType', regKitForAllRequestedTypeData);
    } else if (this.selectedFormType === 'regHairColorantKit') {
      const regHairColorantKitData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regHairColorantProductKitForAllRequestedType', regHairColorantKitData);
    }
  }

  onSubmit(event) {
    if (this.selectedFormType === 'regProduct') {
      const regProductData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regProductForAllRequestedType', regProductData);
    } else if (this.selectedFormType === 'regKit') {
      const regProductForAllRequestedTypeData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regKitForAllRequestedType', regProductForAllRequestedTypeData);
    } else if (this.selectedFormType === 'regHairColorantProduct') {
      const regKitForAllRequestedTypeData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regHairColorantProductForAllRequestedType', regKitForAllRequestedTypeData);
    } else if (this.selectedFormType === 'regHairColorantKit') {
      const regHairColorantKitData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regHairColorantProductKitForAllRequestedType', regHairColorantKitData);
    }
  }
}
