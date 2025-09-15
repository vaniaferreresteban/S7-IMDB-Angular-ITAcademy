import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication';

type Status = 'pending' | 'loading' | 'error' | 'success';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
})
export class SignUp {
  private fb = inject(FormBuilder);
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  status = signal<Status>('pending');
  error = signal<string | null>(null);

  signUpForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async onSubmit(): Promise<void> {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    this.status.set('loading');
    this.error.set(null);
    const { name, email, password } = this.signUpForm.getRawValue();
    
    const { error } = await this.authService.signUp(name, email, password);
    if (error) {
      this.status.set('error');
      this.error.set(error.message);
    } else {
      this.status.set('success');
      this.router.navigateByUrl('/home');
    }
  }
}
