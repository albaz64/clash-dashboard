import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsConfigPath from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode }) => {
    const isProduction = mode === 'production';

    const plugins = [
        react({
            babel: {
                plugins: [jotaiDebugLabel, ...(command === 'serve' ? [jotaiReactRefresh] : [])],
            },
        }),
        tsConfigPath(),
        UnoCSS(),
        VitePWA({
            injectRegister: 'inline',
            manifest: {
                icons: [
                    {
                        src: '//cdn.jsdelivr.net/gh/Dreamacro/clash-dashboard/src/assets/Icon.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
                start_url: '/',
                short_name: 'Clash Dashboard',
                name: 'Clash Dashboard',
                theme_color: '#F4F5F6',
            },
        }),
    ];

    return {
        plugins,
        server: {
            port: 3000,
        },
        base: './',
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "sass:math"; @import "src/styles/variables.scss";',
                },
            },
        },
        build: {
            reportCompressedSize: false,
            rollupOptions: {
                output: {
                    manualChunks: {
                        // 可以根据需要配置手动分块
                        react: ['react', 'react-dom'],
                    },
                },
            },
        },
        esbuild: {
            jsxInject: "import React from 'react'",
        },
    };
});
