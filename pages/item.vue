<script setup lang="ts">
import { Ref } from 'vue';
import { Item } from '~/@types/item';
import { LineUser } from '~/@types/lineUser';

// パラメーターの取得
const route = useRoute();

// todo - エラーハンドリングをやる
const itemId = route.query.id as string;

const lineUser: Ref<LineUser> = ref();
const item: Ref<Item> = ref();

// todo - 優先度高 削除機能の実装

// todo - 優先度低 情報のアップデート機能の実装

// todo - 優先度中 一覧ページへ戻る機能の実装

let uttr: SpeechSynthesisUtterance = null;

onMounted(async () => {
  lineUser.value = await useNuxtApp().$liffInit('1657500508-Mvd69BKj');
  // ユーザーが登録したデータを配列で取得（item[]）
  item.value = useNuxtApp().$getItem(itemId);
  // eslint-disable-next-line no-useless-return
  if (!("speechSynthesis" in window)) return;
  uttr = new SpeechSynthesisUtterance();
  uttr.lang = "ja-JP";
  uttr.rate = 0.7;
  uttr.pitch = 1;
});

const onSpeak = (name: string, message: string) => {
  uttr.text = `このアイテムは${name}だよ。`;
  window.speechSynthesis.speak(uttr);
  uttr.text = `メモを読み上げるよ。`;
  window.speechSynthesis.speak(uttr);
  uttr.text = message;
  window.speechSynthesis.speak(uttr);
};
</script>
<template>
  <div>
    <div v-if="lineUser" class="root">こんにちは{{ lineUser.displayName }}さん</div>
    <div v-if="item">
      <p>タイトル：{{ item.name }}</p>
      <p>タグ初期化日： {{ item.init_at }}</p>
      <p>タグ設定日： {{ item.register_at }}</p>
      <p>メッセージ： {{ item.message }}</p>
      <p>設定者： {{ item.authorUserId }}</p>

      <img :src="item.imageUrl" alt="" />
    </div>
    <button class="speak" @click="onSpeak(item.name, item.message)">読み上げる</button>
  </div>
</template>

<style scoped>
body,
html {
  width: 100vw;
  height: 100vh;
}
</style>
