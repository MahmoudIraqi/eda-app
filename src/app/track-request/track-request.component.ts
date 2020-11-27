import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-track-request',
  templateUrl: './track-request.component.html',
  styleUrls: ['./track-request.component.css']
})
export class TrackRequestComponent implements OnInit {


  trackListRequests = [
    {
      requestNumber: '12341234',
      requestEntity: 'Egyptian Drug Authority',
      status: 'In Progress',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
      notificationStatus: true,
      notificationNumber: '13245786',
      notificationComment: 'we need some file'
    },
    {
      requestNumber: '56785678',
      requestEntity: 'Egyptian Drug Authority',
      status: 'starting',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
      notificationStatus: true,
      notificationNumber: '98712654',
      notificationComment: 'we need some files'
    },
    {
      requestNumber: '192837465',
      requestEntity: 'Egyptian Drug Authority',
      status: 'starting',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
      notificationStatus: false,
      notificationNumber: '',
      notificationComment: ''
    },
    {
      requestNumber: '12341234',
      requestEntity: 'Egyptian Drug Authority',
      status: 'In Progress',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
      notificationStatus: true,
      notificationNumber: '13245786',
      notificationComment: 'we need some file'
    },
    {
      requestNumber: '56785678',
      requestEntity: 'Egyptian Drug Authority',
      status: 'starting',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
      notificationStatus: true,
      notificationNumber: '98712654',
      notificationComment: 'we need some files'
    },
    {
      requestNumber: '192837465',
      requestEntity: 'Egyptian Drug Authority',
      status: 'starting',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
      notificationStatus: false,
      notificationNumber: '',
      notificationComment: ''
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
