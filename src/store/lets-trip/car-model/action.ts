import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { CarModelService } from '@/services';
import { ICarModel, ICreateCarModelPayload, ISetImagePayload, ImageSet } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICarModelPayload, ICarModelResponse } from './types';

export const GetAllCarModel = createAsyncThunk<ICarModelResponse, ICarModelPayload>(
  'get/model',
  async ({ callback, page, size }, thunkApi) => {
    try {
      const response = await CarModelService.getAllCarModel(page as number, size as number);
      if (response.data) {
        callback(response.data);
      }

      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const SetImage = createAsyncThunk<ImageSet, ISetImagePayload>(
  '/set/image',
  async ({ data, callback }, thunkApi) => {
    try {
      const response = await CarModelService.setImage(data);

      if (response.data) {
        callback();
      }

      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const CreateCarModel = createAsyncThunk<ICarModel, ICreateCarModelPayload>(
  'cerate/model',
  async ({ data, callback }, thunkApi) => {
    try {
      const response = await CarModelService.createCarModel(data);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

// export const UpdateCarModel = createAsyncThunk<any, ICarModelUpdatePayload>(
//   'cerate/model',
//   async ({ body, id, callback }, thunkApi) => {
//     try {
//       const response = await CarModelService.updateCarModel(body, id);
//       if (response.data) {
//         callback(response.data);
//       }
//       return response.data;
//     } catch (error) {
//       addNotification(error);
//       return thunkApi.rejectWithValue({ error: errorCatch(error) });
//     }
//   },
// );
