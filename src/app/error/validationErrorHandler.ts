import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { IGenericErrorResponse, TErrorSources } from '../interface/error';

const validationErrorHandler = (
  error: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errorSource: TErrorSources = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    },
  );
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: error.message,
    errorSource,
  };
};

export default validationErrorHandler;
