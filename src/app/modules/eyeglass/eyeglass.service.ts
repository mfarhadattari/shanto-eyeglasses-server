import { uploadFileIntoCloud } from '../../utils/fileUpload';
import { IEyeglass } from './eyeglass.interface';
import { Eyeglass } from './eyeglass.model';

// add eyeglass service
const addEyeglass = async (file: any, payload: IEyeglass) => {
  // upload file
  const { secure_url } = (await uploadFileIntoCloud(file)) as any;
  payload.image = secure_url;
  // save into db
  const result = await Eyeglass.create(payload);
  return result;
};

// exporting eyeglass services
export const EyeglassServices = { addEyeglass };
