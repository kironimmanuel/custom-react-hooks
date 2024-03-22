import { useCallback, useEffect, useState } from 'react';

export const useScrollProgress = () => {
    const [scrollTop, setScrollTop] = useState<number>(0);

    const onScroll = useCallback(() => {
        // const winScroll = document.documentElement.scrollTop;
        const winScroll = window.pageYOffset;
        // const height =
        //       document.documentElement.scrollHeight -
        //       document.documentElement.clientHeight;
        const height = document.body.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        setScrollTop(scrolled);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    return scrollTop;
};
