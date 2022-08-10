<script setup>
onMounted(async () => {
  // ユーザーがログインしていない場合はログインページへ遷移
  await useNuxtApp().$existCurrentUser();
});

const logOut = async () => {
  await useAuth().signOut();
  useRouter().push('/login');
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
