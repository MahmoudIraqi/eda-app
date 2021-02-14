import {Component, HostListener, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  screenWidth;


  menuObject = [
    {
      name: 'Home',
      link: '/home',
      dropDownStatus: false
    },
    {
      name: 'Create requests',
      link: '#',
      dropDownStatus: true,
      dropdownLinks: [
        {
          name: 'Registration',
          link: '/new-request/registration'
        },
        {
          name: 'Re-Registration',
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
      name: 'Draft requests',
      link: '#',
      dropDownStatus: true,
      dropdownLinks: [
        {
          name: 'Registration',
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
      name: 'Track requests',
      link: '#',
      dropDownStatus: true,
      dropdownLinks: [
        {
          name: 'Registration',
          link: '/track-request/registration'
        },
        {
          name: 'Re-Registration',
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
      name: 'Approved products',
      link: '/approved-request',
      dropDownStatus: false
    },
    // {
    //   name: 'Rejected products',
    //   link: '/rejected-request',
    //   dropDownStatus: false
    // },
    {
      name: 'Contact us',
      link: '#',
      dropDownStatus: false
    }
  ];

  constructor() {
    this.onResize();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

}
