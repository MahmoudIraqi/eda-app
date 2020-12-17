import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-draft-request',
  templateUrl: './draft-request.component.html',
  styleUrls: ['./draft-request.component.css']
})
export class DraftRequestComponent implements OnInit {

  draftListRequests = {
    tableHeader: ['Id', 'Request Entity', 'Details', 'Date', 'Action'],
    tableBody: [
      {
        id: '1',
        requestEntity: 'Egyptian Drug Authority',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        date: '01.01.2021'
      },
      {
        id: '2',
        requestEntity: 'Egyptian Drug Authority',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        date: '01.01.2021'
      },
      {
        id: '3',
        requestEntity: 'Egyptian Drug Authority',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        date: '01.01.2021'
      },
      {
        id: '4',
        requestEntity: 'Egyptian Drug Authority',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        date: '01.01.2021'
      },
      {
        id: '5',
        requestEntity: 'Egyptian Drug Authority',
        details: 'Brief about authority connects medical pros around the world during COVID-19',
        date: '01.01.2021'
      },
      {
        id: '6',
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
