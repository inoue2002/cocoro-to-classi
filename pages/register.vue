<script setup lang="ts">
import { Ref } from 'vue';
import { LineUser } from '~~/@types/lineUser';

const lineUser: Ref<LineUser> = ref();

onMounted(async () => {
  lineUser.value = await useNuxtApp().$liffInit('1657500508-Mvd69BKj');
});

// todo - 画像を指定すると、firestorageに保存してくれる機能の実装

const submit = () => {
  useNuxtApp().$registerItem();
  console.log('登録しました');
  (window as any).liff.close();
};
</script>
<template>
  <div>
    タグ設定フォーム 名前 画像 メッセージ： 送信
    <div>
      <button @click="submit">送信</button>
    </div>
  </div>
</template>

<style scoped>
body,
html {
  width: 100vw;
  height: 100vh;
}
</style>
