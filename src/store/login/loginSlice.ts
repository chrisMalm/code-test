import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../users/usersType";

interface Credentials {
  email: string;
  password: string;
}

type LoginState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type LoginResponse = {
  user: User;
};

const initialState: LoginState = {
  user: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Login failed";
      });
  },
});

export const login = createAsyncThunk<
  LoginResponse,
  Credentials,
  { rejectValue: string }
>("login", async (data, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      credentials: "include", // superviktigt för cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      if (res.status === 401) {
        // generic error message
        return thunkAPI.rejectWithValue("Invalid email or password");
      }
      return thunkAPI.rejectWithValue("Server error: " + res.status);
    }

    const user = await res.json();
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue("nätverksfel");
  }
});

export default loginSlice.reducer;
