import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  socialMediaList = [
    'fab fa-facebook-f',
    'fab fa-twitter',
    'fab fa-youtube',
    'fab fa-instagram'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
