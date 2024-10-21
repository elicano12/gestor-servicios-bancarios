import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk asíncrono para realizar el login
export const login = createAsyncThunk(
  'users/login',
  async ({ email, password }, { rejectWithValue }) => {
    const url = `${process.env.REACT_APP_API_URL}/users/login` 
    try {
      const response = await axios.post(url, { email, password });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

// Crear el slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user; // Suponiendo que también obtienes el usuario
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
