<script setup lang="ts">
// import { Item } from '~/@types/item';
// eslint-disable-next-line import/no-named-as-default

onMounted(async () => {
  const user = await useNuxtApp().$liffInit('1657500508-Mvd69BKj');
  console.log({ user });
  // ユーザーが登録したデータを配列で取得（item[]）
  // const ItemList: Item[] = [];
});

const toScan = () => {
  const liff = (window as any).liff
  liff.openWindow({ url: 'cocoro-to-classi.vercel.app/scan', external: true });
  console.log('起動しました')
};
</script>
<template>
  <div>
    <div class="root">Hello</div>

    <!-- 連続レーダーモード -->
    <button @click="toScan">連続リーダーモード</button>
  </div>
</template>

<style scoped>
body,
html {
  width: 100vw;
  height: 100vh;
}
</style>
