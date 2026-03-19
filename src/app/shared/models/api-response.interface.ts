export interface IApiResponse<T> {
  message: string;
  data?: T;
  status: number;
}
