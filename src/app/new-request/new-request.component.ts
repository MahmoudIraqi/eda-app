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
    ApplicantList: [],
    licenseHolderList: [],
    licenseHolderCountryList: [],
    physicalStateList: [],
    purposeOfUseList: [],
    typeOfPackagingList: [],
    unitOfMeasureList: [],
    ingrediantList: [],
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
    this.getService.getProductIngrediantsLookUp().subscribe((res: any) => {
      this.formData.ingrediantList = res;
    });
    this.getService.getCompanyProfileLookUp().subscribe((res: any) => {
      this.formData.ApplicantList = res;
      this.formData.licenseHolderList = res;
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
      event = {
        isDraft: 1,
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };

      this.getService.createProductRequest(event).subscribe((res: any) => {
        console.log('res', res);
      });

    } else if (this.selectedFormType === 2) {
      const regProductForAllRequestedTypeData = {
        isDraft: 1,
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regKitForAllRequestedType', regProductForAllRequestedTypeData);

      // this.getService.createProductRequest(regProductForAllRequestedTypeData).subscribe((res: any) => {
      //   console.log('res', res);
      // });
    } else if (this.selectedFormType === 3) {
      event = {
        isDraft: 1,
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };

      this.getService.createProductRequest(event).subscribe((res: any) => {
        console.log('res', res);
      });
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
      event = {
        isDraft: 0,
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };

      this.getService.createProductRequest(event).subscribe((res: any) => {
        console.log('res', res);
      });
    } else if (this.selectedFormType === 2) {
      const regProductForAllRequestedTypeData = {
        isDraft: 0,
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regKitForAllRequestedType', regProductForAllRequestedTypeData);

      // this.getService.createProductRequest(regProductForAllRequestedTypeData).subscribe((res: any) => {
      //   console.log('res', res);
      // });

    } else if (this.selectedFormType === 3) {
      event = {
        isDraft: 0,
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };

      this.getService.createProductRequest(event).subscribe((res: any) => {
        console.log('res', res);
      });
    } else if (this.selectedFormType === 4) {
      const regHairColorantKitData = {
        typeOfMarketing: this.selectedFormType,
        typeOfRegistration: this.selectedRequestedType,
        ...event
      };
      console.log('regHairColorantProductKitForAllRequestedType', regHairColorantKitData);
    }
  }

  changeFileObjectToBase64(objectData) {
    Object.keys(objectData).map(x => {
      let file;
      if (objectData[x] instanceof File) {
        const reader = new FileReader();
        reader.readAsDataURL(objectData[x]);
        reader.onload = (res: any) => {
          objectData[x] = res.target.result;
        };
      }

    });

    console.log('objectData', objectData);

    return objectData;
  }
}
