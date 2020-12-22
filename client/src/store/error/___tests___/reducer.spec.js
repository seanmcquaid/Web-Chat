import { LOGIN_LOADING } from '../../loading/types';
import { LOGIN_SUCCESS } from '../../user/types';
import reducer from '../reducer';
import { LOGIN_ERROR } from '../types';

describe('errorReducer', () => {
  it('Error case', () => {
    const state = { errorMessage: '' };
    const action = {
      type: LOGIN_ERROR,
      error: {
        response: {
          data: {
            errorMessage: 'ERROR',
          },
        },
      },
    };

    expect(reducer(state, action)).toEqual({ errorMessage: 'ERROR' });
  });

  it('Loading case', () => {
    const state = { errorMessage: 'ERROR' };
    const action = {
      type: LOGIN_LOADING,
    };

    expect(reducer(state, action)).toEqual({ errorMessage: '' });
  });

  it('Success case', () => {
    const state = { errorMessage: 'ERROR' };
    const action = {
      type: LOGIN_SUCCESS,
    };

    expect(reducer(state, action)).toEqual({ errorMessage: '' });
  });

  it('Default case', () => {
    const state = { errorMessage: 'ERROR' };
    const action = {
      type: 'Default',
    };

    expect(reducer(state, action)).toEqual({ errorMessage: 'ERROR' });
  });
});
