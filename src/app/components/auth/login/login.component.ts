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
  loggedin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.credentials.email = 'user@example.com'
    this.credentials.password = 'secret';
  }

  onFormSubmit(): void {
    this.authService.attemptLogin(this.credentials).subscribe(
      response => console.log(response)
    );
  }

  onLogoutUser(): void {
    this.authService.logout().subscribe(
      response => console.log(response)
    );
  }

}
