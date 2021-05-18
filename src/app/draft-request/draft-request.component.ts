import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-draft-request',
  templateUrl: './draft-request.component.html',
  styleUrls: ['./draft-request.component.css']
})
export class DraftRequestComponent implements OnInit {

  draftListRequests;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getService.getDraftRequestsList().subscribe((res: any) => {
      this.draftListRequests = {
        tableHeader: ['Request id', 'Saved date', 'Product English name', 'Product Arabic name', 'Status', 'Track Type', 'Action'],
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
