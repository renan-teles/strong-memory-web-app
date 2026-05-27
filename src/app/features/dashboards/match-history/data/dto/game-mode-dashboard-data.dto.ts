export interface GameModeDashboardData {
  matchMode: string;
  totalMatches: number;
  totalCorrectAnswers: number;
  totalErrors: number;
  overallAccuracyPercentage: number;
  averageAccuracyPercentage: number;
  averageDurationMS: number;
  averageResponseTimeMS: number;
}
