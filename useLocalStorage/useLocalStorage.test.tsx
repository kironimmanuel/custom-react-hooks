import { act, renderHook } from '@testing-library/react-hooks';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage hook', () => {
    const localStorageMock = (() => {
        let store: { [key: string]: any } = {};

        return {
            getItem: (key: string) => store[key],
            setItem: (key: string, value: any) => {
                store[key] = value.toString();
            },
            clear: () => {
                store = {};
            },
        };
    })();
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should set initial value from localStorage', () => {
        const key = 'testKey';
        const initialValue = 'initialValue';

        localStorage.setItem(key, JSON.stringify(initialValue));

        const { result } = renderHook(() => useLocalStorage(key, initialValue));

        expect(result.current[0]).toBe(initialValue);
    });

    it('should update localStorage when setting value', () => {
        const key = 'testKey';
        const initialValue = 'initialValue';
        const updatedValue = 'updatedValue';

        const { result } = renderHook(() => useLocalStorage(key, initialValue));

        act(() => {
            result.current[1](updatedValue);
        });

        expect(localStorage.getItem(key)).toBe(JSON.stringify(updatedValue));
    });
});
