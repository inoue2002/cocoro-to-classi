import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    A: process.env.A,
  },
  nitro: {
    preset: 'vercel',
  },
  css: ['@/assets/css/tailwind.css'],
  // 参考:https://std9.jp/articles/01fq14pxsp4r6nbyzp2txj46ac
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
});
