import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  contentObject = {
    title: 'Welcome in Egyptian Drug Authority',
    paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    btnList: [
      {
        icon: 'flaticon-new-document',
        title: 'Create Request',
        link: '/new-request'
      },
      {
        icon: 'flaticon-archive',
        title: 'Track Requests',
        link: '/track-request'
      },
      {
        icon: 'flaticon-inbox',
        title: 'Draft Requests',
        link: '/draft-request'
      },
      {
        icon: 'flaticon-approval',
        title: 'Approved Products',
        link: '/approved-request'
      }
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
