import { Component, OnInit } from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-legacy-products',
  templateUrl: './legacy-products.component.html',
  styleUrls: ['./legacy-products.component.css']
})
export class LegacyProductsComponent implements OnInit {

  approvedLegacyListRequests;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getService.getApprovedLegacyProductsList().subscribe((res: any) => {
      this.approvedLegacyListRequests = {
        tableHeader: ['Old Notification', 'Registration date', 'Legacy Product English name', 'Legacy Product Arabic name', 'Update Product','Add Batch'],
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
