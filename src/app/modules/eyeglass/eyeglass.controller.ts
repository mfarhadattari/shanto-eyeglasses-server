import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EyeglassServices } from './eyeglass.service';

// add eyeglass controller
const addEyeglass = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.file;
  const result = await EyeglassServices.addEyeglass(file, data);

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'Eyeglass added successfully',
    data: result,
  });
});

// get all eyeglasses controller
const getEyeglasses = catchAsync(async (req, res) => {
  const searchQuery = req.query;
  const result = await EyeglassServices.getEyeglasses(searchQuery);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Eyeglasses retrieve successfully',
    data: result,
  });
});

// get eyeglass controller
const getEyeglass = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await EyeglassServices.getEyeglass(id);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Eyeglass retrieve successfully',
    data: result,
  });
});

// update eyeglass controller
const updateEyeglass = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await EyeglassServices.updateEyeglass(id, data);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Eyeglass updated successfully',
    data: result,
  });
});

// delete eyeglass controller
const deleteEyeglass = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await EyeglassServices.deleteEyeglass(id);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Eyeglass deleted successfully',
    data: result,
  });
});

// exporting eyeglass controllers
export const EyeglassControllers = {
  addEyeglass,
  getEyeglasses,
  getEyeglass,
  updateEyeglass,
  deleteEyeglass,
};
