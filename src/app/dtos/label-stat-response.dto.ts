export interface LabelStatsResponse {
  labelStats: LabelStat[];
  errors: any;
}

export interface LabelStat {
  userId: number;
  labelName: string;
  emailCount: number;
  id: number;
  domainEvents: any[];
}
