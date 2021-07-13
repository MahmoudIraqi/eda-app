import { Component, OnInit } from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-draft-re-registration-request',
  templateUrl: './draft-re-registration-request.component.html',
  styleUrls: ['./draft-re-registration-request.component.css']
})
export class DraftReRegistrationRequestComponent implements OnInit {
  draftReRegistrationListRequests;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.getService.getDraftReRegistrationRequestsList().subscribe((res: any) => {
      this.draftReRegistrationListRequests = {
        tableHeader: ['Notification Number', 'Submission date', 'Type Of Notification', 'Product English name', 'Product Arabic name', 'Status'],
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
