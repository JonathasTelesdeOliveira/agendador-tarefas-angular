import { Injectable } from '@angular/core';
import { UserResponse } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly User = 'logged_user';

  constructor() {}

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  saveUser(user: UserResponse): void {
    localStorage.setItem(this.User, JSON.stringify(user));
  }

  getUser(): UserResponse | null {
    const user = localStorage.getItem(this.User);
    if (!user) return null;
    return JSON.parse(user) as UserResponse;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.User);
  }
}
