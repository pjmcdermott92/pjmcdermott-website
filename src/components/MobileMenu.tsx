import { cn } from '@/utils';
import useToggle from '@/utils/hooks/useToggle';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { Icons } from './Icons';
import useResize from '@/utils/hooks/useResize';
import { NAV_LINKS } from '@/constants';

export default function MobileMenu() {
    const [open, toggleOpen] = useToggle(false);
    const [isClosing, toggleClosing] = useToggle(false);
    const windowWidth = useResize();

    useEffect(() => {
        let time: any;
        clearTimeout(time);
        if (isClosing) {
            time = setTimeout(() => {
                toggleClosing(false);
                toggleOpen(false);
                clearTimeout(time);
            }, 250);
        }
    }, [isClosing]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') toggleClosing(true);
        };

        document.addEventListener('keyup', handler);

        return () => document.removeEventListener('keyup', handler);
    }, []);

    if (windowWidth > 1023) return null;

    return (
        <>
            <button
                aria-label='Toggle nav menu'
                className='fixed top-24 xl:top-12 right-0 size-10 flex items-center justify-center rounded-ss-md rounded-es-md bg-blue-500 cursor-pointer focus:ring-2 ring-black opacity-40 hover:opacity-100'
                title='Show Navigation'
                onClick={() => toggleOpen(true)}
            >
                <Icons.menu className='text-white' />
            </button>
            {open ? (
                <div
                    className={cn(
                        'w-60 fixed z-20 top-0 -right-full bottom-0 bg-background shadow-2xl border-l-2 border-blue-800',
                        isClosing ? 'animate-slide-right' : 'animate-slide-left'
                    )}
                >
                    <div className='p-4 relative w-full'>
                        <button className='block ms-auto' onClick={() => toggleClosing(true)}>
                            <X className='size-8' />
                        </button>
                        <nav className='mt-12 text-center'>
                            <ul className='flex flex-col gap-5 px-6 text-2xl'>
                                {NAV_LINKS.map(({ title, href }) => (
                                    <a key={title} href={href}>
                                        {title}
                                    </a>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            ) : null}
            {open ? (
                <div
                    aria-hidden='true'
                    onClick={() => toggleClosing(true)}
                    className={cn(
                        'fixed inset-0 z-10 bg-black/45',
                        isClosing ? 'animate-fade-out' : 'animate-fade-in'
                    )}
                />
            ) : null}
        </>
    );
}
