import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const HOST = env.VITE_HOST || '0.0.0.0';
    const PORT = parseInt(env.VITE_PORT) || 5173;
    const HMR_HOST = env.VITE_HMR_HOST || 'localhost';
    const APP_URL = env.APP_URL || 'http://localhost';

    return {
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
        server: {
            host: HOST,
            port: PORT,
            hmr: {
                host: HMR_HOST,
                protocol: 'ws',
            },
            // Allow connections from any origin
            cors: true,
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
        experimental: {
            renderBuiltUrl(filename, { hostType }) {
                return `/${filename}`;
            },
        },
    };
});
