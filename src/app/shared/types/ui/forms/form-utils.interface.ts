export interface FormUtils<T> {
  getInput(name: keyof T | string): any;
  onSubmit(): void;
}
