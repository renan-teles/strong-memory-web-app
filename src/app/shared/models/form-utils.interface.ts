export interface IFormUtils<T> {
  getInput(name: keyof T | string): any;
  onSubmit(): void;
}
