import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// import custom helpers
import { JwtHelperService } from '@auth0/angular-jwt';

// import models & classes
import { Credentials } from '@helpers/services/auth/credentials';
import { User } from '@models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000/api';
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public check(): Observable<boolean> {
    // get the token
    const token = this.getToken();
    return this.http.get<boolean>(this.baseUrl+'/auth/check', { observe: 'body' }).pipe(
        map(response => response['data'])
    );
  }

  /**
   * Request the currently authenticated user by  token (which will be attached!)
   */
  public getAuthUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl+'/auth/user');
  }

  /**
   * Send login request to server and attempt authentication.
   * @param credentials: Credentials - contains email and password for login@server
   */
  public attemptLogin(credentials: Credentials) {
    // POST credentials to back-end, receive token, save it to localStorage for further requests
    return this.http.post(this.baseUrl+'/login', credentials).pipe(
        tap(result => this.saveTokenToStorage(result)),
        catchError(this.handleError('attemptLogin', []))
    );
  }

  /**
   * Logout the current User
   */
  public logout() {
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
    localStorage.setItem('access_token', loginResult.data);
  }

  /**
   *
   * @param mail: string -
   */
  public checkMail(mail: string): Observable<number> {
    // POST credentials to back-end, receive token, save it to localStorage for further requests
    return this.http.post<number>(this.baseUrl+'/sgnp/checkmail', {'email':mail}, { observe: 'response' }).pipe(
        map(response => response.status),
        catchError(this.handleError('checkMail', 400))
    );
  }

  /**
   *
   * @param name: string -
   */
  public checkName(name: string): Observable<number> {
    // POST credentials to back-end, receive token, save it to localStorage for further requests
    return this.http.post<number>(this.baseUrl+'/sgnp/checkname', {'name':name}, { observe: 'response' }).pipe(
        map(response => response.status),
        catchError(this.handleError('checkName', 400))
    );
  }

  /**
   *
   * @param mail: string -
   */
  public signupUser(user: User): Observable<number> {
      let body = new FormData();
      body.append('name', user.name);
      body.append('email', user.email);
      body.append('password', user.password);

    //console.log(JSON.stringify(user));
    // POST credentials to back-end, receive token, save it to localStorage for further requests
    return this.http.post<number>(this.baseUrl+'/signup', body, { observe: 'response' }).pipe(
        map(response => response.status),
        catchError(this.handleError('signupUser', 400))
    );
  }

  /** source: Angular.io
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error); // log to console
      //console.log(error);
      return of(result as T);
    };
  }

}
