import { errorCatch } from '@/common';
import { EndPointes } from '@/services/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IGetOneLetsTripTourResponse,
  ILetsTripGroupTourPayload,
  ILetsTripGroupTourCreatePayload,
  ILetsTripGroupTourCreateResponse,
  ILetsTripGroupTourGetOnePayload,
  ILetsTripGroupTourResponse,
  ILetsTripGroupTourDeletePayload,
  IGetOneRawLetsTripTourResponse,
  ILetsTripTourUpdateByObjectPayload,
  UpdateByObject,
  ILetsTripGroupTourAddNewMonthPayload,
  ILetsTripGroupTourRemoveMonthPayload,
  ILetsTripGroupTourAddLocationPayload,
  ILetsTripGroupTourRemoveLocationPayload,
  ILetsTripGroupTourImagePayload,
  ILetsTripGroupTourOtherUpdatesPayload,
  ILetsTripGroupTourAddExtraInfoPayload,
  ILetsTripGroupTourRemoveExtraInfoPayload,
  ILetsTripGroupTourAddItenararyPayload,
  ILetsTripGroupTourRemoveItenararyPayload,
  ILetsTripGroupTourByCountryIdResponse,
  ILetsTripGroupTourByCountryIdPayload,
  UpdatePriceIncludes,
  UpdatePriceIncludesPayload,
} from './types';
import { LetsTripGroupTourService } from '@/services';
import { appActions } from '@/store/app';

export const getAllLetsTripGroupTour = createAsyncThunk<
  ILetsTripGroupTourResponse,
  ILetsTripGroupTourPayload
>(EndPointes.letsTripGroupTour.getAll + '/get-all', async ({ callback, page, size }, thunkApi) => {
  try {
    const response = await LetsTripGroupTourService.getAll(page, size);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getByCountryIdLetsTripGroupTour = createAsyncThunk<
  ILetsTripGroupTourByCountryIdResponse,
  ILetsTripGroupTourByCountryIdPayload
>(EndPointes.letsTripGroupTour.getByCountry, async ({ countryId, page, size }, thunkApi) => {
  try {
    const response = await LetsTripGroupTourService.getByCountryId(countryId, page, size);
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

export const getOneLetsTripTour = createAsyncThunk<
  IGetOneLetsTripTourResponse,
  ILetsTripGroupTourGetOnePayload
>(EndPointes.letsTripGroupTour.getOne + '/id', async ({ id }, thunkApi) => {
  try {
    const response = await LetsTripGroupTourService.getOneTour(id);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const getOneRawLetsTripTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourGetOnePayload
>(EndPointes.letsTripGroupTour.getOneRaw + '/id', async ({ id }, thunkApi) => {
  try {
    const response = await LetsTripGroupTourService.getOneTourRaw(id);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const createLetsTripGroupTour = createAsyncThunk<
  ILetsTripGroupTourCreateResponse,
  ILetsTripGroupTourCreatePayload
>(EndPointes.letsTripGroupTour.create + '/create', async ({ callback, ...body }, thunkApi) => {
  try {
    const response = await LetsTripGroupTourService.create(body);
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const updateByObjectLetsTripGroupTour = createAsyncThunk<
  UpdateByObject,
  ILetsTripTourUpdateByObjectPayload
>(EndPointes.letsTripTour.updateByObject + 'id', async ({ callback, id, en, ru }, thunkApi) => {
  try {
    const response = await LetsTripGroupTourService.updateByObject(id, { en, ru });
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const updatePriceNoteTripGroupTour = createAsyncThunk<
  UpdateByObject,
  ILetsTripTourUpdateByObjectPayload
>(
  EndPointes.letsTripTour.updateByObject + '/price-note/id',
  async ({ callback, id, en, ru }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.updatePriceNote(id, { en, ru });
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const updatePriceIncludesGroupTour = createAsyncThunk<
  UpdatePriceIncludes,
  UpdatePriceIncludesPayload
>(EndPointes.letsTripTour.updatePriceIncludes, async ({ callback, id, en, ru }, thunkApi) => {
  try {
    const response = await LetsTripGroupTourService.updatePriceIncludes(id, { en, ru });
    if (response.data) {
      callback();
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});

export const addNewDateLetsTripGroupTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourAddNewMonthPayload
>(
  EndPointes.letsTripGroupTour.getAll + 'tourId/add/new-month',
  async ({ callback, tourId, availableDateItem }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.addAvailableDate(tourId, availableDateItem);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const removeDateLetsTripGroupTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourRemoveMonthPayload
>(
  EndPointes.letsTripGroupTour.getAll + 'tourId/remove/availableDateItemId',
  async ({ callback, tourId, availableDateItemId }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.removeAvailableDate(
        tourId,
        availableDateItemId,
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

export const addLocationLetsTripGroupTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourAddLocationPayload
>(
  EndPointes.letsTripGroupTour.getAll + 'tourId/add/location',
  async ({ callback, tourId, lat, lng }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.addLocation(tourId, { lat, lng });
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const removeLocationLetsTripGroupTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourRemoveLocationPayload
>(
  EndPointes.letsTripGroupTour.getAll + 'tourId/remove/locationItemId',
  async ({ callback, tourId, locationItemId }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.removeLocation(tourId, locationItemId);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const addImageLetsTripGroupTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourImagePayload
>(
  EndPointes.letsTripGroupTour.getAll + 'tourId/add/image',
  async ({ callback, tourId, images }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.addImage(tourId, { images });
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteImageLetsTripGroupTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourImagePayload
>(
  EndPointes.letsTripGroupTour.getAll + 'tourId/delete/image',
  async ({ callback, tourId, images }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.deleteImage(tourId, { images });
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const otherUpdatesLetsTripGroupTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourOtherUpdatesPayload
>(
  EndPointes.letsTripGroupTour.getAll + '/update/tourId',
  async ({ callback, tourId, startingPrice, countryId }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.otherUpdates(tourId, {
        startingPrice,
        countryId,
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

export const addExtraInfoLetsTripGroupTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourAddExtraInfoPayload
>(
  EndPointes.letsTripGroupTour.getAll + '/add/tourId/extra-info/all',
  async ({ callback, tourId, en, ru }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.addExtraInfo(tourId, {
        en,
        ru,
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

export const removeExtraInfoLetsTripGroupTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourRemoveExtraInfoPayload
>(
  EndPointes.letsTripGroupTour.getAll + '/remove/tourId/extra-info/extraInfoId',
  async ({ callback, tourId, extraInfoId, lang }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.removeExtraInfo(tourId, extraInfoId, lang);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const addItenararyLetsTripGroupTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourAddItenararyPayload
>(
  EndPointes.letsTripGroupTour.getAll + '/tourId/add/itenarary',
  async ({ callback, tourId, body }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.addItenarary(tourId, body);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const removeItenararyLetsTripGroupTour = createAsyncThunk<
  IGetOneRawLetsTripTourResponse,
  ILetsTripGroupTourRemoveItenararyPayload
>(
  EndPointes.letsTripGroupTour.getAll + '/tourId/remove/tour-itenarary/tourItenararyItemId',
  async ({ callback, tourId, tourItenararyItemId }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.removeItenarary(tourId, tourItenararyItemId);
      if (response.data) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const deleteLetsTripGroupTour = createAsyncThunk<any, ILetsTripGroupTourDeletePayload>(
  EndPointes.letsTripGroupTour.delete + '/delete',
  async ({ callback, id }, thunkApi) => {
    try {
      const response = await LetsTripGroupTourService.delete(id);
      if (response.status === 204) {
        callback();
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
