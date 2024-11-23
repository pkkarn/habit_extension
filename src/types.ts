export interface Activity {
  id: string;
  content: string;
  timestamp: string;
  category: string;
  points: number;
  lastEntryDate?: string;
}

export interface ActivityState {
  activities: Activity[];
  totalPoints: number;
}