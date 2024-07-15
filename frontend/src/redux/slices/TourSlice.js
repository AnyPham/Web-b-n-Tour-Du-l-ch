import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk to fetch tours from the API
export const fetchTours = createAsyncThunk('tours/fetchTours', async () => {
  const response = await axios.get('http://localhost:5000/api/tours');
  return response.data;
});

// Create the tours slice
const tourSlice = createSlice({
  name: 'tours',
  initialState: {
    tours: [],
    status: 'false',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tourSlice.reducer;