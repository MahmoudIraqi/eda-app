import {Component, HostListener, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FormService} from '../services/form.service';
import {FormBuilder} from '@angular/forms';
import {InputService} from '../services/input.service';
import {distinctUntilChanged, filter} from 'rxjs/operators';

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
          link: '/new-request/tell_do_variation'
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
          link: '/draft-request/tell_do_variation'
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
          name: 'Legacy',
          link: '/draft-request/legacy'
        },
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
          link: '/track-request/tell_do_variation'
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
        },
        {
          name: 'Legacy',
          link: '/track-request/legacy'
        },
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
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  Token;

  constructor(private fb: FormBuilder,
              private getService: FormService,
              private inputService: InputService,
              private router: Router,
              private route: ActivatedRoute) {
    this.onResize();
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'Token'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.Token = res.payload;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  isActive(link) {
    return this.router.url.includes(`${link}`);
  }

  logoutFunction() {
    this.getService.logoutAPIToken(this.Token).subscribe((res: any) => {
      if (res) {
        this.isLoading = false;
        this.alertNotificationStatus = true;
        this.router.navigateByUrl('/login');
        // this.inputService.publish({type: 'Token', payload: ''});
      } else {
        this.alertErrorNotificationStatus = true;
      }
    }, error => this.handleError(error));
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }
}
