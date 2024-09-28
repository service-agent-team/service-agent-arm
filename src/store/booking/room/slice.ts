import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';
import {
  createRoomTranslation,
  deleteRoomTranslation,
  getAllRoom,
  getByPropertyRoom,
  getOneRoom,
  getOneRoomTranslation,
} from './actions';
import { LanguageType } from '@/common/enum';

const initialState: InitialState = {
  loading: {
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  },
  rooms: null,
  room: null,
  lang: LanguageType.EN,
  errors: null,
};

export const slice = createSlice({
  name: 'bookingRoom',
  initialState,
  reducers: {
    setRooms: (state, { payload }) => {
      state.rooms = payload;
    },
    setOneRoom: (state, { payload }) => {
      state.room = payload;
    },
    setRoomLang: (state, { payload }) => {
      state.lang = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoom.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getAllRoom.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.rooms = payload.content;
        state.errors = null;
      })
      .addCase(getAllRoom.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneRoom.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneRoom.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.room = payload.content;
        state.errors = null;
      })
      .addCase(getOneRoom.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getByPropertyRoom.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getByPropertyRoom.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.rooms = payload.content;
        state.errors = null;
      })
      .addCase(getByPropertyRoom.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(getOneRoomTranslation.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getOneRoomTranslation.fulfilled, (state, { payload }) => {
        state.loading.get = false;
        state.room = payload;
        state.errors = null;
      })
      .addCase(getOneRoomTranslation.rejected, (state, { payload }) => {
        state.loading.get = false;
        state.errors = payload;
      })
      .addCase(createRoomTranslation.pending, (state) => {
        state.loading.post = true;
        state.errors = null;
      })
      .addCase(createRoomTranslation.fulfilled, (state, { payload }) => {
        state.loading.post = false;
        if (state.room?.translations) {
          state.room.translations.push(payload.data);
        }
        state.errors = null;
      })
      .addCase(createRoomTranslation.rejected, (state, { payload }) => {
        state.loading.post = false;
        state.errors = payload;
      })
      .addCase(deleteRoomTranslation.pending, (state) => {
        state.loading.delete = true;
        state.errors = null;
      })
      .addCase(deleteRoomTranslation.fulfilled, (state) => {
        state.loading.delete = false;
        state.errors = null;
      })
      .addCase(deleteRoomTranslation.rejected, (state, { payload }) => {
        state.loading.delete = false;
        state.errors = payload;
      });
  },
});

export const BookingRoomReduce = slice.reducer;
export const BookingRoomSliceActions = slice.actions;
