import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
    if (localStorage.getItem('access_token')) {
      // a token was set so we assume the user is authenticated!
      // the server side API is protected with jwt even if a fake-token is injected to localStorage!
      return true;
    }

    // if no token is set we assume the user is NOT logged in right now!
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;

  }
}
