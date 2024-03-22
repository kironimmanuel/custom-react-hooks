import { act, renderHook } from '@testing-library/react-hooks';
import useToggle from './useToggle';

describe('useToggle', () => {
    it('should toggle the value correctly', () => {
        const { result } = renderHook(() => useToggle(false));

        expect(result.current[0]).toBe(false);

        act(() => result.current[1]());
        expect(result.current[0]).toBe(true);

        act(() => result.current[1]());
        expect(result.current[0]).toBe(false);

        act(() => result.current[1](true));
        expect(result.current[0]).toBe(true);

        act(() => result.current[1](false));
        expect(result.current[0]).toBe(false);
    });
});
