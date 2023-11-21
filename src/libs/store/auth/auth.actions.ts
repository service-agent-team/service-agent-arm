import { createAsyncThunk } from "@reduxjs/toolkit"

// type AsyncThunkConfig = {
//   rejectValue: {
//     error: string;
//   };
// };

export const SignIn = createAsyncThunk(
  'auth/signIn',
  async ({}) => {
    try {
      // const response = await AuthService.signIn(username, password);
      // if (response.data) {
      //   callback();
      // }
      // return response.data; 
    } catch (error) {
      // addNotification(error);
      // return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);