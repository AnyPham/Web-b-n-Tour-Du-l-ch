import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk to fetch tours from the API
export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await axios.get('http://localhost:5000/api/comments');
  return response.data;
});

// Create the tours slice
const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'false',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;