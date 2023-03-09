import { renderHook } from '@testing-library/react-hooks';
import { useSlidesInView } from './useSlidesInView';

describe('useSlidesInView', () => {
  it('should set isLoop to true and slidesInView to 1 if window size is less than 768 and slides length is greater than 1', () => {
    global.innerWidth = 767;
    const slides = [1, 2, 3];

    const { result } = renderHook(() => useSlidesInView({ slides }));

    expect(result.current.isLoop).toBe(true);
    expect(result.current.slidesInView).toBe(1);
  });

  it('should set isLoop to false and slidesInView to 1 if window size is less than 768 and slides length is 1', () => {
    global.innerWidth = 767;
    const slides = [1];

    const { result } = renderHook(() => useSlidesInView({ slides }));

    expect(result.current.isLoop).toBe(false);
    expect(result.current.slidesInView).toBe(1);
  });

  it('should set isLoop to false and slidesInView to 2 if window size is between 768 and 1280 and slides length is less than or equal to 2', () => {
    global.innerWidth = 1024;
    const slides = [1, 2];

    const { result } = renderHook(() => useSlidesInView({ slides }));

    expect(result.current.isLoop).toBe(false);
    expect(result.current.slidesInView).toBe(2);
  });

  it('should set isLoop to true and slidesInView to 2 if window size is between 768 and 1280 and slides length is greater than 2', () => {
    global.innerWidth = 1024;
    const slides = [1, 2, 3];

    const { result } = renderHook(() => useSlidesInView({ slides }));

    expect(result.current.isLoop).toBe(true);
    expect(result.current.slidesInView).toBe(2);
  });

  it('should set isLoop to false and slidesInView to 4 if window size is greater than 1280 and slides length is 4', () => {
    global.innerWidth = 1366;
    const slides = [1, 2, 3, 4];

    const { result } = renderHook(() => useSlidesInView({ slides }));

    expect(result.current.isLoop).toBe(false);
    expect(result.current.slidesInView).toBe(4);
  });

  it('should set isLoop to true and slidesInView to 4 if window size is greater than 1280 and slides length is greater than 4', () => {
    global.innerWidth = 1366;
    const slides = [1, 2, 3, 4, 5];

    const { result } = renderHook(() => useSlidesInView({ slides }));

    expect(result.current.isLoop).toBe(true);
    expect(result.current.slidesInView).toBe(4);
  });
});
