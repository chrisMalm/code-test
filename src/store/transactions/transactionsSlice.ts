import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "./transactionsType";

type TransactionState = {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
};

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        // filtrerar bort de angivna id o uppdaterar statet
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.error = action.payload ?? "Kunde inte ta bort transaktionen";
      });
  },
});

// GET all transactions
export const fetchTransactions = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>("transactions/fetchtransactions", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:5000/api/transactions");
    if (!res.ok) {
      return thunkAPI.rejectWithValue("Serverfel: " + res.status);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Nätverksfel");
  }
});

// DELETE transaction
export const deleteTransaction = createAsyncThunk<
  number, // return type
  number, //argument från FE
  { rejectValue: string }
>("transaction/deleteTransaction", async (id, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:5000/api/transaction/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      return thunkAPI.rejectWithValue("Serverfel: " + res.status);
    }
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue("Nätverksfel");
  }
});

export default transactionsSlice.reducer;
