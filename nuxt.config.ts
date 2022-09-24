import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
  app: {
    head: {
      title: 'cocoro-to-classi',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/lp/favicon.png' }],
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      script: [
        {
          src: "https://static.line-scdn.net/liff/edge/2/sdk.js",
        },
      ],
    },
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
