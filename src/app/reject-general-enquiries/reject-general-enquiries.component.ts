import { Component, OnInit } from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-reject-general-enquiries',
  templateUrl: './reject-general-enquiries.component.html',
  styleUrls: ['./reject-general-enquiries.component.css']
})
export class RejectGeneralEnquiriesComponent implements OnInit {
  RejectedGeneralEnquiresListRequests;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.getService.getRejectedGeneralEnquiriesList().subscribe((res: any) => {
      this.RejectedGeneralEnquiresListRequests = {
        tableHeader: ['Request Number', 'Submission date', 'Title', 'Status', 'Submission Date'],
        tableBody: res
      };
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
}

