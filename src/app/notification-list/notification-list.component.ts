import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notificationListRequest;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.getService.getNotificationLogsList().subscribe((res: any) => {
      this.notificationListRequest = {
        tableHeader: ['Notification id', 'Notification comment', 'Request Type Name', 'Notification date', 'Product Name', 'Seen action'],
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

  seeNotification(id) {
    // this.notificationListRequest.tableBody.filter(x => x.ID === id).map(y => {
    //   y.F_Seen = !y.F_Seen;
    // });

    this.getService.setSeenNotificationByID(id).subscribe(res => {
      this.isLoading = false;
    }, error => this.handleError(error));
  }

}
