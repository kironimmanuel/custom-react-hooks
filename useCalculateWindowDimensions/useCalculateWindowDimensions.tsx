import { useEffect, useState } from 'react';

interface WindowDimensions {
    width: number;
    height: number;
}

interface HeightSumAndWindowDimensions {
    elmentSum: number;
    windowDimensions: WindowDimensions;
}

const getWindowDimensions = (): WindowDimensions => ({
    width: window.innerWidth,
    height: window.innerHeight,
});

export const useCalculateWindowDimensions = (ids: string[]): HeightSumAndWindowDimensions => {
    const [heightSum, setHeightSum] = useState(0);
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
        typeof window !== 'undefined' ? getWindowDimensions() : { width: 0, height: 0 },
    );

    useEffect(() => {
        const calculateSum = (): void => {
            let sum = 0;
            ids.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    sum += element.offsetHeight;
                }
            });
            setHeightSum(sum);
        };

        const handleResize = (): void => {
            setWindowDimensions(getWindowDimensions());
            calculateSum();
        };

        if (typeof window !== 'undefined') {
            calculateSum();
            window.addEventListener('resize', handleResize);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, [ids]);

    return { elmentSum: heightSum, windowDimensions };
};
