/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                '2xl': '1100px',
            },
        },
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                brand: 'hsl(var(--brand))',
                accent: 'hsl(var(--accent))',
            },
            keyframes: {
                slideLeft: {
                    '0%': { right: '-100%' },
                    '100%': { right: '0' },
                },
                slideRight: {
                    '0%': { right: '0' },
                    '100%': { right: '-100%' },
                },
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                fadeOut: {
                    '0%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
            },
            animation: {
                'slide-right': 'slideRight 200ms linear forwards',
                'slide-left': 'slideLeft 200ms linear forwards',
                'fade-in': 'fadeIn 150ms linear forwards',
                'fade-out': 'fadeOut 150ms linear forwards',
            },
        },
    },
    plugins: [],
};
