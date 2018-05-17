import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import custom helpers
import { AuthGuard }            from '@helpers/guards/auth.guard';

// import components
import { HomeComponent }        from '@components/home/home.component';
import { MembershipComponent }  from '@components/membership/membership.component';
import { LoginComponent }       from '@components/auth/login/login.component';
import { SignupComponent }       from '@components/auth/signup/signup.component';

const routes: Routes = [
    {path: '', canActivate:[AuthGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'membership', component: MembershipComponent },
      //{ path : 'edit/:id', component : EditComponent }
    ]},
    //{ path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
