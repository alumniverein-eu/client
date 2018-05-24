import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@helpers/services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogoutUser(): void {
    this.authService.logout().subscribe(
      () => this.router.navigate(['/login'])
    );
  }
}
