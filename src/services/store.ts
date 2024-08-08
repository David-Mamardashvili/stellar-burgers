import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/ingredientsSlice';
import feedsSlice from './slices/feedsSlice';
import userSlice from './slices/userSlice';
import constructorSlice from './slices/constructorSlice';
import orderSlice from './slices/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  feeds: feedsSlice,
  user: userSlice,
  burgerConstructor: constructorSlice,
  order: orderSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
