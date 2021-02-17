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
          name: 'Notification',
          link: '/new-request/registration'
        },
        {
          name: 'Re-Notification',
          link: '/new-request/reregistration'
        },
        {
          name: 'Tell & Do variation',
          link: '/new-request/tell_do-variation'
        },
        {
          name: 'Do & Tell Variation',
          link: '/new-request/do_tell-variation'
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
          name: 'Notification',
          link: '/draft-request/registration'
        },
        {
          name: 'Tell & Do variation',
          link: '/draft-request/tell_do-variation'
        },
        {
          name: 'Do & Tell Variation',
          link: '/draft-request/do_tell-variation'
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
          name: 'Notification',
          link: '/track-request/registration'
        },
        {
          name: 'Re-Notification',
          link: '/track-request/re-registration'

        },
        {
          name: 'Tell & Do variation',
          link: '/track-request/tell_do-variation'
        },
        {
          name: 'Do & Tell Variation',
          link: '/track-request/do_tell-variation'
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
    {
      name: 'Rejected products',
      link: '/rejected-request',
      dropDownStatus: false
    },
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
