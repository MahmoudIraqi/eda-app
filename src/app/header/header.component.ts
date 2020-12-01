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
      link: '/home'
    },
    {
      name: 'Create requests',
      link: '/new-request'
    },
    {
      name: 'Track requests',
      link: '/track-request'
    },
    {
      name: 'Draft requests',
      link: '/draft-request'
    },
    {
      name: 'Approved products',
      link: '/approved-request'
    },
    {
      name: 'Contact us',
      link: '#'
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
