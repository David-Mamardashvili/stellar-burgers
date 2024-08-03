import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

export const saveBurger = createAsyncThunk(
  'constructor/saveBurger',
  async function (orderData: string[]) {
    const response = await orderBurgerApi(orderData);
    return response;
  }
);

type TConstructorState = {
  isLoading: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  errorMessage: string | null;
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    isLoading: false,
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    errorMessage: null
  } as TConstructorState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const id = nanoid();
      const payload: TConstructorIngredient = { ...action.payload, id };
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = payload;
      } else {
        state.constructorItems.ingredients.push(payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload
        );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(
        action.payload,
        0,
        state.constructorItems.ingredients.splice(action.payload - 1, 1)[0]
      );
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(
        action.payload,
        0,
        state.constructorItems.ingredients.splice(action.payload + 1, 1)[0]
      );
    },
    resetModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBurger.pending, (state, action) => {
        state.isLoading = true;
        state.orderRequest = true;
        state.errorMessage = null;
      })
      .addCase(saveBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.errorMessage = null;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      })
      .addCase(saveBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.errorMessage = action.error.message as string;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetModal
} = constructorSlice.actions;
export default constructorSlice.reducer;
