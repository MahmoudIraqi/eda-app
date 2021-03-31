import {Component, HostListener, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FormService} from '../services/form.service';

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
      link: '/new-request',
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
          link: '/new-request/inspection'
        },
        {
          name: 'Custom Release',
          link: '/new-request/custom-release'
        },
        {
          name: 'Custom Release2',
          link: '/new-request/custom-release2'
        },
        {
          name: 'General Enquiries',
          link: '/new-request/general-enquiries'
        }
      ]
    },
    {
      name: 'Draft requests',
      link: '/draft-request',
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
        }
      ]
    },
    {
      name: 'Track requests',
      link: '/track-request',
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
          link: '/track-request/general-enquiries'
        }
      ]
    },
    {
      name: 'Products',
      link: '-product',
      dropDownStatus: true,
      dropdownLinks: [
        {
          name: 'Approved products',
          link: '/approved-product'
        },
        {
          name: 'Rejected products',
          link: '/rejected-product',
        },
        {
          name: 'Legacy',
          link: '/legacy-products',
        }
      ]
    },
    {
      name: 'Administration',
      link: '#',
      dropDownStatus: true,
      dropdownLinks: [
        {
          name: 'Manufacturing Company',
          link: '/admin/manufacturing-company'
        },
        {
          name: 'Adding Batch',
          link: '/admin/adding-batch'
        },
        {
          name: 'Users/Roles',
          link: '#'
        }
      ]
    },
  ];

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router) {
    this.onResize();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  isActive(link) {
    return this.router.url.includes(`${link}`);
  }
}
