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

onMounted(async () => {
  lineUser.value = await useNuxtApp().$liffInit('1657500508-Mvd69BKj');
  // ユーザーが登録したデータを配列で取得（item[]）
  item.value = useNuxtApp().$getItem(itemId);
});
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
  </div>
</template>

<style scoped>
body,
html {
  width: 100vw;
  height: 100vh;
}
</style>
