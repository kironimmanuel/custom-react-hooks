import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from './useFetch';

describe('useFetch hook', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch data from the given URL', async () => {
        const responseData = { foo: 'bar' };
        const url = 'https://example.com/data';
        (global.fetch as any).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(responseData),
        });

        const { result, waitForNextUpdate } = renderHook(() => useFetch(url));
        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual(responseData);
        expect(result.current.error).toBe(null);
        expect(global.fetch).toHaveBeenCalledWith(url);
    });

    it('should handle errors when fetching data', async () => {
        const error = new Error('Failed to fetch data');
        const url = 'https://example.com/data';
        (global.fetch as any).mockRejectedValueOnce(error);

        const { result, waitForNextUpdate } = renderHook(() => useFetch(url));
        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toEqual(error);
        expect(global.fetch).toHaveBeenCalledWith(url);
    });
});
