import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../users/usersType";

type UserState = {
  me: User | null;
  loading: boolean;
  error: string | null;
};

interface SignUpResponse {
  user: User;
}

const initialState: UserState = {
  me: null,
  loading: false,
  error: null,
};
const getLoggedInUserSlice = createSlice({
  name: "getLoggedInUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.me = action.payload.user;
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "No User found!";
      });
  },
});

export const getLoggedInUser = createAsyncThunk<
  SignUpResponse,
  void,
  { rejectValue: string }
>("user/me", async (_, thunkAPI) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/me`, {
      credentials: "include",
    });
    if (!res.ok) {
      const errorText = await res.json();
      return thunkAPI.rejectWithValue(
        errorText.error ?? "serverfel:" + res.status
      );
    }
    const response = await res.json();

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue("Nätverksfel");
  }
});

export default getLoggedInUserSlice.reducer;
