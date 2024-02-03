export type TErrorSources = { path: string; message: string }[];
export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorSource: TErrorSources;
}
