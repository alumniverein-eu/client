import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials } from './credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000/api';
  private helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return this.helper.isTokenExpired(token);
  }

  /**
   * Send login request to server and attempt authentication.
   * @param credentials: Credentials - contains email and password for login@server
   */
  attemptLogin(credentials: Credentials) {
    // POST credentials to back-end, receive token, save it to localStorage for further requests
    return this.http.post(this.baseUrl+'/login', credentials).pipe(
        tap(result => this.saveTokenToStorage(result)),
        map(result => 'Logged in!'),
        catchError(this.handleError('attemptLogin', []))
    );
  }

  /**
   * Logout the current User
   */
  logout() {
    let oldToken = localStorage.getItem('access_token');
    // POST empty request to logout@server, jwt will be attached and blacklisted on server
    return this.http.post(this.baseUrl+'/auth/logout', null).pipe(
        tap( result => {
          // delete credentials from localStorage
          localStorage.removeItem('access_token');
          
        }),
        //map( result => 'blacklisted: ' + oldToken ),
        map( result => 'Logged out!' ),
        catchError(this.handleError('logout', []))
    );
  }

  /**
   * Save the access_token to localStorage
   * @param loginResult - result from attemptLogin
   */
  private saveTokenToStorage(loginResult){
    localStorage.setItem('access_token', loginResult.token);
  }

  /** source: Angular.io
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      return of(result as T);
    };
  }

}
