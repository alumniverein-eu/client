import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://127.0.0.1:8000/api/user/1';

  constructor(private http: HttpClient) {}

  /** GET user from the server */
  getUser(): Observable<User> {
    return this.http.get<User>(this.usersUrl);
  }
}
