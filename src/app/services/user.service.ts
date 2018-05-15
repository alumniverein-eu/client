import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpRequestService } from './http/http-request.service';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userEndpoint = '/user';

  constructor(private httpRequestService: HttpRequestService) {}

  getUsers(): Observable<User[]> {
    return this.httpRequestService.get<User[]>(this.userEndpoint);
  }

  /** GET user from the server */
  getUser(id: number = 1): Observable<User> {
    return this.httpRequestService.get<User>(this.userEndpoint+`/${id}`);
  }
}
