import { expect, test, describe } from '@jest/globals';
import feedsSlice, {
  fetchFeeds,
  initialState
} from '../services/slices/feedsSlice';

const actions = {
  pending: {
    type: fetchFeeds.pending.type,
    payload: null
  },
  fulfilled: {
    type: fetchFeeds.fulfilled.type,
    payload: {
      orders: ['order1', 'order2', 'order3'],
      total: 3,
      totalToday: 3
    }
  },
  rejected: {
    type: fetchFeeds.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};

describe('Тестирование reducer feedsSlice', () => {
  describe('Тестирование асинхронного action fetchFeeds', () => {
    test('Тестирование thunk fetchFeeds.pending', () => {
      const state = feedsSlice(initialState, actions.pending);
      expect(state.errorMessage).toBeNull;
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk fetchFeeds.fulfilled', () => {
      const state = feedsSlice(initialState, actions.fulfilled);
      expect(state.orders).toBe(actions.fulfilled.payload.orders);
      expect(state.total).toBe(actions.fulfilled.payload.total);
      expect(state.total).toBe(actions.fulfilled.payload.totalToday);
    });
    test('Тестирование thunk fetchFeeds.rejected', () => {
      const state = feedsSlice(initialState, actions.rejected);
      expect(state.errorMessage).toBe(actions.rejected.error.message);
      expect(state.isLoading).toBe(false);
    });
  });
});
