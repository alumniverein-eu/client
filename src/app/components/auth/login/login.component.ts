import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@helpers/services/auth/auth.service';
import { Credentials } from '@helpers/services/auth/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = new Credentials();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.credentials.email = 'user@example.com'
    this.credentials.password = 'secret';
  }

  onFormSubmit(): void {
    this.authService.attemptLogin(this.credentials).subscribe(
        () => this.router.navigate(['/home'])
    );
  }
}
