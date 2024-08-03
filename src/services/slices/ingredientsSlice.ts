import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async function () {
    const response = await getIngredientsApi();
    return response;
  }
);

export type TIngredientsState = {
  ingredientsData: TIngredient[];
  isIngredientsLoading: boolean;
};

export const initialState: TIngredientsState = {
  ingredientsData: [],
  isIngredientsLoading: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredientsData = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;
