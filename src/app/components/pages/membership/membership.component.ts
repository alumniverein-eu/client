import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '@models/user/user.model';
import { Membership } from '@models/membership/membership.model';
import { MembershipService } from '@models/membership/services/membership.service';

import { AuthService } from '@helpers/services/auth/auth.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss'],
})
export class MembershipComponent implements OnInit {

  projectList = [
    {value: 'sbe', viewValue: 'SchulBrücke Europa'},
    {value: 'sbw', viewValue: 'SchulBrücke Weimar'},
    {value: 'ept', viewValue: 'Europaprojekttage'},
    {value: 'other', viewValue: 'Anderes Projekt'}
  ];

  feeTypes = [
    {value: 12, viewValue: 'Student (1 EUR/Month)'},
    {value: 24, viewValue: 'Working (2 EUR/Month)'},
    {value: 96, viewValue: 'Supporter (8 EUR/Month)'}
  ];

  user: User = new User;
  membership: Membership;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(  private authService: AuthService,
                private membershipService: MembershipService,
                private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUser();

    this.firstFormGroup = this._formBuilder.group({
      dob: ['1992-01-01', Validators.required],
      street: ['Abc ut 1.', Validators.required],
      city: ['Budapest', Validators.required],
      postcode: ['1124', Validators.required],
      country: ['Hungary', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      amount: ['12', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      project: ['sbe', Validators.required]
    });

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

  onFormSubmit(){
    this.membership = {
      user_id: this.user.id,
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value
    };
    //console.log(this.membership);
    this.membershipService.createMembership(this.membership)
    .subscribe(result => this.getUser());
  }
}
