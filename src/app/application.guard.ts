import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {FormService} from './services/form.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuard implements CanActivate {
  constructor(private getService: FormService, private readonly route: ActivatedRoute) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.getService.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }

}
