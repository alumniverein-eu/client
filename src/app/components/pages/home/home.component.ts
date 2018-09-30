import { Component, OnInit } from '@angular/core';

import { User } from '@models/user/user.model';
import { AuthService } from '@helpers/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User = new User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

 /*
  * Get the currently authenticated user from AuthService
  */
  getUser() {
    this.authService.getAuthUser()
    .subscribe(result => this.user = result);
  }
}
