import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { counter } from "./counterType";

const initialState: counter = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      console.log("state", state.value);
      console.log("action", action);

      state.value += action.payload;
    },
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
