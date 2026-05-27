import { MatchMode } from '../../../features/game/domain/enums/match-mode.enum';

export function getRed(alpha: number = 0.7): string {
  return `rgba(220, 53, 69, ${alpha})`;
}

export function getGreen(alpha: number = 0.7): string {
  return `rgba(25, 135, 84, ${alpha})`;
}

export function getBlue(alpha: number = 0.7): string {
  return `rgba(13, 110, 253, ${alpha})`;
}

export function getYellow(alpha: number = 0.7): string {
  return `rgba(255, 193, 7, ${alpha})`;
}

export function getDifficultyColor(difficulty: string, alpha: number = 0.7): string {
  switch (difficulty.toLowerCase()) {
    case 'fácil':
      return getGreen(alpha);

    case 'normal':
      return getYellow(alpha);

    case 'difícil':
      return getRed(alpha);

    default:
      return getBlue(alpha);
  }
}

export function getModeColor(mode: string, alpha: number): string {
  switch (mode.toUpperCase()) {
    case MatchMode.FINITE:
      return getGreen(alpha);

    case MatchMode.INFINITE:
      return getBlue(alpha);

    default:
      return getYellow(alpha);
  }
}
