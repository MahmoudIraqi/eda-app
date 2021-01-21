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
        dropdownLinks:[
          {
            name:'Registration',
            link:'/new-request'
          },
          {
            name:'Re-Registration',
            link:'#'
          },
          {
            name:'Tell & Do variation',
            link:'#'
          },
          {
            name:'Do & Tell Variation',
            link:'#'
          },
          {
            name:'Inspection',
            link:'#'
          },
          {
            name:'Custom Release',
            link:'#'
          },
          {
            name:'General Enquiries',
            link:'#'
          }
        ]
      },
      {
        icon: 'flaticon-archive',
        title: 'Track Requests',
        link: '',
        dropDownStatus: true,
        dropdownLinks:[
          {
            name:'Registration',
            link:'/new-request'
          },
          {
            name:'Re-Registration',
            link:'#'
          },
          {
            name:'Tell & Do variation',
            link:'#'
          },
          {
            name:'Do & Tell Variation',
            link:'#'
          },
          {
            name:'Inspection',
            link:'#'
          },
          {
            name:'Custom Release',
            link:'#'
          },
          {
            name:'General Enquiries',
            link:'#'
          }
        ]
      },
      {
        icon: 'flaticon-inbox',
        title: 'Draft Requests',
        link: '',
        dropDownStatus: true,
        dropdownLinks:[
          {
            name:'Registration',
            link:'/new-request'
          },
          {
            name:'Re-Registration',
            link:'#'
          },
          {
            name:'Tell & Do variation',
            link:'#'
          },
          {
            name:'Do & Tell Variation',
            link:'#'
          },
          {
            name:'Inspection',
            link:'#'
          },
          {
            name:'Custom Release',
            link:'#'
          },
          {
            name:'General Enquiries',
            link:'#'
          }
        ]
      },
      {
        icon: 'flaticon-approval',
        title: 'Approved Products',
        link: '/approved-request',
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
