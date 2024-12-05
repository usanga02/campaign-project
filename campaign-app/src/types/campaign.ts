export interface Campaign {
  id: number;
  name: string;
  daily_budget: number;
  total_budget: number;
  files: string[];
  from: string;
  to: string;
}
