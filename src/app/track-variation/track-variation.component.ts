import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';
import {ActivatedRoute} from '@angular/router';

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
  whichVariation;

  constructor(private getService: FormService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.whichVariation = this.route.snapshot.routeConfig.path;

    this.getService.getTrackVariationRequestsList(this.whichVariation).subscribe((res: any) => {
      this.trackVariationListRequests = {
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
