import { Response } from 'express';

interface IResponseData<T> {
  status?: number;
  message?: string;
  data?: T;
}

const sendResponse = <T>(res: Response, responseData: IResponseData<T>) => {
  return res.status(responseData?.status || 200).json({
    success: true,
    message: responseData?.message || 'Success',
    data: responseData?.data || null,
  });
};

export default sendResponse;
