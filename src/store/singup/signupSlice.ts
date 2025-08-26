import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}
type UsersState = {
  user: User | null;
  // token: string | null;
  loading: boolean;
  error: string | null;
  firstInit: boolean;
};
interface SignUpResponse {
  user: User;
}
const initialState: UsersState = {
  user: null,
  // token: null,
  loading: false,
  error: null,
  firstInit: false,
};
const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    clearFirstInit(state) {
      state.firstInit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.firstInit = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "could not add User";
      });
  },
});

export const signUpUser = createAsyncThunk<
  SignUpResponse,
  Omit<User, "id">,
  { rejectValue: string }
>("user/signup", async (data, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      //   res.ok är false om res.status >= 400, denna skickas till addcase rejected
      //   payloaden blir errortext  eller "serverfel: " + res.status
      const errorText = await res.json();

      return thunkAPI.rejectWithValue(
        errorText.error ?? "serverfel : " + res.status
      );
    }
    const response = await res.json();

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue("Nätverksfel");
  }
});

export default signUpSlice.reducer;
export const { clearFirstInit } = signUpSlice.actions;
