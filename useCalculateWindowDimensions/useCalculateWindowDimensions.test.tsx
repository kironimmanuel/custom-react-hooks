import { renderHook } from '@testing-library/react-hooks';
import { useCalculateWindowDimensions } from './useCalculateWindowDimensions';

describe('useCalculateDimensions hook', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'innerWidth', { value: 1024 });
        Object.defineProperty(window, 'innerHeight', { value: 768 });
    });

    afterAll(() => {
        delete (window as any).innerWidth;
        delete (window as any).innerHeight;
    });

    it('should return correct element sum and window dimensions', () => {
        const ids = ['element1', 'element2', 'element3'];
        const element1Height = 100;
        const element2Height = 150;
        const element3Height = 200;

        document.getElementById = jest.fn((id: string) => {
            switch (id) {
                case 'element1':
                    return { offsetHeight: element1Height } as HTMLElement;
                case 'element2':
                    return { offsetHeight: element2Height } as HTMLElement;
                case 'element3':
                    return { offsetHeight: element3Height } as HTMLElement;
                default:
                    return null;
            }
        });

        const { result } = renderHook(() => useCalculateWindowDimensions(ids));

        expect(result.current.elmentSum).toBe(element1Height + element2Height + element3Height);
        expect(result.current.windowDimensions).toEqual({ width: 1024, height: 768 });
    });
});
