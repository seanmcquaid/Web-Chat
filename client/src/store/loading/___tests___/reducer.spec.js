import { LOGIN_LOADING } from '../types';
import { LOGIN_SUCCESS } from '../../user/types';
import reducer from '../reducer';
import { LOGIN_ERROR } from '../../error/types';

describe('loadingReducer', () => {
  it('Loading case', () => {
    const state = { isLoading: false };
    const action = {
      type: LOGIN_LOADING,
    };

    expect(reducer(state, action)).toEqual({ isLoading: true });
  });

  it('Error case', () => {
    const state = { isLoading: true };
    const action = {
      type: LOGIN_ERROR,
    };

    expect(reducer(state, action)).toEqual({ isLoading: false });
  });

  it('Success case', () => {
    const state = { isLoading: true };
    const action = {
      type: LOGIN_SUCCESS,
    };

    expect(reducer(state, action)).toEqual({ isLoading: false });
  });

  it('Default case', () => {
    const state = { isLoading: true };
    const action = {
      type: 'Default',
    };

    expect(reducer(state, action)).toEqual({ isLoading: true });
  });
});
