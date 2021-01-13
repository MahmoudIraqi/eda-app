import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-approved-request',
  templateUrl: './approved-request.component.html',
  styleUrls: ['./approved-request.component.css']
})
export class ApprovedRequestComponent implements OnInit {

  approvedListRequests = {
    tableHeader: ['Notification', 'Submission date', 'Product English name', 'Product Arabic name', 'Need Action'],
    tableBody: [
      {
        notification: '13245786',
        submissionDate: 'Jan 12 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        actionStatus: 'No',
      },
      {
        notification: '98712654',
        submissionDate: 'Jan 21 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        actionStatus: 'No',
      },
      {
        notification: '13245786',
        submissionDate: 'Jan 12 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        actionStatus: 'No',
      },
      {
        notification: '98712654',
        submissionDate: 'Jan 21 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        actionStatus: 'No',
      },
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
