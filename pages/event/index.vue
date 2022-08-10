<script setup>
onMounted(async () => {
  // すでにログインしている場合はログイン後のページを表示する
  await useNuxtApp().$existCurrentUser();
});

const logOut = async () => {
  await useAuth().signOut();
  useRouter().push("/login");
};
</script>
<template>
  <div>
    <div>
      <p class="text-3xl">ログイン完了後</p>
      <p>Hello!</p>
      <div @click="logOut()">ログアウト</div>
      <div>
        ログイン情報
        {{ useAuth().token }}
      </div>
    </div>
    <NuxtWelcome />
  </div>
</template>
