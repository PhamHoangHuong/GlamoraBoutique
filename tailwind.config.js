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
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                accent: {
                    500: '#f59e0b',
                },
            },
        },
    },
    plugins: [forms],
};
