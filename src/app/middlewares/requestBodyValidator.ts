import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const requestBodyValidator = (validationSchema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await validationSchema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    return next();
  });
};

export default requestBodyValidator;
