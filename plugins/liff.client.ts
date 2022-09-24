// eslint-disable-next-line import/order
import { defineNuxtPlugin } from '#app';
import { LiffMockPlugin } from '@line/liff-mock';

export default defineNuxtPlugin(() => ({
  provide: {
    async liffInit(liffId: string) {
      try {
        // ローカル環境
        if (process.env.NODE_ENV === 'development') {
          window.liff.use(new LiffMockPlugin());
          await (window as any).liff.init({ liffId, mock: true });
          const user = window.liff.getProfile();
          // eslint-disable-next-line no-console
          console.log(user);
          return user;
        } else {
          // TODO - デプロイ後のinit処理を書く
        }
      } catch (err) {
        // eslint-disable-next-line
        console.error(err);
        return {};
      }
    },
  },
}));
