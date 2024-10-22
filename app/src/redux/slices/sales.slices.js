import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSales = createAsyncThunk(
  "sales/fetchAll",
  async ({ token }, { rejectWithValue }) => {
    const url = `${process.env.REACT_APP_API_URL}/sales`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSalesByUserId = createAsyncThunk(
  "sales/fetchByUserId",
  async ({ token, id }, { rejectWithValue }) => {
    const url = `${process.env.REACT_APP_API_URL}/sales/${id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    sales: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
        state.total = action.payload.reduce(
          (total, sales) => total + parseInt(sales.requested_amount),
          0
        );
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSalesByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
        state.total = action.payload.reduce(
          (total, sales) => total + parseInt(sales.requested_amount),
          0
        );
      })
      .addCase(fetchSalesByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default salesSlice.reducer;
