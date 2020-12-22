import * as userService from '../../../api/userService';
import createMockStore from '../../../testUtils/createMockStore';
import { loginAction } from '../actions';

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
});
