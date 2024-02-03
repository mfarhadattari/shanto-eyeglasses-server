/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import castErrorHandler from '../error/castErrorHandler';
import duplicateErrorHandler from '../error/duplicateErrorHandler';
import validationErrorHandler from '../error/validationErrorHandler';
import zodErrorHandler from '../error/zodErrorHandler';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = err?.status || 500;
  let message = err?.message || 'Something went wrong';

  let errorSource = [
    {
      path: '',
      message: err?.message,
    },
  ];

  // ------------>> handling error <<------------
  if (err.name === 'CastError') {
    const castError = castErrorHandler(err);
    status = castError.statusCode;
    message = castError.message;
    errorSource = castError.errorSource;
  } else if (err instanceof ZodError) {
    const zodError = zodErrorHandler(err);
    status = zodError.statusCode;
    message = zodError.message;
    errorSource = zodError.errorSource;
  } else if (err.code === 11000) {
    const duplicateError = duplicateErrorHandler(err);
    status = duplicateError.statusCode;
    message = duplicateError.message;
    errorSource = duplicateError.errorSource;
  } else if (err.name === 'ValidationError') {
    const ValidationError = validationErrorHandler(err);
    status = ValidationError.statusCode;
    message = ValidationError.message;
    errorSource = ValidationError.errorSource;
  }

  res.status(status).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
