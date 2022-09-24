// eslint-disable-next-line import/order
import { defineNuxtPlugin } from '#app';
import { LiffMockPlugin } from '@line/liff-mock';

import { LineUser } from '~~/@types/lineUser';

export default defineNuxtPlugin(() => ({
  provide: {
    async liffInit(liffId: string): Promise<LineUser> {
      console.log('初期化を始めます', liffId);
      try {
        // ローカル環境
        if (process.env.NODE_ENV === 'development') {
          (window as any).liff.use(new LiffMockPlugin());
          await (window as any).liff.init({ liffId, mock: true });
          if (!(window as any).liff.isInClient()) {
            (window as any).liff.login();
          }
        } else {
          // 本番環境
          await (window as any).liff.init({
            liffId,
          });
          if (!(window as any).liff.isInClient() && !(window as any).liff.isLoggedIn()) {
            (window as any).liff.login({
              redirectUri: window.location.href,
            });
          }
        }
        const profile = await (window as any).liff.getProfile();
        console.log(profile);
        return profile;
      } catch (err) {
        // eslint-disable-next-line
        console.error(err);
        return { userId: '0000000000000000', statusMessage: 'エラーが発生しました', displayName: 'Error' };
      }
    },
  },
}));
