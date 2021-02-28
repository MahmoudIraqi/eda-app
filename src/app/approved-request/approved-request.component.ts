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

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getService.getApprovedProductsList().subscribe((res: any) => {
      this.approvedListRequests = {
        tableHeader: ['Notification', 'Submission date', 'Product English name', 'Product Arabic name', 'Need Action', 'Update Product','Add Batch'],
        tableBody: res
      };
      this.isLoading = false;
    },error => this.handleError(error));
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
