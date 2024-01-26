import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from './config';

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

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: httpStatus.OK,
    message: 'Eyeglasses Management Server is running',
    data: null,
  });
});

export default app;
