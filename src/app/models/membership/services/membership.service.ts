import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpRequestService } from '@helpers/services/http/http-request.service';

import { Membership } from '@models/membership/membership.model';
import { PaginatedMembership } from '@models/membership/paginated-membership.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private membershipEndpoint = '/membership';

  constructor(private httpRequestService: HttpRequestService) { }

  /**
   * Get memberships from server
   */
  getUsers(): Observable<PaginatedMembership> {
    return this.httpRequestService.get<PaginatedMembership>(this.membershipEndpoint);
  }

  /**
   * Get memberships from server
   * @param url: string - string of the next / previous section of the pagination (given by Laravel)
   */
  getUsersByUrl(url: string): Observable<PaginatedMembership> {
    return this.httpRequestService.get<PaginatedMembership>(url);
  }

  /**
   * Get a specific membership from server
   * @param id: number - database id of a membership
   */
  getMembership(id: number): Observable<Membership> {
    return this.httpRequestService.get<Membership>(this.membershipEndpoint+`/${id}`);
  }
}
