<script setup lang="ts">
// eslint-disable-next-line import/no-named-as-default

import { Ref } from 'vue';
import { Item } from '~/@types/item';
import { LineUser } from '~~/@types/lineUser';

const device = ref('');
const NODE_ENV = process.env.NODE_ENV;

const router = useRouter();

const lineUser: Ref<LineUser> = ref();

const itemList: Ref<Item[]> = ref([]);

onMounted(async () => {
  device.value = (window as any).liff.getOS();
  lineUser.value = await useNuxtApp().$liffInit('1657500508-Mvd69BKj');
  // ユーザーが登録したデータを配列で取得（item[]）
  itemList.value = useNuxtApp().$registerCardId(lineUser.value.userId);
});

const toScan = () => {
  const liff = (window as any).liff;
  liff.openWindow({ url: 'https://cocoro-to-classi.vercel.app/scan', external: true });
};

const toItemDetailPage = (itemId: string) => {
  router.push(`/item?id=${itemId}`);
};
</script>
<template>
  <div>
    <div v-if="lineUser" class="root">こんにちは{{ lineUser.displayName }}さん</div>

    <!-- 連続リーダーモード / ローカル or アンドロイド のみで表示される -->
    <button v-if="device === 'android' || NODE_ENV === 'development'" @click="toScan">連続リーダーモード</button>

    <!-- ユーザーが登録したアイテムの一覧を表示 -->
    <div
      v-if="itemList.length"
      class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-4 mt-4 pt-4 mb-20"
    >
      <div v-for="item in itemList" :key="item.id" @click="toItemDetailPage(item.id)">
        <div class="gizagiza max-w-xs overflow-hidden bg-white rounded w-full border-solid border-2 border-indigo-600">
          <div class="relative h-32 w-full flex justify-center items-center">
            <img :src="item.imageUrl" class="absolute block h-24" />
          </div>
          <div
            class="title leading-5 line-clamp-3 font-semibold text-sm not-italic"
            style="font-family: Hiragino Kaku Gothic Pro"
          >
            <p class="pt-2 pb-2 px-4">{{ item.name }}</p>
          </div>
        </div>
      </div>
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
