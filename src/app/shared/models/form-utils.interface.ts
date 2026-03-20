export interface IFormUtils<T> {
  getInput(name: keyof T): any;
  onSubmit(): void;
}
