import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.tsx', 'resources/scss/app.scss'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    build: {
        manifest: true,
        outDir: 'public/build',
        assetsDir: '',
        minify: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: undefined,
                chunkFileNames: 'js/[name].js',
                entryFileNames: 'js/[name].js',
                assetFileNames: '[ext]/[name].[ext]'
            }
        }
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2015'
        }
    }
});
