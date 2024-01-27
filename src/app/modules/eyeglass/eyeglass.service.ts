import QueryBuilder from '../../utils/QueryBuilder';
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

// get all eyeglasses service
const getEyeglasses = async (searchQuery: Record<string, unknown>) => {
  const modelQuery = Eyeglass.find();
  const eyeglassQuery = new QueryBuilder(modelQuery, searchQuery)
    .searching(['name'])
    .filtering()
    .paginating();

  const result = await eyeglassQuery.modelQuery;
  return result;
};

// get single eyeglass service
const getEyeglass = async (id: string) => {
  const result = await Eyeglass.findById(id);
  return result;
};

// update eyeglass service
const updateEyeglass = async (id: string, payload: Partial<IEyeglass>) => {
  // updating eyeglass
  const { otherRelevantAttributes, ...remainingEyeglassInfo } = payload;
  const modifiedEyeglassInfo: Record<string, unknown> = {
    ...remainingEyeglassInfo,
  };

  const relevantAttributes = otherRelevantAttributes as Record<string, unknown>;
  if (relevantAttributes && Object.keys(relevantAttributes).length) {
    for (const [key, value] of Object.entries(relevantAttributes)) {
      modifiedEyeglassInfo[`otherRelevantAttributes.${key}`] = value;
    }
  }

  await Eyeglass.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    upsert: true,
  });

  // getting updated eyeglass
  const result = await Eyeglass.findById(id);
  return result;
};

// delete eyeglass service
const deleteEyeglass = async (id: string) => {
  await Eyeglass.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return null;
};

// exporting eyeglass services
export const EyeglassServices = {
  addEyeglass,
  getEyeglasses,
  getEyeglass,
  updateEyeglass,
  deleteEyeglass,
};
