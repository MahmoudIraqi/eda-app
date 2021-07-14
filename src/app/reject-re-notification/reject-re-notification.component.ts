import { Component, OnInit } from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-reject-re-notification',
  templateUrl: './reject-re-notification.component.html',
  styleUrls: ['./reject-re-notification.component.css']
})
export class RejectReNotificationComponent implements OnInit {

  rejectListRequests;
  typeOfRejectedList;
  responseForRejectedList = [];
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.getService.getRejectRequestsListForReRegistration().subscribe((res: any) => {
      this.responseForRejectedList = res;
      this.selectRejectedType('Final');
      this.isLoading = false;
    }, error => this.handleError(error));
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

  selectRejectedType(whichType) {
    if (this.responseForRejectedList.length > 0) {
      if (whichType === 'Final') {
        this.typeOfRejectedList = 'Final';
        this.rejectListRequests = {
          tableHeader: ['Request Number', 'Submission date', 'Type Of Notification', 'Product English name', 'Type Of Request', 'Status', 'Track Type', 'Action'],
          tableBody: this.responseForRejectedList.filter(x => !x.canAppeld)
        };
      } else if (whichType === 'Appealed') {
        this.typeOfRejectedList = 'Appealed';
        this.rejectListRequests = {
          tableHeader: ['Request Number', 'Submission date', 'Type Of Notification', 'Product English name', 'Type Of Request', 'Status', 'Track Type', 'Action'],
          tableBody: this.responseForRejectedList.filter(x => x.canAppeld)
        };
      }
    } else {
      this.typeOfRejectedList = whichType;
      this.rejectListRequests = {
        tableHeader: ['Request Number', 'Submission date', 'Type Of Notification', 'Product English name', 'Type Of Request', 'Status', 'Track Type', 'Action'],
        tableBody: this.responseForRejectedList
      };
    }
  }
}
