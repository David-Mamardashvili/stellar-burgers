import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

export const fetchFeeds = createAsyncThunk(
  'feeds/fetchFeeds',
  async function () {
    const response = await getFeedsApi();
    return response;
  }
);

export type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export default feedsSlice.reducer;
