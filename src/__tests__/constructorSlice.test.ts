import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import constructorSlice, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetModal,
  saveBurger,
  TConstructorState
} from '../services/slices/constructorSlice';
import { AppStore } from '../services/store';
import { TConstructorIngredient, TOrder } from '../utils/types';
import { orderBurgerApi } from '../utils/burger-api';
import ingredientsSlice from '../services/slices/ingredientsSlice';
import feedsSlice from '../services/slices/feedsSlice';
import userSlice from '../services/slices/userSlice';
import orderSlice from '../services/slices/orderSlice';

jest.mock('../utils/burger-api');

describe('Тестирование reducer constructorSlice', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientsSlice,
        feeds: feedsSlice,
        user: userSlice,
        burgerConstructor: constructorSlice,
        order: orderSlice
      }
    });
  });
  describe('Тестирование синхронных actions', () => {
    test('Тестирование action addIngredient', () => {
      const ingredient: TConstructorIngredient = {
        _id: '1',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      store.dispatch(addIngredient(ingredient));
      ingredient.id =
        store.getState().burgerConstructor.constructorItems.ingredients[0].id;
      expect(
        store.getState().burgerConstructor.constructorItems.ingredients
      ).toEqual([ingredient]);
    });

    test('Тестирование action removeIngredient', () => {
      const ingredient: TConstructorIngredient = {
        _id: '1',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      store.dispatch(addIngredient(ingredient));
      ingredient.id =
        store.getState().burgerConstructor.constructorItems.ingredients[0].id;
      store.dispatch(removeIngredient(ingredient.id));
      expect(
        store.getState().burgerConstructor.constructorItems.ingredients
      ).toEqual([]);
    });

    test('Тестирование action moveIngredientUp', () => {
      const ingredient1: TConstructorIngredient = {
        _id: '1',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      const ingredient2: TConstructorIngredient = {
        _id: '2',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      store.dispatch(addIngredient(ingredient1));
      store.dispatch(addIngredient(ingredient2));
      ingredient1.id =
        store.getState().burgerConstructor.constructorItems.ingredients[0].id;
      ingredient2.id =
        store.getState().burgerConstructor.constructorItems.ingredients[1].id;
      store.dispatch(moveIngredientUp(1));
      expect(
        store.getState().burgerConstructor.constructorItems.ingredients
      ).toEqual([ingredient2, ingredient1]);
    });

    test('Тестирование action moveIngredientDown', () => {
      const ingredient1: TConstructorIngredient = {
        _id: '1',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      const ingredient2: TConstructorIngredient = {
        _id: '2',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      store.dispatch(addIngredient(ingredient1));
      store.dispatch(addIngredient(ingredient2));
      ingredient1.id =
        store.getState().burgerConstructor.constructorItems.ingredients[0].id;
      ingredient2.id =
        store.getState().burgerConstructor.constructorItems.ingredients[1].id;
      store.dispatch(moveIngredientDown(0));
      expect(
        store.getState().burgerConstructor.constructorItems.ingredients
      ).toEqual([ingredient2, ingredient1]);
    });

    test('Тестирование action resetModal', () => {
      const orderData: TOrder = {
        _id: '1',
        status: 'active',
        number: 999,
        name: 'order',
        ingredients: [],
        createdAt: '2024-08-08T10:10:10.999Z',
        updatedAt: '2024-08-08T10:10:10.999Z'
      };
      store.dispatch(resetModal());
      store.dispatch({
        type: 'constructor/saveBurger/fulfilled',
        payload: {
          order: orderData
        }
      });
      expect(store.getState().burgerConstructor.orderModalData).toEqual(
        orderData
      );
      store.dispatch(resetModal());
      expect(store.getState().burgerConstructor.orderModalData).toEqual(null);
    });
  });
  describe('Тестирование асинхронного action saveBurger ', () => {
    test('Тестирование thunk saveBurger.pending', async () => {
      expect(store.getState().burgerConstructor.isLoading).toBe(false);
      expect(store.getState().burgerConstructor.orderRequest).toBe(false);
      expect(store.getState().burgerConstructor.errorMessage).toBeNull;
    });

    test('Тестирование thunk saveBurger.fulfilled', async () => {
      const orderData = ['bun', 'ingredient1', 'ingredient2', 'bun'];
      const order: TOrder = {
        _id: '1',
        status: 'active',
        number: 999,
        name: 'order',
        ingredients: [],
        createdAt: '2024-08-08T10:10:10.999Z',
        updatedAt: '2024-08-08T10:10:10.999Z'
      };
      (orderBurgerApi as jest.Mock).mockResolvedValue({
        order
      });
      await store.dispatch(saveBurger(orderData));
      expect(orderBurgerApi).toHaveBeenCalledWith(orderData);
      expect(store.getState().burgerConstructor.orderModalData).toEqual(order);
      expect(store.getState().burgerConstructor.isLoading).toBe(false);
      expect(store.getState().burgerConstructor.orderRequest).toBe(false);
      expect(store.getState().burgerConstructor.errorMessage).toBe(null);
      expect(store.getState().burgerConstructor.constructorItems).toEqual({
        bun: null,
        ingredients: []
      });
    });

    test('Тестирование thunk saveBurger.rejected', async () => {
      const errorMessage = 'ErrorMessage';
      const orderData = ['bun', 'ingredient1', 'ingredient2'];
      (orderBurgerApi as jest.Mock).mockRejectedValue(new Error(errorMessage));
      await store.dispatch(saveBurger(orderData));
      expect(store.getState().burgerConstructor.isLoading).toBe(false);
      expect(store.getState().burgerConstructor.orderRequest).toBe(false);
      expect(store.getState().burgerConstructor.errorMessage).toBe(
        errorMessage
      );
    });
  });
});
