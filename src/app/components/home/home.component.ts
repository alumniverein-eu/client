import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User = new User;
  greeting: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user.name = "János"
    this.getUser();
    this.greeting = this.user.greet();
  }

  getUser(): void {
    this.userService.getUser()
    .subscribe(user => this.user = user);
  }
}
