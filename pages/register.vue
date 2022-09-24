<script setup lang="ts">
import { Ref } from 'vue';

import { LineUser } from '~~/@types/lineUser';

const lineUser: Ref<LineUser> = ref();

const imageFile: any = ref();

// パラメーターの取得
const route = useRoute();
// todo - エラーハンドリングをやる
const itemId = route.query.id as string;

onMounted(async () => {
  lineUser.value = await useNuxtApp().$liffInit('1657500508-Mvd69BKj');
  console.log(lineUser.value.userId);
});

// todo - 画像を指定すると、firestorageに保存してくれる機能の実装

const submit = async () => {
  const imageUrl = await useNuxtApp().$uploadfile(`item/${lineUser.value.userId}_${itemId}`, imageFile.value);
  console.log({ imageUrl });

  // useNuxtApp().$registerItem();
  console.log('登録しました');
  // (window as any).liff.close();
};

const changeImageFile = (e: any) => {
  console.log('起動しました');
  if (e.target.files[0]) {
    console.log(e.target.files[0]);
    imageFile.value = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target != null) {
        console.log(String(e.target.result));
      }
    };
    console.log(imageFile.value);
    // reader.readAsDataURL(imageFile as unknown as Blob);
  }
};
</script>
<template>
  <div>
    <h2 v-if="lineUser" class="displayName">こんにちは{{ lineUser.displayName }}さん</h2>
    <p>タグ設定フォーム</p>

    <div class="mb-6 px-3">
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ものの名前</label>
      <input
        id="titile"
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
    <div class="mb-6 px-3">
      <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">メッセージ</label>
      <input
        id="message"
        type="textarea"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
    <input type="file" accept="img/*,png/*" class="p-6 bg-red-500" @change="changeImageFile" />
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
