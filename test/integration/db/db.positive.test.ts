import { db } from '../../../dist';

describe('db', () => {
  describe('positive', () => {
    test('should contain the expected connect function', () => {
      const { connect } = db;
      const isFunc = typeof connect === 'function';
      expect(isFunc).toEqual(true);
    });
  });
});
