import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        './resources/js/**/*.ts',
        './resources/js/**/*.jsx',
        './resources/js/**/*.js',
        './resources/js/Pages/**/*.tsx',
        './resources/js/Components/**/*.tsx',
        './resources/js/Layouts/**/*.tsx'
    ],
    safelist: [
        'tw-bg-blue-500',
        'tw-text-white',
        'tw-p-4',
        // Thêm các class bạn muốn giữ lại
    ],
    prefix: 'tw-',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'gold': '#b8860b',
                'gold-dark': '#96701c',
                primary: {
                    200: '#bfdbfe',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
                accent: {
                    500: '#f59e0b',
                },
            },
        },
    },
    plugins: [forms],
};
