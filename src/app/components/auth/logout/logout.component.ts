import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@helpers/services/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogoutUser(): void {
    this.authService.logout().subscribe(
      () => this.router.navigate(['/login'])
    );
  }
}
