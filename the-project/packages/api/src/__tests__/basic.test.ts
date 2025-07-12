import { describe, it, expect } from '@jest/globals';

describe('API Package', () => {
  it('should have basic testing infrastructure working', () => {
    expect(true).toBe(true);
  });

  it('should be able to test basic functions', () => {
    const add = (a: number, b: number) => a + b;
    expect(add(2, 3)).toBe(5);
  });
});
