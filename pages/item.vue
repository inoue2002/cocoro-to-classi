<script setup lang="ts">
import { Ref } from 'vue';
import { Item } from '~/@types/item';
import { LineUser } from '~/@types/lineUser';

// パラメーターの取得
const route = useRoute();

// todo - エラーハンドリングをやる
const itemId = route.query.id as string

const lineUser: Ref<LineUser> = ref();
const item: Ref<Item> = ref();

onMounted(async () => {
  lineUser.value = await useNuxtApp().$liffInit('1657500508-Mvd69BKj');
  // ユーザーが登録したデータを配列で取得（item[]）
  item.value = useNuxtApp().$getItem(itemId);
});
</script>
<template>
  <div>
    <div v-if="lineUser" class="root">こんにちは{{ lineUser.displayName }}さん</div>
  </div>
</template>

<style scoped>
body,
html {
  width: 100vw;
  height: 100vh;
}
</style>
