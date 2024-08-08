import { expect, test, describe, jest, beforeAll } from '@jest/globals';
import userSlice, {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getAllUserOrdersThunk,
  checkIsUserLogged,
  initialState
} from '../services/slices/userSlice';
import { setCookie, deleteCookie } from '../utils/cookie';

jest.mock('../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

const registerUserActions = {
  pending: {
    type: registerUser.pending.type,
    payload: null
  },
  fulfilled: {
    type: registerUser.fulfilled.type,
    payload: { user: { name: 'name', email: 'email' }, accessToken: 'token' }
  },
  rejected: {
    type: registerUser.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};
const loginUserActions = {
  pending: {
    type: loginUser.pending.type,
    payload: null
  },
  fulfilled: {
    type: loginUser.fulfilled.type,
    payload: { user: { name: 'name', email: 'email' }, accessToken: 'token' }
  },
  rejected: {
    type: loginUser.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};
const logoutUserActions = {
  pending: {
    type: logoutUser.pending.type,
    payload: null
  },
  fulfilled: {
    type: logoutUser.fulfilled.type,
    payload: null
  },
  rejected: {
    type: logoutUser.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};
const updateUserActions = {
  pending: {
    type: updateUser.pending.type,
    payload: null
  },
  fulfilled: {
    type: updateUser.fulfilled.type,
    payload: { user: { name: 'name', email: 'email' } }
  },
  rejected: {
    type: updateUser.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};
const getAllUserOrdersThunkActions = {
  pending: {
    type: getAllUserOrdersThunk.pending.type,
    payload: null
  },
  fulfilled: {
    type: getAllUserOrdersThunk.fulfilled.type,
    payload: ['order1', 'order2', 'order3']
  },
  rejected: {
    type: getAllUserOrdersThunk.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};
const checkIsUserLoggedActions = {
  pending: {
    type: checkIsUserLogged.pending.type,
    payload: null
  },
  fulfilled: {
    type: checkIsUserLogged.fulfilled.type,
    payload: { user: { name: 'name', email: 'email' } }
  },
  rejected: {
    type: checkIsUserLogged.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};

describe('Тестирование reducer userSlice', () => {
  describe('Тестирование асинхронного action registerUserActions', () => {
    test('Тестирование thunk registerUser.pending', () => {
      const state = userSlice(initialState, registerUserActions.pending);
      expect(state.errorMessage).toBeNull;
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk registerUser.fulfilled', () => {
      const state = userSlice(initialState, registerUserActions.fulfilled);
      expect(state.isLoading).toBe(false);
      expect(state.userInfo).toEqual(
        registerUserActions.fulfilled.payload.user
      );
      expect(state.isLoggedIn).toBe(true);
      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        registerUserActions.fulfilled.payload.accessToken
      );
    });
    test('Тестирование thunk registerUser.rejected', () => {
      const state = userSlice(initialState, registerUserActions.rejected);
      expect(state.errorMessage).toBe(
        registerUserActions.rejected.error.message
      );
      expect(state.isLoading).toBe(false);
    });
  });
  describe('Тестирование асинхронного action loginUserActions', () => {
    test('Тестирование thunk loginUser.pending', () => {
      const state = userSlice(initialState, loginUserActions.pending);
      expect(state.errorMessage).toBeNull;
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk loginUser.fulfilled', () => {
      const state = userSlice(initialState, loginUserActions.fulfilled);
      expect(state.isLoading).toBe(false);
      expect(state.userInfo).toEqual(loginUserActions.fulfilled.payload.user);
      expect(state.isLoggedIn).toBe(true);
      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        loginUserActions.fulfilled.payload.accessToken
      );
    });
    test('Тестирование thunk loginUser.rejected', () => {
      const state = userSlice(initialState, loginUserActions.rejected);
      expect(state.errorMessage).toBe(loginUserActions.rejected.error.message);
      expect(state.isLoading).toBe(false);
    });
  });
  describe('Тестирование асинхронного action logoutUserActions', () => {
    test('Тестирование thunk logoutUser.pending', () => {
      const state = userSlice(initialState, logoutUserActions.pending);
      expect(state.errorMessage).toBeNull;
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk logoutUser.fulfilled', () => {
      const state = userSlice(initialState, logoutUserActions.fulfilled);
      expect(state.isLoading).toBe(false);
      expect(state.userInfo).toBeNull;
      expect(state.isLoggedIn).toBe(false);
      expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    });
    test('Тестирование thunk logoutUser.rejected', () => {
      const state = userSlice(initialState, logoutUserActions.rejected);
      expect(state.errorMessage).toBe(logoutUserActions.rejected.error.message);
      expect(state.isLoading).toBe(false);
    });
  });
  describe('Тестирование асинхронного action updateUserActions', () => {
    test('Тестирование thunk updateUser.pending', () => {
      const state = userSlice(initialState, updateUserActions.pending);
      expect(state.errorMessage).toBeNull;
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk updateUser.fulfilled', () => {
      const state = userSlice(initialState, updateUserActions.fulfilled);
      expect(state.isLoading).toBe(false);
      expect(state.userInfo).toEqual(updateUserActions.fulfilled.payload.user);
      expect(state.isLoggedIn).toBe(true);
    });
    test('Тестирование thunk updateUser.rejected', () => {
      const state = userSlice(initialState, updateUserActions.rejected);
      expect(state.errorMessage).toBe(updateUserActions.rejected.error.message);
      expect(state.isLoading).toBe(false);
    });
  });
  describe('Тестирование асинхронного action getAllUserOrdersThunkActions', () => {
    test('Тестирование thunk getAllUserOrdersThunk.pending', () => {
      const state = userSlice(
        initialState,
        getAllUserOrdersThunkActions.pending
      );
      expect(state.errorMessage).toBeNull;
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk getAllUserOrdersThunk.fulfilled', () => {
      const state = userSlice(
        initialState,
        getAllUserOrdersThunkActions.fulfilled
      );
      expect(state.isLoading).toBe(false);
      expect(state.allUserOrders).toEqual(
        getAllUserOrdersThunkActions.fulfilled.payload
      );
    });
    test('Тестирование thunk getAllUserOrdersThunk.rejected', () => {
      const state = userSlice(
        initialState,
        getAllUserOrdersThunkActions.rejected
      );
      expect(state.errorMessage).toBe(
        getAllUserOrdersThunkActions.rejected.error.message
      );
      expect(state.isLoading).toBe(false);
    });
  });
  describe('Тестирование асинхронного action checkIsUserLoggedActions', () => {
    test('Тестирование thunk checkIsUserLogged.fulfilled', () => {
      const state = userSlice(initialState, checkIsUserLoggedActions.fulfilled);
      expect(state.isLoading).toBe(false);
      expect(state.userInfo).toEqual(
        checkIsUserLoggedActions.fulfilled.payload.user
      );
      expect(state.isLoggedIn).toBe(true);
    });
    test('Тестирование thunk checkIsUserLogged.rejected', () => {
      const state = userSlice(initialState, checkIsUserLoggedActions.rejected);
      expect(state.errorMessage).toBe(
        checkIsUserLoggedActions.rejected.error.message
      );
      expect(state.isLoading).toBe(false);
    });
  });
});
