import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoginResponse } from '../dtos/login-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`${this.API_URL}/auth/login`, {
      withCredentials: true,
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
