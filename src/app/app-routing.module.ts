import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import custom helpers
import { AuthGuard }            from '@helpers/guards/auth.guard';

// import components
import { HomeComponent }        from '@components/pages/home/home.component';
import { MembershipComponent }  from '@components/pages/membership/membership.component';
import { LoginComponent }       from '@components/pages/auth/login/login.component';
import { SignupComponent }       from '@components/pages/auth/signup/signup.component';
import { SettingsComponent } from '@components/pages/settings/settings.component';

const routes: Routes = [
    {path: '', canActivate:[AuthGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'membership', component: MembershipComponent },
      { path: 'settings', component: SettingsComponent },

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
