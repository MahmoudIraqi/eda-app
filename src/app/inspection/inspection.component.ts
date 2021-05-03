import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormService} from '../services/form.service';
import {ActivatedRoute} from '@angular/router';
import {convertToSpecialObject} from '../../utils/formDataFunction';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {


  inspectionRequestForm: FormGroup;
  formData = {
    formType: [
      {
        ID: 1,
        NAME: 'Final Products'
      },
      {
        ID: 2,
        NAME: 'Completion of the CADC labs'
      },
      {
        ID: 3,
        NAME: 'Inventory and culling'
      }
    ],
    fieldsType: [
      {
        ID: 1,
        NAME: 'Sampling a complete product from registration notices issued for export only'
      },
      {
        ID: 2,
        NAME: 'Decoding the score'
      },
      {
        ID: 3,
        NAME: 'Re-sampling'
      }
    ],
  };
  selectedFormType;
  selectedFieldsType;

  error: boolean;
  errorMessage;
  successSubmission: boolean = false;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  productId;
  estimatedValue;

  constructor(private getService: FormService, private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isLoading = true;
      this.getService.getProductWithProductIDList(Number(this.productId)).subscribe((res: any) => {
      }, error => this.handleError(error));
    }
  }

  getFormType(event) {
    this.selectedFormType = event.value;
  }

  getFieldsType(event) {
    this.getFieldsType = event.value;
  }

  saveData(event) {
    this.isLoading = true;

    if (this.selectedFormType === 1) {
    } else if (this.selectedFormType === 2) {
    } else if (this.selectedFormType === 3) {
    }
  }

  onSubmit(event) {
    this.isLoading = true;
    this.successSubmission = false;
    if (this.selectedFormType === 1) {
    } else if (this.selectedFormType === 2) {
    } else if (this.selectedFormType === 3) {
    }
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

  emptyTheTopField() {
    this.selectedFieldsType = '';
    this.selectedFormType = '';
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }
}
