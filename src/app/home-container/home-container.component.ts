import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { routerTransitionSlide } from 'src/app/animation/routable.animations';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css'],
  animations: [
    routerTransitionSlide
  ]
})
export class HomeContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
