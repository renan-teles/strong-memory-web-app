export interface OverviewDashboardData {
  totalMatches: number;
  averageCorrectAnswersPerMatch: number;
  averageErrorsPerMatch: number;
  totalCorrectAnswers: number;
  totalErrors: number;
  totalAnswered: number;
  overallAccuracyPercentage: number;
  averageAccuracyPercentage: number;
  averageResponseTimeMS: number;
  averageMatchDurationMS: number;
  averageScoreAchieved: number;
  bestScoreAchieved: number;
  gaveUpPercentage: number;
  gameOverPercentage: number;
  timeoutPercentage: number;
  completedPercentage: number;
  totalTimeoutMatches: number;
  totalCompletedMatches: number;
  totalGameOverMatches: number;
  totalGaveUpMatches: number;
  totalNotCompletedMatches: number;
}
