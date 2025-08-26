import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SecretResponse {
  secret: string;
  user: {
    id: string;
    name: string;
    email: string;
    // osv beroende på vad du lagt i JWT
  };
}
type ProtectedDataState = {
  data: SecretResponse | null;
  loading: boolean;
  error: string | null;
};
const initialState: ProtectedDataState = {
  data: null,
  loading: false,
  error: null,
};

const protectedSlice = createSlice({
  name: "protected",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProtectedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProtectedData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchProtectedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "något blev fel";
      });
  },
});

export const fetchProtectedData = createAsyncThunk<
  SecretResponse,
  void,
  { rejectValue: string }
>("protected", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:5000/api/protected", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      return thunkAPI.rejectWithValue(errorData);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Nätverksfel");
  }
});

export default protectedSlice.reducer;
