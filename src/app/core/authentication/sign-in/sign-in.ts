import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication';

type Status = 'pending' | 'loading' | 'error' | 'success';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterLink, 
  ],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss'],
})
export class SignIn {
  private fb = inject(FormBuilder);
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  status = signal<Status>('pending');
  error = signal<string | null>(null);

  signInForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async onSubmit(): Promise<void> {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.status.set('loading');
    this.error.set(null);

    const credentials = this.signInForm.getRawValue();
    const { error } = await this.authService.signIn(
      credentials.email,
      credentials.password,
    );

    if (error) {
      this.status.set('error');
      this.error.set(error.message);
    } else {
      this.status.set('success');
      this.router.navigateByUrl('/home');
    }
  }
}
