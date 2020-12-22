import { errorMessageSelector } from '../selectors';

describe('errorSelectors', () => {
  describe('errorMessageSelector', () => {
    it('No error state provided', () => {
      const state = {
        error: {},
      };
      expect(errorMessageSelector(state)).toEqual('');
    });
    it('Valid error message in state', () => {
      const state = {
        error: {
          errorMessage: 'Error Message',
        },
      };
      expect(errorMessageSelector(state)).toEqual('Error Message');
    });
  });
});
