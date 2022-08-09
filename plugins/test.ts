import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => ({
  provide: {
    test() {
      const $config = useRuntimeConfig();
      // eslint-disable-next-line no-console
      console.log($config.A);
      console.log('起動しました');
    },
  },
}));
