import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-draft-request',
  templateUrl: './draft-request.component.html',
  styleUrls: ['./draft-request.component.css']
})
export class DraftRequestComponent implements OnInit {

  draftListRequests = [
    {
      id: 0,
      requestNumber: '12341234',
      requestEntity: 'Egyptian Drug Authority',
      status: 'In Progress',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
    },
    {
      id: 1,
      requestNumber: '56785678',
      requestEntity: 'Egyptian Drug Authority',
      status: 'starting',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
    },
    {
      id: 2,
      requestNumber: '192837465',
      requestEntity: 'Egyptian Drug Authority',
      status: 'starting',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
    },
    {
      id: 3,
      requestNumber: '12341234',
      requestEntity: 'Egyptian Drug Authority',
      status: 'In Progress',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
    },
    {
      id: 4,
      requestNumber: '56785678',
      requestEntity: 'Egyptian Drug Authority',
      status: 'starting',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
    },
    {
      id: 5,
      requestNumber: '192837465',
      requestEntity: 'Egyptian Drug Authority',
      status: 'starting',
      details: 'Brief about authority connects medical pros around the world during COVID-19',
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
