import { expect, test, describe } from '@jest/globals';
import orderSlice, {
  fetchOneOrder,
  getOrders,
  initialState
} from '../services/slices/orderSlice';

const fetchOneOrderActions = {
  pending: {
    type: fetchOneOrder.pending.type,
    payload: null
  },
  fulfilled: {
    type: fetchOneOrder.fulfilled.type,
    payload: { orders: ['order1', 'order2', 'order3'] }
  },
  rejected: {
    type: fetchOneOrder.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};

const getOrdersActions = {
  pending: {
    type: getOrders.pending.type,
    payload: null
  },
  fulfilled: {
    type: getOrders.fulfilled.type,
    payload: ['order1', 'order2', 'order3']
  },
  rejected: {
    type: getOrders.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};

describe('Тестирование reducer orderSlice', () => {
  describe('Тестирование асинхронного action fetchOneOrder', () => {
    test('Тестирование thunk fetchOneOrder.pending', () => {
      const state = orderSlice(initialState, fetchOneOrderActions.pending);
      expect(state.errorMessage).toBeNull;
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk fetchOneOrder.fulfilled', () => {
      const state = orderSlice(initialState, fetchOneOrderActions.fulfilled);
      expect(state.errorMessage).toBeNull;
      expect(state.isLoading).toBe(false);
      expect(state.currentOrder).toEqual(
        fetchOneOrderActions.fulfilled.payload.orders[0]
      );
    });
    test('Тестирование thunk fetchOneOrder.rejected', () => {
      const state = orderSlice(initialState, fetchOneOrderActions.rejected);
      expect(state.errorMessage).toBe(
        fetchOneOrderActions.rejected.error.message
      );
      expect(state.isLoading).toBe(false);
    });
  });
  describe('Тестирование асинхронного action getOrdersActions', () => {
    test('Тестирование thunk getOrdersActions.pending', () => {
      const state = orderSlice(initialState, getOrdersActions.pending);
      expect(state.errorMessage).toBeNull;
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk getOrdersActions.fulfilled', () => {
      const state = orderSlice(initialState, getOrdersActions.fulfilled);
      expect(state.errorMessage).toBeNull;
      expect(state.isLoading).toBe(false);
      expect(state.orderList).toEqual(getOrdersActions.fulfilled.payload);
    });
    test('Тестирование thunk getOrdersActions.rejected', () => {
      const state = orderSlice(initialState, getOrdersActions.rejected);
      expect(state.errorMessage).toBe(getOrdersActions.rejected.error.message);
      expect(state.isLoading).toBe(false);
    });
  });
});
