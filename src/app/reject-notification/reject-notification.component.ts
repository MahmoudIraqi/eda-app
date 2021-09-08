import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';
import {convertFromStringToArrayWithCommaSeparator} from '../../utils/formDataFunction';

@Component({
  selector: 'app-reject-notification',
  templateUrl: './reject-notification.component.html',
  styleUrls: ['./reject-notification.component.css']
})
export class RejectNotificationComponent implements OnInit {
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

    this.getService.getRejectRequestsList().subscribe((res: any) => {
      res.map(item => {
        item.RejectionResons = convertFromStringToArrayWithCommaSeparator(item.RejectionResons);
      });
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
