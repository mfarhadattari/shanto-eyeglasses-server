import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from './config';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import { Routes } from './routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: [config.CLIENT_BASE_URL],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  }),
);

// application routes
app.use('/api', Routes);

// base route
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: httpStatus.OK,
    message: 'Eyeglasses Management Server is running',
    data: {
      clientApi: config.CLIENT_BASE_URL,
    },
  });
});

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;
