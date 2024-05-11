import { useLayoutEffect, useState } from 'react';

export default function useResize() {
    const [windowWidth, setWIndowWidth] = useState(0);

    useLayoutEffect(() => {
        const update = () => setWIndowWidth(window.innerWidth);

        if (typeof window !== 'undefined') {
            update();
            window.addEventListener('resize', update);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', update);
            }
        };
    }, []);

    return windowWidth;
}
