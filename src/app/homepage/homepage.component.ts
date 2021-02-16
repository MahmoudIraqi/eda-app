import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  onInitStatus = false;
  contentObject = {
    title: 'Welcome in Egyptian Drug Authority',
    paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    btnList: [
      {
        icon: 'flaticon-new-page',
        title: 'Create Request',
        link: '',
        dropDownStatus: true,
        dropdownLinks: [
          {
            name: 'Notification',
            link: '/new-request/registration'
          },
          {
            name: 'Re-Notification',
            link: '/new-request/reregistration'
          },
          {
            name: 'Tell & Do variation',
            link: '/new-request/variation'
          },
          {
            name: 'Do & Tell Variation',
            link: '#'
          },
          {
            name: 'Inspection',
            link: '#'
          },
          {
            name: 'Custom Release',
            link: '#'
          },
          {
            name: 'General Enquiries',
            link: '#'
          }
        ]
      },
      {
        icon: 'flaticon-archive',
        title: 'Track Requests',
        link: '',
        dropDownStatus: true,
        dropdownLinks: [
          {
            name: 'Notification',
            link: '/track-request/registration'
          },
          {
            name: 'Re-Notification',
            link: '/track-request/re-registration'
          },
          {
            name: 'Tell & Do variation',
            link: '/track-request/variation'
          },
          {
            name: 'Do & Tell Variation',
            link: '#'
          },
          {
            name: 'Inspection',
            link: '#'
          },
          {
            name: 'Custom Release',
            link: '#'
          },
          {
            name: 'General Enquiries',
            link: '#'
          }
        ]
      },
      {
        icon: 'flaticon-inbox',
        title: 'Draft Requests',
        link: '',
        dropDownStatus: true,
        dropdownLinks: [
          {
            name: 'Notification',
            link: '/draft-request/registration'
          },
          {
            name: 'Tell & Do variation',
            link: '/draft-request/variation'
          },
          {
            name: 'Do & Tell Variation',
            link: '#'
          },
          {
            name: 'Inspection',
            link: '#'
          },
          {
            name: 'Custom Release',
            link: '#'
          },
          {
            name: 'General Enquiries',
            link: '#'
          }
        ]
      },
      {
        icon: 'flaticon-approval',
        title: 'Approved Products',
        link: '/approved-request',
        dropDownStatus: false,
      },
      {
        icon: 'flaticon-approval',
        title: 'Rejected Products',
        link: '/rejected-request',
        dropDownStatus: false,
      }
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
    this.onInitStatus = true;
  }

}
