import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FormService} from './services/form.service';
import {InputService} from './services/input.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuard implements CanActivate {
  constructor(private getService: FormService, private readonly route: ActivatedRoute,
              private inputService: InputService, private readonly routing: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('1234', this.getService.isLoggedIn);
    if (this.getService.isLoggedIn) {
      return true;
    } else {
      this.routing.navigateByUrl('/login');
      this.inputService.publish({type: 'Token', payload: ''});
      return false;
    }
  }

}
