import { IGenericErrorResponse, TErrorSources } from '../interface/error';

/* eslint-disable @typescript-eslint/no-explicit-any */
const duplicateErrorHandler = (error: any): IGenericErrorResponse => {
  const match = error.message.match(/"([^"]+)"/)[1];
  const errorSource: TErrorSources = [
    {
      path: '',
      message: `${match} in already exist`,
    },
  ];
  return {
    statusCode: 400,
    message: `${match} is already exists`,
    errorSource,
  };
};

export default duplicateErrorHandler;
