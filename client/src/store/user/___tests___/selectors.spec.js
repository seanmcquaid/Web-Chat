import { tokenSelector } from '../selectors';

describe('userSelectors', () => {
  describe('tokenSelector', () => {
    it('No user token state provided', () => {
      const state = {
        user: {},
      };
      expect(tokenSelector(state)).toEqual(null);
    });
    it('Valid isLoading in state', () => {
      const state = {
        user: {
          token: 'Valid token',
        },
      };
      expect(tokenSelector(state)).toEqual('Valid token');
    });
  });
});
