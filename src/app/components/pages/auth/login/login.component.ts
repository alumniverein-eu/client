import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@helpers/services/auth/auth.service';
import { Credentials } from '@helpers/services/auth/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = new Credentials();
  loginFormGroup: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['juliankamphausen@gmx.com', Validators.required],
      password: ['secret', Validators.required]
    });
  }

  onFormSubmit(): void {
    this.credentials.email = this.loginFormGroup.get('email').value;
    this.credentials.password = this.loginFormGroup.get('password').value;
    this.authService.attemptLogin(this.credentials).subscribe(
        res => {
          if(res == true) this.router.navigate(['/home']);
        },
        (err) => alert('Wrong credentials!')
    );
  }
}
