import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-draft-request',
  templateUrl: './draft-request.component.html',
  styleUrls: ['./draft-request.component.css']
})
export class DraftRequestComponent implements OnInit {

  draftListRequests = {
    tableHeader: ['Request id', 'Submission date', 'Product English name', 'Product Arabic name', 'Status', 'Track Type', 'Action'],
    tableBody: [
      {
        id: '13245786',
        submissionDate: 'Jan 12 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        status: 'In Progress',
        trackType: 'Brief about authority connects medical pros around the world during COVID-19',
      },
      {
        id: '98712654',
        submissionDate: 'Jan 21 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        status: 'Starting',
        trackType: 'Brief about authority connects medical pros around the world during COVID-19',
      },
      {
        id: '13245786',
        submissionDate: 'Jan 12 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        status: 'In Progress',
        trackType: 'Brief about authority connects medical pros around the world during COVID-19',
      },
      {
        id: '98712654',
        submissionDate: 'Jan 21 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        status: 'Starting',
        trackType: 'Brief about authority connects medical pros around the world during COVID-19',
      },
      {
        id: '13245786',
        submissionDate: 'Jan 12 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        status: 'In Progress',
        trackType: 'Brief about authority connects medical pros around the world during COVID-19',
      },
      {
        id: '98712654',
        submissionDate: 'Jan 21 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        status: 'Starting',
        trackType: 'Brief about authority connects medical pros around the world during COVID-19',
      },
      {
        id: '13245786',
        submissionDate: 'Jan 12 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        status: 'In Progress',
        trackType: 'Brief about authority connects medical pros around the world during COVID-19',
      },
      {
        id: '98712654',
        submissionDate: 'Jan 21 2021',
        productEnglishName: 'Egyptian Drug Authority',
        productArabicName: 'هيئة الدواء المصرية',
        status: 'Starting',
        trackType: 'Brief about authority connects medical pros around the world during COVID-19',
      },
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
