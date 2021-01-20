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
    formType: [],
    requestType: [],
    manufacturingCompanyList: [],
    manufacturingCountryList: [],
    productColorList: [],
    ApplicantList: ['Applicant1', 'Applicant2', 'Applicant3', 'Applicant4'],
    licenseHolderList: ['licenseHolder1', 'licenseHolder2', 'licenseHolder3', 'other'],
    licenseHolderCountryList: [],
    physicalStateList: [],
    purposeOfUseList: [],
    typeOfPackagingList: [],
    unitOfMeasureList: [],
    ingrediantList: ['ingrediant1', 'ingrediant2', 'ingrediant3'],
    functionList: []
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
    this.getService.getCountryLookUp().subscribe((res: any) => {
      this.formData.manufacturingCountryList = res;
      this.formData.licenseHolderCountryList = res;
    });
    this.getService.getManufacturingCompanyLookUp().subscribe((res: any) => {
      this.formData.manufacturingCompanyList = res;
    });
    this.getService.getFunctionLookUp().subscribe((res: any) => {
      this.formData.functionList = res;
    });
    this.getService.getPackagingTypeLookUp().subscribe((res: any) => {
      this.formData.typeOfPackagingList = res;
    });
    this.getService.getPhysicalStateLookUp().subscribe((res: any) => {
      this.formData.physicalStateList = res;
    });
    this.getService.getUnitOfMeasureLookUp().subscribe((res: any) => {
      this.formData.unitOfMeasureList = res;
    });
    this.getService.getUsePurposeLookUp().subscribe((res: any) => {
      this.formData.purposeOfUseList = res;
    });
    this.getService.getProductColorLookUp().subscribe((res: any) => {
      this.formData.productColorList = res;
    });
  }

  getFormType(event) {
    this.selectedFormType = event.value;
  }

  getRequestType(event) {
    this.selectedRequestedType = event.value;
  }

  saveData(event) {
    if (this.selectedFormType === 1) {
      const regProductData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regProductForAllRequestedType', regProductData);
    } else if (this.selectedFormType === 2) {
      const regProductForAllRequestedTypeData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regKitForAllRequestedType', regProductForAllRequestedTypeData);
    } else if (this.selectedFormType === 3) {
      const regKitForAllRequestedTypeData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regHairColorantProductForAllRequestedType', regKitForAllRequestedTypeData);
    } else if (this.selectedFormType === 4) {
      const regHairColorantKitData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regHairColorantProductKitForAllRequestedType', regHairColorantKitData);
    }
  }

  onSubmit(event) {
    if (this.selectedFormType === 1) {

      event.append("typeOfMarketing", this.selectedFormType);
      event.append("typeOfRegistration", this.selectedRequestedType);

      // const regProductData = {
      //   typeOfMarketing: this.selectedFormType,
      //   typeOfRegistration: this.selectedRequestedType,
      //   ...event
      // };
      console.log('event', event);

      this.getService.createProductRequest(event).subscribe((res: any) => {
        console.log('res', res);
      });


    } else if (this.selectedFormType === 2) {
      const regProductForAllRequestedTypeData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regKitForAllRequestedType', regProductForAllRequestedTypeData);
    } else if (this.selectedFormType === 3) {
      const regKitForAllRequestedTypeData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regHairColorantProductForAllRequestedType', regKitForAllRequestedTypeData);
    } else if (this.selectedFormType === 4) {
      const regHairColorantKitData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regHairColorantProductKitForAllRequestedType', regHairColorantKitData);
    }
  }
}
