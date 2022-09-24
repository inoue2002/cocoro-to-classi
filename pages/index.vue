<script setup lang="ts">
// import { Item } from '~/@types/item';
// eslint-disable-next-line import/no-named-as-default

const device = ref('');
const NODE_ENV = process.env.NODE_ENV;

onMounted(async () => {
  device.value = (window as any).liff.getOS();
  const user = await useNuxtApp().$liffInit('1657500508-Mvd69BKj');
  console.log({ user });
  // ユーザーが登録したデータを配列で取得（item[]）
  // const ItemList: Item[] = [];
});

const toScan = () => {
  const liff = (window as any).liff;
  liff.openWindow({ url: 'https://cocoro-to-classi.vercel.app/scan', external: true });
};
</script>
<template>
  <div>
    <div class="root">Hello</div>

    <!-- 連続リーダーモード / ローカル or アンドロイド のみで表示される -->
    <button v-if="device === 'android' || NODE_ENV === 'development'" @click="toScan">連続リーダーモード</button>
  </div>
</template>

<style scoped>
body,
html {
  width: 100vw;
  height: 100vh;
}
</style>
