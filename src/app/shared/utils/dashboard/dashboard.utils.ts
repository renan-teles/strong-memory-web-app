import { MatchMode } from '../../../features/game/domain/enums/match-mode.enum';

export function translateMatchMode(mode: string): string {
  if (!mode) return '';

  if (mode === MatchMode.FINITE) return 'FINITO';
  if (mode === MatchMode.INFINITE) return 'INFINITO';
  return mode;
}

export function groupDataBy<T>(array: T[], keySelector: (item: T) => string): Record<string, T[]> {
  return array.reduce(
    (acc, item) => {
      const key = keySelector(item);

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);

      return acc;
    },
    {} as Record<string, T[]>,
  );
}
