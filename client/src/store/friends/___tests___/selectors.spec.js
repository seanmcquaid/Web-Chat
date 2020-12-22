import { friendsListSelector } from '../selectors';

describe('friendsSelectors', () => {
  describe('friendsListSelector', () => {
    it('No friends list state provided', () => {
      const state = {
        friends: {},
      };
      expect(friendsListSelector(state)).toEqual([]);
    });

    it('Valid friends list in state', () => {
      const state = {
        friends: {
          friendsList: ['Friend'],
        },
      };
      expect(friendsListSelector(state)).toEqual(['Friend']);
    });
  });
});
