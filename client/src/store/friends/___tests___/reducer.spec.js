import { GET_USER_INFO_SUCCESS } from '../../user/types';
import reducer from '../reducer';
import { ADD_FRIEND_SUCCESS } from '../types';

describe('friendsReducer', () => {
  it('ADD_FRIEND_SUCCESS', () => {
    const state = {
      friendsList: [],
    };
    const action = {
      type: ADD_FRIEND_SUCCESS,
      friends: ['FRIEND'],
    };

    expect(reducer(state, action)).toEqual({ friendsList: ['FRIEND'] });
  });

  it('GET_USER_INFO_SUCCESS', () => {
    const state = {
      friendsList: [],
    };
    const action = {
      type: GET_USER_INFO_SUCCESS,
      userInfo: { friends: ['FRIEND'] },
    };

    expect(reducer(state, action)).toEqual({ friendsList: ['FRIEND'] });
  });

  it('Default', () => {
    const state = {
      friendsList: ['FRIEND'],
    };
    const action = {
      type: 'Default',
    };

    expect(reducer(state, action)).toEqual({ friendsList: ['FRIEND'] });
  });
});
