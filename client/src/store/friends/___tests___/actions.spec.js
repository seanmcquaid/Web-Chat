import * as userService from '../../../api/userService';
import createMockStore from '../../../testUtils/createMockStore';
import { addFriendAction } from '../actions';

describe('friendsActions', () => {
  it('addFriendAction', () => {
    const store = createMockStore({
      friends: { friendsList: [] },
      user: { token: 'valid token' },
    });
    jest.spyOn(userService, 'addFriend').mockResolvedValueOnce({
      data: {
        friends: [],
      },
    });

    const expectedActions = [
      {
        type: 'ADD_FRIEND_LOADING',
      },
      {
        friends: [],
        type: 'ADD_FRIEND_SUCCESS',
      },
    ];

    return store.dispatch(addFriendAction('friendName')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
