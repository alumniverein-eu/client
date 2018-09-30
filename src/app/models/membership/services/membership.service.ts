import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpRequestService } from '@helpers/services/http-request/http-request.service';

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

  endMembership(membership: Membership): Observable<number> {
    let t = new Date();
    //t.setHours(t.getHours() - t.getTimezoneOffset()/60);  //add TZ offset in hours
    //t.toISOString();   //ISO is local time by above trick
    let d = this.formatDate(t);
    console.log(d);
    let body = new FormData();
    body.append('end_at', String(d));
    body.append('_method', 'PATCH');
    return this.httpRequestService.post<number>(this.membershipEndpoint + '/' + membership.id, body);
  }

  activateMembership(membership: Membership): Observable<number> {
    let body = new FormData();
    body.append('end_at', '');
    body.append('_method', 'PATCH');
    return this.httpRequestService.post<number>(this.membershipEndpoint + '/' + membership.id, body);
  }

  private formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
