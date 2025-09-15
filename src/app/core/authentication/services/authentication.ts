import {
  Injectable,
  signal,
  computed,
  inject,
  NgZone,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  createClient,
  SupabaseClient,
  User,
  AuthError,
  AuthResponse,
} from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private supabase: SupabaseClient | null = null;
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  currentUser = signal<User | null>(null);
  isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.supabase = createClient(
        environment.SUPABASE_URL,
        environment.SUPABASE_KEY,
      );

      this.supabase.auth.onAuthStateChange((event, session) => {
        
        this.ngZone.run(() => {
          this.currentUser.set(session?.user ?? null);
        });
      });
    }
  }
  private createServerError(): AuthResponse {
    return {
      data: { user: null, session: null },
      error: new AuthError(
        'La autenticación no está disponible en el servidor.',
      ),
    };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    if (!this.supabase) return this.createServerError();
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    if (!this.supabase) return this.createServerError();
    return await this.supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
  }

  async signOut(): Promise<{ error: AuthError | null }> {
    let result: { error: AuthError | null } = { error: null };
    if (!this.supabase) {
      result = {
        error: new AuthError(
          'La autenticación no está disponible en el servidor.',
        ),
      };
    } else {
      result = await this.supabase.auth.signOut();
    }
    this.router.navigate(['/sign-in']);

    return result;
  }
}
