<script setup lang="ts">
onMounted(async () => {
  // ユーザーがログインしていない場合はログインページへ遷移、LPページを作成する場合はこの処理をなくす
  await useNuxtApp().$existCurrentUser();
});
</script>
<template>
  <div>This page is LP</div>
</template>
