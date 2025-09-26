import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  url: string;
  state: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://localhost:3000';

  constructor(private http: HttpClient) {}

  login(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`${this.API_URL}/auth/login`, {
      withCredentials: true, // 👈 clave
    });
  }

  isAuthenticated(): boolean {
    try {
      const cookies = document.cookie.split(';').map((c) => c.trim());
      const jwtCookie = cookies.find((cookie) => cookie.startsWith('jwt='));

      if (!jwtCookie) {
        return false;
      }

      const token = jwtCookie.substring(4);
      return token.length > 0;
    } catch (error) {
      return false;
    }
  }
}
