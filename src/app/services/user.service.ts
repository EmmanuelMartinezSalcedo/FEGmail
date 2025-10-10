import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LabelStatsResponse } from '../dtos/label-stat-response.dto';
import { ProcessedEmailsResponse } from '../dtos/processed-email-response.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLabelStats(): Observable<LabelStatsResponse> {
    return this.http.get<LabelStatsResponse>(
      `${this.API_URL}/user/label-stats`,
      {
        withCredentials: true,
      }
    );
  }

  getProcessedEmails(): Observable<ProcessedEmailsResponse> {
    return this.http.get<ProcessedEmailsResponse>(
      `${this.API_URL}/user/processed-emails`,
      {
        withCredentials: true,
      }
    );
  }
}
