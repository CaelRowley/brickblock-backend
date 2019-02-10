/* eslint-disable no-undef */

import { expect } from 'chai';
import * as api from './api';

describe('ICO', () => {
  describe('ICOs()', () => {
    it('returns a list of icos', async () => {
      const result = await api.ICOs();
      expect(result.data.data.ICOs.length).to.be.at.least(1);
    });
  });
});
