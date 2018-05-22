import { Component, OnInit } from '@angular/core';

import { User } from '@models/user/user.model';
import { Membership } from '@models/membership/membership.model';
import { MembershipService } from '@models/membership/services/membership.service';

import { AuthService } from '@helpers/services/auth/auth.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {

  user: User = new User;
  membership: Membership = new Membership;

  constructor(  private authService: AuthService,
                private membershipService: MembershipService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getAuthUser()
    .subscribe(result => {
        this.user = result;
        this.getMembership(this.user.id);
    });
  }

  getMembership(id: number) {
    this.membershipService.getMembership(id)
    .subscribe(result => this.membership = result);
  }
}
