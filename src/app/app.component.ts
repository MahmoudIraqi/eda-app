import {Component, HostListener, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, OutletContext, RouterOutlet, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eda-app';

  constructor() {
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    debugger;
  }
}
