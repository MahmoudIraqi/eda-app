import {Component, OnInit} from '@angular/core';

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
      link: '#'
    },
    {
      name: 'About',
      link: '#'
    },
    {
      name: 'Health products',
      link: '#'
    },
    {
      name: 'Services',
      link: '#'
    },
    {
      name: 'FAQ',
      link: '#'
    },
    {
      name: 'Media Center',
      link: '#'
    },
    {
      name: 'Careers',
      link: '#'
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
