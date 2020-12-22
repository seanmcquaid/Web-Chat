import { isLoadingSelector } from '../selectors';

describe('loadingSelectors', () => {
  describe('isLoadingSelector', () => {
    it('No isLoading state provided', () => {
      const state = {
        loading: {},
      };
      expect(isLoadingSelector(state)).toEqual(false);
    });
    it('Valid isLoading in state', () => {
      const state = {
        loading: {
          isLoading: true,
        },
      };
      expect(isLoadingSelector(state)).toEqual(true);
    });
  });
});
