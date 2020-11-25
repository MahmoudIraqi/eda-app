import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  socialMediaList = [
    'fab fa-facebook-f',
    'fab fa-twitter',
    'fab fa-youtube',
    'fab fa-instagram'
  ];

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
      name: 'Approved requests',
      link: '/approved-request'
    },
    {
      name: 'Contact us',
      link: '#'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
