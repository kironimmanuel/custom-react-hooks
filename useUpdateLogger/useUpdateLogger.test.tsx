import { renderHook } from '@testing-library/react-hooks';
import { useUpdateLogger } from './useUpdateLogger';

describe('useUpdateLogger', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log the updated value', () => {
    const value = 'test';

    renderHook(() => useUpdateLogger(value));

    expect(console.log).toHaveBeenCalledWith(value);
  });
});
