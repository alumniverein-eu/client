import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { AuthService } from '@helpers/services/auth/auth.service';
import { User } from '@models/user/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    user: User;
    signupFormGroup: FormGroup;

    constructor(private authService: AuthService,
                private router: Router,
                private formBuilder: FormBuilder) { }

    ngOnInit(){
      this.signupFormGroup = this.formBuilder.group({
        name: [ 'janko',Validators.required],
        firstname: ['János', Validators.required],
        lastname: ['Kovács', Validators.required],
        email: ['janos.kovacs@example.com', [Validators.required, Validators.email], [], { updateOn: 'blur' }],
        password: ['secret', Validators.required],
        passwordConfirm: ['secret', Validators.required]
      }, {
        validator: this.MatchPassword // your validation method
      });
    }

    onFormSubmit(){
      this.user = this.signupFormGroup.value;
      console.log(this.user);
      this.authService.signupUser(this.user).subscribe(
          result => {
              if(result == 202) {
                  alert('Signed up! Proceed with /login!');
                  this.router.navigate(['/login']);
              } else {
                  alert('Oh some error! We need to fix that!');
              }
          }
      );
    }

    MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value; // to get value in input tag
        const confirmPassword = AC.get('passwordConfirm').value; // to get value in input tag
        if (password !== confirmPassword) {
          return {MatchPassword: true};
        } else {
            return null
        }
    }
}
