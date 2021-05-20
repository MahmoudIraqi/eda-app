import { Component, OnInit } from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-draft-legacy',
  templateUrl: './draft-legacy.component.html',
  styleUrls: ['./draft-legacy.component.css']
})
export class DraftLegacyComponent implements OnInit {

  draftLegacyListRequests;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getService.getTrackLegacyProductsList().subscribe((res: any) => {

      this.draftLegacyListRequests = {
        tableHeader: ['Old Notification Number', 'Saved date', 'Product English name', 'Product Arabic name', 'Status', 'Track Type', 'Action'],
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
