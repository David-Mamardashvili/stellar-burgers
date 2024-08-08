import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async function () {
    const response = await getIngredientsApi();
    return response;
  }
);

export type TIngredientsState = {
  ingredientsData: TIngredient[];
  isLoading: boolean;
  errorMessage: string | null;
};

export const initialState: TIngredientsState = {
  ingredientsData: [],
  isLoading: false,
  errorMessage: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.errorMessage = null;
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredientsData = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.errorMessage = action.error.message as string;
        state.isLoading = false;
      });
  }
});

export default ingredientsSlice.reducer;
