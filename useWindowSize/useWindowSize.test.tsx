import { act, renderHook } from '@testing-library/react-hooks';
import { useWindowSize } from './useWindowSize';

describe('useWindowSize', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 600,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: undefined,
    });

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: undefined,
    });
  });

  it('should update the window size on resize', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);

    act(() => {
      window.innerWidth = 1024;
      window.innerHeight = 768;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });
});
