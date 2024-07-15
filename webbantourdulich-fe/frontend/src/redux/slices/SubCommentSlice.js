import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk to fetch tours from the API
export const fetchSubComments = createAsyncThunk('subComments/fetchSubComments', async () => {
  const response = await axios.get('http://localhost:5000/api/subComments');
  return response.data;
});

// Create the tours slice
const subCommentSlice = createSlice({
  name: 'subComments',
  initialState: {
    subComments: [],
    status: 'false',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subComments = action.payload;
      })
      .addCase(fetchSubComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default subCommentSlice.reducer;