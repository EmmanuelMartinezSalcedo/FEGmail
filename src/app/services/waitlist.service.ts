import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {
  JoinWaitlistRequest,
  JoinWaitlistResponse,
} from '../dtos/join-waitlist.dto';

@Injectable({
  providedIn: 'root',
})
export class WaitService {
  private readonly API_URL = environment.apiUrl;

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
