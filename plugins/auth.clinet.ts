import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => ({
  provide: {
    async existCurrentUser() {
      const { checkAuthState, loginUser} = useAuth();
      await checkAuthState();
      // eslint-disable-next-line no-console
      console.log("ログインしているか確認します");
      if (!loginUser.value) {
        // eslint-disable-next-line no-console
        console.log("まだログインしていません");
        useRouter().push("/login");
      } else {
        // eslint-disable-next-line no-console
        console.log("すでにログインしています");
        // ログイン後に元のページへ戻る
        const to = useRoute().redirectedFrom?.fullPath || "/event";
        navigateTo(to, { redirectCode: 302 });
      }
    },
  },
}));
