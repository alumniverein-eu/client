import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpRequestService } from '@helpers/services/http/http-request.service';

import { Membership } from '@models/membership/membership.model';
import { PaginatedMembership } from '@models/membership/paginated-membership.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private userEndpoint = '/membership';

  constructor(private httpRequestService: HttpRequestService) { }

  /**
   * Get a specific membership from server
   * @param id: number - database id of a membership
   */
  getMembership(id: number): Observable<Membership> {
    return this.httpRequestService.get<Membership>(this.userEndpoint+`/${id}`);
  }
}
