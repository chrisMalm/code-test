import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./usersType";

type UsersState = {
  list: User[];
  loading: boolean;
  error: string | null;
  newUser: User | null;
};

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
  newUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      })

      .addCase(postUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.loading = false;
        state.newUser = action.payload;
        state.error = null;
      })
      .addCase(postUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Something went wrong when added a user";
      });
  },
});

// GET user from db
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:5000/api/users");
    if (!res.ok) {
      return thunkAPI.rejectWithValue("Serverfel: " + res.status);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Nätverksfel");
  }
});

// POST user to db
export const postUser = createAsyncThunk<
  User, // return type
  // Omit för att ta bort id-fältet från typen User.
  // Du har inte ett id än — det brukar skapas automatiskt av backend
  Omit<User, "id">, // argument från fe "data"
  { rejectValue: string }
>("user/postUser", async (data, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:5000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return thunkAPI.rejectWithValue("serverfel: " + res.status);
    }
    const response = await res.json();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue("Nätverksfel");
  }
});

export default usersSlice.reducer;
