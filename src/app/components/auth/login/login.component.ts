import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Credentials } from '../../../services/auth/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = new Credentials();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.credentials.email = 'user@example.com'
    this.credentials.password = 'secret';
  }

  onFormSubmit(form: ngForm): void {
    console.log(form);
    this.authService.attemptLogin(this.credentials)
    .subscribe(response => console.log(response));
  }

}
