<script setup lang="ts">
// liff.Init()
onMounted(async () => {
  await useNuxtApp().$liffInit('1657500508-Mvd69BKj');
  console.log(window.liff.getProfile());
});
</script>
<template>
  <div class="root">Hello</div>
</template>

<style scoped>
body,
html {
  width: 100vw;
  height: 100vh;
}
</style>
