import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useScrollProgress } from './useScrollProgress';

describe('useScrollProgress', () => {
    it('should return scroll progress percentage', () => {
        const { result } = renderHook(() => useScrollProgress());

        expect(result.current).toBe(0);

        Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true });
        Object.defineProperty(document.body, 'scrollHeight', { value: 2000 });
        Object.defineProperty(window, 'innerHeight', { value: 1000 });
        fireEvent.scroll(window);

        const expectedScrollTop = (500 / (2000 - 1000)) * 100;
        expect(result.current).toBe(expectedScrollTop);
    });
});
