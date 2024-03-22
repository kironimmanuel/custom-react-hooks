import { renderHook } from '@testing-library/react-hooks';
import useObserver from './useObserver';

describe('useObserver', () => {
    let observerCallback;

    beforeEach(() => {
        (global as any).IntersectionObserver = jest.fn(callback => {
            observerCallback = callback;
            return {
                observe: jest.fn(),
                unobserve: jest.fn(),
                disconnect: jest.fn(),
            };
        });
    });

    afterEach(() => {
        delete (global as any).IntersectionObserver;
    });

    it('should observe the ref passed to it and update isIntersecting state', () => {
        const { result } = renderHook(() => useObserver({ current: document.createElement('div') }));

        const mockEntry = {
            isIntersecting: true,
        };
        observerCallback([mockEntry]);

        expect(result.current).toBe(true);
    });
});
