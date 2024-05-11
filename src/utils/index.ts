import { AVERAGE_READING_WPM } from '@/constants';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeString(string: string) {
    if (typeof string !== 'string' || string.length == 0) {
        return string;
    }

    const stringArray = string.split(' ');
    return stringArray.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
}

export function slugify(string: string) {
    if (!string) return '';
    let slug = string.toLowerCase();

    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();
    slug = slug.replace(/[\s-]+/g, '-');

    return slug;
}

export function calculateReadingTime(content: any) {
    const wordPerMinute = AVERAGE_READING_WPM;
    const wordCount = content.trim().split(/\s+/).length;
    const minutesToRead = Math.ceil(wordCount / wordPerMinute);

    return minutesToRead;
}
