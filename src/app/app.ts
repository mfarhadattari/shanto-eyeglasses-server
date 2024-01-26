import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from './config';
import { Routes } from './routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: config.CLIENT_BASE_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);
app.use(cookieParser());

// application routes
app.use('/api', Routes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: httpStatus.OK,
    message: 'Eyeglasses Management Server is running',
    data: null,
  });
});

export default app;
