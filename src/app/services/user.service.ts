import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LabelStat {
  userId: number;
  labelName: string;
  emailCount: number;
  id: number;
  domainEvents: any[];
}

export interface LabelStatsResponse {
  labelStats: LabelStat[];
  errors: any;
}

export interface ProcessedEmail {
  processedAt: string;
  labelAssigned: string;
}

export interface ProcessedEmailsResponse {
  emails: ProcessedEmail[];
  errors: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL =
    'https://gmailorganizerweb20251003064031-ghapafesajdqa7gy.canadacentral-01.azurewebsites.net';

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
