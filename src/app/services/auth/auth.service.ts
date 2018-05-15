import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials } from './credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://127.0.0.1:8000/api/login';
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

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

  attemptLogin(credentials: Credentials) {
    //return alert(credentials);
    return this.http.post(this.authUrl, credentials)
      .pipe(
        map(response => {
          localStorage.setItem('access_token', response.token)
          return 'Logged in.';
        });
      );
  }

}
