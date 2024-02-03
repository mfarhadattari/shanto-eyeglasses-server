import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';

const zodErrorHandler = (error: ZodError) => {
  const message = error.issues
    .map((issue) => `${issue.path[issue.path.length - 1]} is ${issue.message}`)
    .join('. ')
    .toLowerCase();

  const errorSource: TErrorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1] as string,
      message: issue?.message,
    };
  });

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message,
    errorSource,
  };
};

export default zodErrorHandler;
