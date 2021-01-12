import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-track-request',
    templateUrl: './track-request.component.html',
    styleUrls: ['./track-request.component.css']
})
export class TrackRequestComponent implements OnInit {


    trackListRequests = {
        tableHeader: ['Request id', 'Submission date', 'Product English name', 'Product Arabic name', 'Status', 'Track Type'],
        tableBody: [
            {
                id: '13245786',
                submissionDate: 'Jan 12 2021',
                productEnglishName: 'Egyptian Drug Authority',
                productArabicName: 'هيئة الدواء المصرية',
                status: 'In Progress',
                trackType: 'Brief about authority connects medical pros around the world during COVID-19',
                notificationStatus: true,
                notificationComment: 'we need some file'
            },
            {
                id: '98712654',
                submissionDate: 'Jan 21 2021',
                productEnglishName: 'Egyptian Drug Authority',
                productArabicName: 'هيئة الدواء المصرية',
                status: 'Starting',
                trackType: 'Brief about authority connects medical pros around the world during COVID-19',
                notificationStatus: true,
                notificationComment: 'we need some file'
            },
            {
                id: '13245786',
                submissionDate: 'Jan 12 2021',
                productEnglishName: 'Egyptian Drug Authority',
                productArabicName: 'هيئة الدواء المصرية',
                status: 'In Progress',
                trackType: 'Brief about authority connects medical pros around the world during COVID-19',
                notificationStatus: true,
                notificationComment: 'we need some file'
            },
            {
                id: '98712654',
                submissionDate: 'Jan 21 2021',
                productEnglishName: 'Egyptian Drug Authority',
                productArabicName: 'هيئة الدواء المصرية',
                status: 'Starting',
                trackType: 'Brief about authority connects medical pros around the world during COVID-19',
                notificationStatus: true,
                notificationComment: 'we need some file'
            },
            {
                id: '13245786',
                submissionDate: 'Jan 12 2021',
                productEnglishName: 'Egyptian Drug Authority',
                productArabicName: 'هيئة الدواء المصرية',
                status: 'In Progress',
                trackType: 'Brief about authority connects medical pros around the world during COVID-19',
                notificationStatus: true,
                notificationComment: 'we need some file'
            },
            {
                id: '98712654',
                submissionDate: 'Jan 21 2021',
                productEnglishName: 'Egyptian Drug Authority',
                productArabicName: 'هيئة الدواء المصرية',
                status: 'Starting',
                trackType: 'Brief about authority connects medical pros around the world during COVID-19',
                notificationStatus: true,
                notificationComment: 'we need some file'
            },
            {
                id: '13245786',
                submissionDate: 'Jan 12 2021',
                productEnglishName: 'Egyptian Drug Authority',
                productArabicName: 'هيئة الدواء المصرية',
                status: 'In Progress',
                trackType: 'Brief about authority connects medical pros around the world during COVID-19',
                notificationStatus: true,
                notificationComment: 'we need some file'
            },
            {
                id: '98712654',
                submissionDate: 'Jan 21 2021',
                productEnglishName: 'Egyptian Drug Authority',
                productArabicName: 'هيئة الدواء المصرية',
                status: 'Starting',
                trackType: 'Brief about authority connects medical pros around the world during COVID-19',
                notificationStatus: true,
                notificationComment: 'we need some file'
            },
        ]
    };

    constructor() {
    }

    ngOnInit(): void {
    }

}
