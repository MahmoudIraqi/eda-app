import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-approved-variation',
  templateUrl: './draft-variation.component.html',
  styleUrls: ['./draft-variation.component.css']
})
export class DraftVariationComponent implements OnInit {
  draftVariationListRequests;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  whichVariation;

  constructor(private getService: FormService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.whichVariation = this.route.snapshot.routeConfig.path;

    this.getService.getDraftVariationProductsList(this.whichVariation).subscribe((res: any) => {
      this.draftVariationListRequests = {
        tableHeader: ['Notification No', 'Saved date', 'Type Of License', 'Product English name', 'Product Arabic name', 'Status'],
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
