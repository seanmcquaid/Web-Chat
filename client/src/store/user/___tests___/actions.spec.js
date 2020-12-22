import * as userService from '../../../api/userService';
import createMockStore from '../../../testUtils/createMockStore';
import {
  getUserInfoAction,
  loginAction,
  logoutAction,
  registerAction,
} from '../actions';

describe('userActions', () => {
  it('loginAction', () => {
    const store = createMockStore();
    jest.spyOn(userService, 'login').mockResolvedValueOnce({
      data: { username: 'Username here', friends: [] },
    });

    const expectedActions = [
      { type: 'LOGIN_LOADING' },
      {
        type: 'LOGIN_SUCCESS',
        userInfo: { username: 'Username here', friends: [] },
      },
    ];

    return store.dispatch(loginAction('Username here', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('registerAction', () => {
    const store = createMockStore();
    jest.spyOn(userService, 'register').mockResolvedValueOnce({
      data: { username: 'Username here', friends: [] },
    });

    const expectedActions = [
      { type: 'REGISTER_LOADING' },
      {
        type: 'REGISTER_SUCCESS',
        userInfo: { username: 'Username here', friends: [] },
      },
    ];

    return store
      .dispatch(registerAction('Username here', 'password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('getUserInfoAction', () => {
    const store = createMockStore({ user: { token: 'Valid token' } });
    jest.spyOn(userService, 'getUserInfo').mockResolvedValueOnce({
      data: { username: 'Username here', friends: [] },
    });

    const expectedActions = [
      { type: 'GET_USER_INFO_LOADING' },
      {
        type: 'GET_USER_INFO_SUCCESS',
        userInfo: { username: 'Username here', friends: [] },
      },
    ];

    return store.dispatch(getUserInfoAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('logoutAction', () => {
    const store = createMockStore({ user: { token: 'Valid token' } });
    jest.spyOn(userService, 'logout').mockResolvedValueOnce({
      data: { username: 'Username here', friends: [] },
    });

    const expectedActions = [
      { type: 'LOGOUT_LOADING' },
      {
        type: 'LOGOUT_SUCCESS',
      },
    ];

    return store.dispatch(logoutAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
