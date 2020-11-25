import { Component } from '@angular/core';
import {ActivatedRoute, Router, OutletContext, RouterOutlet, RouterEvent} from '@angular/router';
import { routerTransitionSlide } from 'src/app/animation/routable.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routerTransitionSlide
  ]
})
export class AppComponent {
  title = 'eda-app';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
