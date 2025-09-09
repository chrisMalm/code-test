import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type LoggingOutState = {
  message: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: LoggingOutState = {
  message: null,
  loading: false,
  error: null,
};

type ResponseType = {
  message: string;
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        console.log("pending");

        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log(action.payload.message, "mesaeg");

        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log("error rejected");

        state.loading = true;
        state.error = action.payload ?? "Couldnt logout";
      });
  },
});

export const logoutUser = createAsyncThunk<
  ResponseType,
  void,
  { rejectValue: string }
>("logout", async (_, thunkAPI) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.log("i !res.ok");

      const errorText = await res.json();
      return thunkAPI.rejectWithValue(
        errorText.error ?? "serverfel" + res.status
      );
    }
    const response = await res.json();
    console.log("res", response);
    return response;
  } catch (error) {
    console.log("hejsan");

    return thunkAPI.rejectWithValue("Nätverksfel");
  }
});

export default logoutSlice.reducer;
