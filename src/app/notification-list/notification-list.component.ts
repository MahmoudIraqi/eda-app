import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notificationListRequest = {
    tableHeader: ['Notification id', 'Notification comment', 'Notification date', 'Seen action'],
    tableBody: [
      {
        ID: 0,
        COMMENTS: 'need to edit the product name',
        NOTIFICATION_TIME: '01 Feb, 2021',
        FROM_ROLE: 'EDA',
        TO_ROLE: 'Spectrum',
        F_Seen: false
      },
      {
        ID: 1,
        COMMENTS: 'need to edit the CoA file',
        NOTIFICATION_TIME: '02 Feb, 2021',
        FROM_ROLE: 'EDA',
        TO_ROLE: 'Spectrum',
        F_Seen: false
      },
      {
        ID: 2,
        COMMENTS: 'increase the shilf data',
        NOTIFICATION_TIME: '03 Feb, 2021',
        FROM_ROLE: 'EDA',
        TO_ROLE: 'Spectrum',
        F_Seen: false
      },
      {
        ID: 3,
        COMMENTS: 'need to edit the product name',
        NOTIFICATION_TIME: '05 Feb, 2021',
        FROM_ROLE: 'EDA',
        TO_ROLE: 'Spectrum',
        F_Seen: false
      },
      {
        ID: 4,
        COMMENTS: 'need to edit the product name',
        NOTIFICATION_TIME: '06 Feb, 2021',
        FROM_ROLE: 'EDA',
        TO_ROLE: 'Spectrum',
        F_Seen: false
      }
    ]
  };
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    // this.isLoading = true;

    // this.getService.getNotificationLogsList().subscribe((res: any) => {
    //   console.log('res', res);
    //   this.notificationListRequest = {
    //     tableHeader: ['Notification id', 'Notification comment', 'Notification date'],
    //     tableBody: res
    //   };
    //   this.isLoading = false;
    // }, error => this.handleError(error));
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
    this.notificationListRequest.tableBody.filter(x => x.ID === id).map(y => {
      y.F_Seen = !y.F_Seen;
    });

    // this.getService.setSeenNotificationByID(id).subscribe(res => {
    //   this.isLoading = false;
    // }, error => this.handleError(error));
  }

}
