import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-track-legacy',
  templateUrl: './track-legacy.component.html',
  styleUrls: ['./track-legacy.component.css']
})
export class TrackLegacyComponent implements OnInit {

  tackLegacyListRequests;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getService.getTrackLegacyProductsList().subscribe((res: any) => {

      this.tackLegacyListRequests = {
        tableHeader: ['Notification Number', 'Submission date', 'Product English name', 'Product Arabic name', 'Status', 'Track Type', 'Action'],
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
