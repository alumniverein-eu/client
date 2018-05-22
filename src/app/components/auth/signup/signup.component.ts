import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@helpers/services/auth/auth.service';
import { User } from '@models/user/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    user: User = new User();
    retype: string ='';
    properName: boolean = false;
    properMail: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(){
        this.user.name = 'János';
        this.user.email = 'janos.kovacs@example.com';
        this.user.password = 'secret';
        this.retype = 'secret';
    }

    checkName(){
        let status: number = 400;
        this.authService.checkName(this.user.name).subscribe(
            result => {
                if(result == 200) {
                    this.properName = true;
                } else {
                    this.properName = false;
                }
                //console.log(result);
            }
        )
    }

    checkMail(){
        this.authService.checkMail(this.user.email).subscribe(
            result => {
                if(result == 200) {
                    this.properMail = true;
                } else {
                    this.properMail = false;
                }
                //console.log(result);
            }
        )
    }

    onFormSubmit(){
        this.authService.signupUser(this.user).subscribe(
            result => {
                if(result == 201) {
                    alert('Signed up! Proceed with /login!');
                } else {
                    alert('Oh some error! We need to fix that!');
                }
            },
            () => this.router.navigate(['/login'])
        )
    }

}
