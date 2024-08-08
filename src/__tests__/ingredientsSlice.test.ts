import { expect, test, describe } from '@jest/globals';
import ingredientsSlice, {
  fetchIngredients,
  initialState
} from '../services/slices/ingredientsSlice';

const actions = {
  pending: {
    type: fetchIngredients.pending.type,
    payload: null
  },
  fulfilled: {
    type: fetchIngredients.fulfilled.type,
    payload: ['ingredient1', 'ingredient2', 'ingredient3']
  },
  rejected: {
    type: fetchIngredients.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};

describe('Тестирование reducer ingredientsSlice', () => {
  describe('Тестирование асинхронного action fetchIngredients', () => {
    test('Тестирование thunk fetchIngredients.pending', () => {
      const state = ingredientsSlice(initialState, actions.pending);
      expect(state.errorMessage).toBeNull;
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk fetchIngredients.fulfilled', () => {
      const state = ingredientsSlice(initialState, actions.fulfilled);
      expect(state.isLoading).toBe(false);
      expect(state.ingredientsData).toBe(actions.fulfilled.payload);
    });
    test('Тестирование thunk fetchIngredients.rejected', () => {
      const state = ingredientsSlice(initialState, actions.rejected);
      expect(state.errorMessage).toBe(actions.rejected.error.message);
      expect(state.isLoading).toBe(false);
    });
  });
});
