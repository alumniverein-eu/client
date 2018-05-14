import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://127.0.0.1:8000/api/user/1';  // URL to web api
  //private headers = new HttpHeaders();
  //private options = new RequestOptions({ headers: this.headers });

  constructor(private http: HttpClient) {
    //this.headers.append('Content-Type', 'application/json');
    //this.headers.append('Accept', 'application/json');
    //this.headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE1MjYwNDAyMDAsImV4cCI6MTUyODYzMjIwMCwibmJmIjoxNTI2MDQwMjAwLCJqdGkiOiJMSEVmWVlobldoWTJRV3R2In0.wqeR0lnoeRPjg2eMp3aummWkxWs5vB8l4grpqcLZSfQ');
  }

  /** GET heroes from the server */
  getUser(): Observable<User> {
    //return this.http.get<User>(this.usersUrl, this.options);
    return this.http.get<User>(this.usersUrl);
  }
}
