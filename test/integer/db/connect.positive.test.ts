import { connect } from '../../../dist';

describe('connect', () => {
  describe('positive', () => {
    test('should contain the expected connect function', () => {
      const isFunc = typeof connect === 'function';
      expect(isFunc).toEqual(true);
    });
  });
});
