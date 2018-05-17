import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@helpers/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    private authCheckResult: number;

    constructor(private router: Router, private authService: AuthService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // check for authentication on every routing process
        this.authService.check().subscribe(
            //result => console.log(result);
            result => this.authCheckResult
        );

        if (localStorage.getItem('access_token')) {
            // a token was set so we assume the user is authenticated!
            // the server side API is protected with jwt even if a fake-token is injected to localStorage!
            // return true;
            return true;
        } else {
            // if no token is set we assume the user is NOT logged in right now!
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}
