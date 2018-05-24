import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

  /**
   * Get a specific membership from server
   * @param id: number - database id of a membership
   */
  createMembership(membership: Membership): Observable<number> {
    let body = new FormData();
    body.append('amount', String(membership.amount));
    body.append('project', membership.project);
    body.append('street', membership.street);
    body.append('city', membership.city);
    body.append('postcode', membership.postcode);
    body.append('user_id', String(membership.user_id));
    return this.httpRequestService.post<number>(this.membershipEndpoint, body);
  }
}
