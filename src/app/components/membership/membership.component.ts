import { Component, OnInit } from '@angular/core';

import { User } from '@models/user/user.model';
import { Membership } from '@models/membership/membership.model';
import { AuthService } from '@helpers/services/auth/auth.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {

  user: User = new User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user.name = "János"
    this.getUser();
  }

  getUser() {
    this.authService.getAuthUser()
    .subscribe(result => this.user = result);
  }
}
