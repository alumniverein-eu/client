import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpRequestService } from '@helpers/services/http/http-request.service';

import { User } from '@models/user/user.model';
import { PaginatedUser } from '@models/user/paginated-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userEndpoint = '/user';

  constructor(private httpRequestService: HttpRequestService) {}

  /**
   * Get users from server
   */
  getUsers(): Observable<PaginatedUser> {
    return this.httpRequestService.get<PaginatedUser>(this.userEndpoint);
  }

  /**
   * Get users from server
   * @param url: string - string of the next / previous section of the pagination (given by Laravel)
   */
  getUsersByUrl(url: string): Observable<PaginatedUser> {
    return this.httpRequestService.get<PaginatedUser>(url);
  }

  /**
   * Get a specific user from server
   * @param id: number - database id of a user
   */
  getUser(id: number): Observable<User> {
    return this.httpRequestService.get<User>(this.userEndpoint+`/${id}`);
  }

  
}
