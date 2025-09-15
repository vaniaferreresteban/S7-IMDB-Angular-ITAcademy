import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationService } from '../../../core/authentication/services/authentication';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './main-navbar.html',
  styleUrl: './main-navbar.scss',
})
export class MainNavbar {
  authService = inject(AuthenticationService);

  signOut(): void {
    this.authService.signOut();
  }
}
