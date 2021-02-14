import { Component, OnInit } from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-track-variation',
  templateUrl: './track-variation.component.html',
  styleUrls: ['./track-variation.component.css']
})
export class TrackVariationComponent implements OnInit {

  trackVariationListRequests;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.getService.getTrackVariationRequestsList().subscribe((res: any) => {
      this.trackVariationListRequests = {
        tableHeader: ['Request id', 'Submission date', 'Product English name', 'Product Arabic name', 'Status', 'Track Type'],
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
