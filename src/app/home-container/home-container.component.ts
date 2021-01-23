import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, OutletContext, RouterOutlet, RouterEvent} from '@angular/router';
import { routerTransitionSlide } from 'src/app/animation/routable.animations';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
