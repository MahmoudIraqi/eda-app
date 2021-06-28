import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-approved-request',
  templateUrl: './approved-request.component.html',
  styleUrls: ['./approved-request.component.css']
})
export class ApprovedRequestComponent implements OnInit {

  approvedListRequests;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  typeOfApprovedList;
  typeOfApprovedListWithComments;
  typeOfApprovedHoldList;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.selectApprovedProductType('approvedProduct');
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }

  onClosedErrorAlert() {
    setTimeout(() => {
      this.alertErrorNotificationStatus = false;
    }, 2000);
  }

  selectApprovedProductType(whichType) {
    console.log('whichType', whichType);
    this.typeOfApprovedList = whichType;

    if (whichType === 'approvedProduct') {
      this.isLoading = true;
      this.approvedListRequests = null;

      this.getService.getApprovedProductsList().subscribe((res: any) => {
        this.approvedListRequests = {
          tableHeader: ['Notification', 'Notification date', 'Product English name', 'Product Arabic name', 'Need Action', 'Update Product', 'Add Batch'],
          tableBody: res
        };
        this.isLoading = false;
      }, error => this.handleError(error));
    } else if (whichType === 'approvedProductWithComment') {
      this.selectApprovedProductWithCommentsType('approvedProductWithLabsComments');
    } else if (whichType === 'holdProducts') {
      this.selectApprovedHoldProductType('approvedHoldProductWithLabsComments');
    }
  }

  selectApprovedProductWithCommentsType(whichType) {
    console.log('whichType', whichType);
    this.typeOfApprovedListWithComments = whichType;

    if (whichType === 'approvedProductWithLabsComments') {
      this.isLoading = true;
      this.approvedListRequests = null;

      this.getService.getApprovedProductsWithCommentsFromLabsList().subscribe((res: any) => {
        this.approvedListRequests = {
          tableHeader: ['Notification', 'Notification date', 'Product English name', 'Product Arabic name', 'Need Action', 'Update Product', 'Add Batch'],
          tableBody: res
        };
        this.isLoading = false;
      }, error => this.handleError(error));
    } else if (whichType === 'approvedProductWithRegComment') {
      this.isLoading = true;
      this.approvedListRequests = null;

      this.getService.getApprovedProductsWithCommentsFromRegList().subscribe((res: any) => {
        this.approvedListRequests = {
          tableHeader: ['Notification', 'Notification date', 'Product English name', 'Product Arabic name', 'Need Action', 'Update Product', 'Add Batch'],
          tableBody: res
        };
        this.isLoading = false;
      }, error => this.handleError(error));
    }
  }

  selectApprovedHoldProductType(whichType) {
    console.log('whichType', whichType);
    this.typeOfApprovedHoldList = whichType;

    if (whichType === 'approvedHoldProductWithLabsComments') {
      this.isLoading = true;
      this.approvedListRequests = null;

      this.getService.getApprovedHoldProductsFromLabList().subscribe((res: any) => {
        this.approvedListRequests = {
          tableHeader: ['Notification', 'Notification date', 'Product English name', 'Product Arabic name', 'Need Action', 'Update Product', 'Add Batch'],
          tableBody: res
        };
        this.isLoading = false;
      }, error => this.handleError(error));
    } else if (whichType === 'approvedHoldProductWithRegComment') {
      this.isLoading = true;
      this.approvedListRequests = null;

      this.getService.getApprovedHoldProductsFromRegList().subscribe((res: any) => {
        this.approvedListRequests = {
          tableHeader: ['Notification', 'Notification date', 'Product English name', 'Product Arabic name', 'Need Action', 'Update Product', 'Add Batch'],
          tableBody: res
        };
        this.isLoading = false;
      }, error => this.handleError(error));
    }
  }
}
