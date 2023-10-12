// vite.config.js

import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'url';
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vuetify(),
        viteCompression({
            algorithm: 'brotliCompress'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
