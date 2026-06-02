/*
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR');
}
*/

export function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);

  const monthIdex = month - 1;
  return new Date(year, monthIdex, day).toLocaleDateString('pt-BR');
}
