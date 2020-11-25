import { Component } from '@angular/core';
import { routerTransitionFading, routerTransitionSlide, routerTransitionSlideUpDown, routerTransitionFadingStagger } from 'src/app/animation/routable.animations';

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
}
