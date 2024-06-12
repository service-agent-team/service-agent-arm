import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IGetOneLetsTripTourResponse,
  ILetsTripGIndividualTourCreatePayload,
  ILetsTripIndividualAddItenararyPayload,
  ILetsTripIndividualAddPricePayload,
  ILetsTripIndividualOtherUpdatesPayload,
  ILetsTripIndividualRemoveItenararyPayload,
  ILetsTripIndividualRemovePricePayload,
  ILetsTripIndividualTour,
  ILetsTripIndividualTourByCountryIdResponse,
  ILetsTripIndividualTourByCountryPayload,
  ILetsTripIndividualTourCreateResponse,
  ILetsTripIndividualTourDeletePayload,
  ILetsTripIndividualTourGetOnePayload,
  ILetsTripIndividualTourImagePayload,
  ILetsTripIndividualTourPayload,
  ILetsTripIndividualTourResponse,
} from './types';
import { EndPointes } from '@/services/endpoints';
import { LetsTripIndividualTourService } from '@/services';
import { errorCatch } from '@/common';
import { appActions } from '@/store/app';

export const getAllLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTourResponse,
  ILetsTripIndividualTourPayload
>(EndPointes.letsTripIndividualTour.getAll + '/get-all', async ({ page, size }, thunkApi) => {
  try {
    const response = await LetsTripIndividualTourService.getAll(page, size);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getByCountryLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTourByCountryIdResponse,
  ILetsTripIndividualTourByCountryPayload
>(EndPointes.letsTripIndividualTour.getByCountry, async ({ countryId, page, size }, thunkApi) => {
  try {
    const response = await LetsTripIndividualTourService.getByCountry(countryId, page, size);
    if (response.data) {
      thunkApi.dispatch(
        appActions.setPagination({
          current: response.data.pageable.pageNumber + 1,
          pageSize: response.data.pageable.pageSize,
          total: response.data.totalElements,
        }),
      );
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const geOneLetsTripIndividualTour = createAsyncThunk<
  IGetOneLetsTripTourResponse,
  ILetsTripIndividualTourGetOnePayload
>(EndPointes.letsTripIndividualTour.getOne + '/get-one', async ({ id }, thunkApi) => {
  try {
    const response = await LetsTripIndividualTourService.getOne(id);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const geOneRawLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTour,
  ILetsTripIndividualTourGetOnePayload
>(EndPointes.letsTripIndividualTour.getOne + '/get-one/raw', async ({ id }, thunkApi) => {
  try {
    const response = await LetsTripIndividualTourService.getOneRaw(id);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTourCreateResponse,
  ILetsTripGIndividualTourCreatePayload
>(EndPointes.letsTripIndividualTour.create + '/create', async ({ callback, ...body }, thunkApi) => {
  try {
    const response = await LetsTripIndividualTourService.create(body);
    if (response.status === 201) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const addImageLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTour,
  ILetsTripIndividualTourImagePayload
>(
  EndPointes.letsTripIndividualTour.getAll + 'tourId/add/image',
  async ({ callback, tourId, images }, thunkApi) => {
    try {
      const response = await LetsTripIndividualTourService.addImage(tourId, { images });
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteImageLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTour,
  ILetsTripIndividualTourImagePayload
>(
  EndPointes.letsTripIndividualTour.getAll + '/tourId/delete/image',
  async ({ callback, tourId, images }, thunkApi) => {
    try {
      const response = await LetsTripIndividualTourService.removeImage(tourId, { images });
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const addPriceLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTour,
  ILetsTripIndividualAddPricePayload
>(
  EndPointes.letsTripIndividualTour.getAll + '/tourId/add/tour-price',
  async ({ callback, tourId, price, upToPersons, description }, thunkApi) => {
    try {
      const response = await LetsTripIndividualTourService.addPrice(tourId, {
        price,
        upToPersons,
        description,
      });
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const removePriceLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTour,
  ILetsTripIndividualRemovePricePayload
>(
  EndPointes.letsTripIndividualTour.getAll + '/tourId/remove/tour-price/priceId',
  async ({ callback, tourId, tourPriceId }, thunkApi) => {
    try {
      const response = await LetsTripIndividualTourService.removePrice(tourId, tourPriceId);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const addItenararyLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTour,
  ILetsTripIndividualAddItenararyPayload
>(
  EndPointes.letsTripIndividualTour.getAll + '/tourId/add/tour-itenarary',
  async ({ callback, tourId, body }, thunkApi) => {
    try {
      const response = await LetsTripIndividualTourService.addItenarary(tourId, body);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const removeItenararyLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTour,
  ILetsTripIndividualRemoveItenararyPayload
>(
  EndPointes.letsTripIndividualTour.getAll + '/tourId/remove/tour-itenarary/tourItenararyItemId',
  async ({ callback, tourId, tourItenararyItemId }, thunkApi) => {
    try {
      const response = await LetsTripIndividualTourService.removeItenarary(
        tourId,
        tourItenararyItemId,
      );
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const otherUpdatesLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTour,
  ILetsTripIndividualOtherUpdatesPayload
>(
  EndPointes.letsTripIndividualTour.getAll + 'update/tourId',
  async ({ callback, tourId, body }, thunkApi) => {
    try {
      const response = await LetsTripIndividualTourService.otherUpdates(tourId, body);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteLetsTripIndividualTour = createAsyncThunk<
  ILetsTripIndividualTourCreateResponse,
  ILetsTripIndividualTourDeletePayload
>(EndPointes.letsTripIndividualTour.delete + '/delete', async ({ callback, id }, thunkApi) => {
  try {
    const response = await LetsTripIndividualTourService.delete(id);
    if (response.status === 204) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
