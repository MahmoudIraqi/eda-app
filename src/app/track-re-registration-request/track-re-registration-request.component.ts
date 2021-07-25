import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-track-re-registration-request',
  templateUrl: './track-re-registration-request.component.html',
  styleUrls: ['./track-re-registration-request.component.css']
})
export class TrackReRegistrationRequestComponent implements OnInit {

  trackReRegistrationListRequests;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.getService.getTrackReRegistrationRequestsList().subscribe((res: any) => {
      this.trackReRegistrationListRequests = {
        tableHeader: ['Notification Number', 'Submission date', 'Type Of Notification', 'Product English name', 'Product Arabic name', 'Status', 'Action'],
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
