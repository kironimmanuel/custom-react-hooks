import { act, renderHook } from '@testing-library/react-hooks';
import { useSlider } from './useSlider';

jest.mock('../sanity', () => ({
  sanityGetImageUrl: jest.fn().mockReturnValue(''),
}));

describe('useSlider', () => {
  const slides = [
    {
      asset: {
        _ref: 'image-123',
        _type: 'reference',
      },
      _type: 'image',
    },
    {
      asset: {
        _ref: 'image-123',
        _type: 'reference',
      },
      _type: 'image',
    },
    {
      asset: {
        _ref: 'image-123',
        _type: 'reference',
      },
      _type: 'image',
    },
  ];
  const speed = 1;

  it('should return the initial slide index as 0', () => {
    const { result } = renderHook(() => useSlider(slides, false, speed));
    expect(result.current.slideIndex).toBe(0);
  });

  it('should update slide index when going to next slide', () => {
    const { result } = renderHook(() => useSlider(slides, false, speed));
    act(() => {
      result.current.goToNextSlide();
    });
    expect(result.current.slideIndex).toBe(1);
  });

  it('should update slide index when going to prev slide', () => {
    const { result } = renderHook(() => useSlider(slides, false, speed));
    act(() => {
      result.current.goToPrevSlide();
    });
    expect(result.current.slideIndex).toBe(2);
  });

  it('should update slide index when going to a specific slide', () => {
    const { result } = renderHook(() => useSlider(slides, false, speed));
    act(() => {
      result.current.goToSlide(1);
    });
    expect(result.current.slideIndex).toBe(1);
  });

  it('should autoplay when autoplay is true', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useSlider(slides, true, speed));
    expect(result.current.slideIndex).toBe(0);
    jest.advanceTimersByTime(speed * 1000);
    expect(result.current.slideIndex).toBe(1);
    jest.advanceTimersByTime(speed * 1000);
    expect(result.current.slideIndex).toBe(2);
    jest.advanceTimersByTime(speed * 1000);
    expect(result.current.slideIndex).toBe(0);
    jest.useRealTimers();
  });

  it('should stop autoplay when autoplay is false', () => {
    jest.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ autoplay }) => useSlider(slides, autoplay, speed),
      {
        initialProps: { autoplay: true },
      }
    );
    expect(result.current.slideIndex).toBe(0);
    act(() => {
      rerender({ autoplay: false });
    });
    jest.advanceTimersByTime(speed * 1000);
    expect(result.current.slideIndex).toBe(0);
    jest.useRealTimers();
  });
});
