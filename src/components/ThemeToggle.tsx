import { cn } from '@/utils';
import { useLocalStorage } from '@/utils/hooks/useStorage';
import { useEffect } from 'react';
import { Icons } from './Icons';

const DARK = 'dark';
const LIGHT = 'light';

export default function ThemeToggle() {
    const [theme, setTheme] = useLocalStorage('pmc_theme', () => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
        }
    });

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    return (
        <label
            htmlFor='theme'
            className='inline-flex items-center m-2 gap-[2px] cursor-pointer focus-within:ring-2 ring-black focus-within:ring-offset-4'
            title={`Toggle ${theme == DARK ? LIGHT : DARK} theme`}
        >
            <span className='sr-only'>Theme control</span>
            <Icons.sun className='size-4 text-foreground' />
            <input
                id='theme'
                className='opacity-0 w-0 h-0'
                type='checkbox'
                checked={theme == DARK}
                onChange={() => setTheme(theme == DARK ? LIGHT : DARK)}
            />
            <div className='relative w-8 h-4'>
                <span
                    className={cn(
                        'absolute inset-0 bg-gray-200 rounded-md before:absolute before:top-1/2 before:-translate-y-1/2 before:h-[20px] before:w-[20px] before:content-[""] before:bg-gray-400 before:rounded-full',
                        theme == DARK ? 'before:right-0' : 'before:left-0'
                    )}
                />
            </div>
            <Icons.moon className='size-4 text-foreground' />
        </label>
    );
}
