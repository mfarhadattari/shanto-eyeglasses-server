import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { IGenericErrorResponse, TErrorSources } from '../interface/error';

const castErrorHandler = (
  error: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const errorSource: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: `${error.value} is not a valid ID!`,
    errorSource,
  };
};

export default castErrorHandler;
