import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication/services/authentication';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  authService = inject(AuthenticationService);
}
