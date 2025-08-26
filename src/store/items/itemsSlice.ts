import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Items } from "../../types";

type ItemsState = {
  items: Items[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
};

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
};
const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.currentPage = action.meta.arg; // sidnummer vi skickade in
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

// Get Items
export const fetchItems = createAsyncThunk<
  { items: Items[]; total: number }, // Return typen (return { items: data, total };)
  number, // Argumentet page ex 1 ( dispatch(fetchItems(1))) från FE
  { rejectValue: string }
  //   detta är for redux devtool "items/fetchItems"
>("items/fetchItems", async (page, thunkAPI) => {
  try {
    const limit = 10;
    const res = await fetch(
      `http://localhost:5000/api/items?page=${page}&limit=${limit}`
    );
    if (!res.ok) {
      return thunkAPI.rejectWithValue("Serverfel: " + res.status);
    }

    const data = await res.json();
    // Total får vi automatiskt från headern men cors måste allow it,
    //  kolla BE server CORS
    const total = parseInt(res.headers.get("X-Total-Count") || "0");

    return { items: data, total };
  } catch (error) {
    return thunkAPI.rejectWithValue("Nätverksfel");
  }
});

export default itemsSlice.reducer;
