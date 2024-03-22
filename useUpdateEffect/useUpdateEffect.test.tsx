import { act, renderHook } from '@testing-library/react-hooks';
import useUpdateEffect from './useUpdateEffect';

describe('useUpdateEffect', () => {
    it('should call the callback function when dependencies change, except for the first render', () => {
        const callback = jest.fn();
        const { rerender } = renderHook(({ callback, dependencies }) => useUpdateEffect(callback, dependencies), {
            initialProps: { callback, dependencies: [1] },
        });

        expect(callback).not.toHaveBeenCalled();

        act(() => rerender({ callback, dependencies: [2] }));
        expect(callback).toHaveBeenCalledTimes(1);

        act(() => rerender({ callback, dependencies: [3] }));
        expect(callback).toHaveBeenCalledTimes(2);
    });
});
