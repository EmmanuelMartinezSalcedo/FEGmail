import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface JoinWaitlistResponse {
  success: boolean;
  message: string;
}

interface JoinWaitlistRequest {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class WaitService {
  private readonly API_URL = 'https://localhost:3000';

  constructor(private http: HttpClient) {}

  joinWaitlist(payload: JoinWaitlistRequest): Observable<JoinWaitlistResponse> {
    return this.http.post<JoinWaitlistResponse>(
      `${this.API_URL}/waitlist/add-email`,
      payload,
      {
        withCredentials: true,
      }
    );
  }
}
