export function msToSeconds(ms: number): number {
  return +(ms / 1000).toFixed(1);
}

export function msToMinutes(ms: number): number {
  return +(ms / 1000 / 60).toFixed(1);
}

export function msToMinutesAndSeconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}min ${seconds}s`;
}

export function secondsToMinutesAndSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}min ${remainingSeconds}s`;
}
