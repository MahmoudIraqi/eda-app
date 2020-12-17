import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-approved-request',
  templateUrl: './approved-request.component.html',
  styleUrls: ['./approved-request.component.css']
})
export class ApprovedRequestComponent implements OnInit {

  approvedListRequests = {
    tableHeader: ['Notification', 'Request Entity', 'Details', 'date'],
    tableBody: [
      {
        notification: '123456',
        requestEntity: 'Egyptian Drug Authority',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        date: '01.01.2021'
      },
      {
        notification: '234567',
        requestEntity: 'Egyptian Drug Authority',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        date: '01.01.2021'
      },
      {
        notification: '345678',
        requestEntity: 'Egyptian Drug Authority',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        date: '01.01.2021'
      },
      {
        notification: '4567890',
        requestEntity: 'Egyptian Drug Authority',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        date: '01.01.2021'
      },
      {
        notification: '5678901',
        requestEntity: 'Egyptian Drug Authority',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        date: '01.01.2021'
      },
      {
        notification: '6789012',
        requestEntity: 'Egyptian Drug Authority',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        date: '01.01.2021'
      }
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
