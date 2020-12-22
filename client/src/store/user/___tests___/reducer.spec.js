import reducer from '../reducer';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../types';

describe('userReducer', () => {
  it('Login and register success', () => {
    const state = { token: null };
    const action = {
      type: LOGIN_SUCCESS,
      userInfo: {
        token: 'Valid token',
      },
    };

    expect(reducer(state, action)).toEqual({ token: 'Valid token' });
  });

  it('Logout success', () => {
    const state = { token: 'Valid token' };
    const action = {
      type: LOGOUT_SUCCESS,
    };

    expect(reducer(state, action)).toEqual({ token: null });
  });

  it('Default', () => {
    const state = { token: 'Valid token' };
    const action = {
      type: 'Default',
    };

    expect(reducer(state, action)).toEqual({ token: 'Valid token' });
  });
});
