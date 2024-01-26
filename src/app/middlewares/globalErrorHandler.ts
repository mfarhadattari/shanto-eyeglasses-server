/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err?.status || 500;
  const message = err?.message || 'Something went wrong';

  const errorSource = [
    {
      path: '',
      message: err?.message,
    },
  ];

  res.status(status).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
