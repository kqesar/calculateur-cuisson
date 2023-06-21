// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";
import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
    analyze: true
  },
  nitro: {
    analyze: {
      gzipSize: true
    },
    minify: true,
    sourceMap: false,
    compressPublicAssets: true
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    plugins: [vuetify()]
  },
  devtools: {enabled: false},
})
