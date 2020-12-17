import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-track-request',
  templateUrl: './track-request.component.html',
  styleUrls: ['./track-request.component.css']
})
export class TrackRequestComponent implements OnInit {


  trackListRequests = {
    tableHeader: ['Id', 'Request Entity', 'Status', 'Details', 'Notification'],
    tableBody: [
      {
        id: '1',
        requestEntity: 'Egyptian Drug Authority',
        status: 'In Progress',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        notification: '13245786',
        notificationStatus: true,
        notificationComment: 'we need some file'
      },
      {
        id: '2',
        requestEntity: 'Egyptian Drug Authority',
        status: 'starting',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        notification: '98712654',
        notificationStatus: true,
        notificationComment: 'we need some files'
      },
      {
        id: '3',
        requestEntity: 'Egyptian Drug Authority',
        status: 'starting',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        notification: '',
        notificationStatus: false,
        notificationComment: ''
      },
      {
        id: '4',
        requestEntity: 'Egyptian Drug Authority',
        status: 'In Progress',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        notification: '13245786',
        notificationStatus: true,
        notificationComment: 'we need some file'
      },
      {
        id: '5',
        requestEntity: 'Egyptian Drug Authority',
        status: 'starting',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        notification: '98712654',
        notificationStatus: true,
        notificationComment: 'we need some files'
      },
      {
        id: '6',
        requestEntity: 'Egyptian Drug Authority',
        status: 'starting',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        notification: '',
        notificationStatus: false,
        notificationComment: ''
      }
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
