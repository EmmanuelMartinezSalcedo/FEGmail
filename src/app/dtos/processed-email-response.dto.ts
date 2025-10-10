export interface ProcessedEmail {
  processedAt: string;
  labelAssigned: string;
}

export interface ProcessedEmailsResponse {
  emails: ProcessedEmail[];
  errors: any;
}
