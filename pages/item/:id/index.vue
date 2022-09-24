<script setup lang="ts">
    import { Ref } from 'vue';
    import { Item } from '~/@types/item';
    import { LineUser } from '~/@types/lineUser';
    
    // パラメーターの取得
    const route = useRoute();
    
    const router = useRouter();
    
    // todo - エラーハンドリングをやる
    console.log(route.params)
    const itemId = route.params.id as string;
    
    const lineUser: Ref<LineUser> = ref();
    const item: Ref<Item> = ref();
    
    // todo - 優先度高 削除機能の実装
    
    // todo - 優先度低 情報のアップデート機能の実装
    
    // todo - 優先度中 一覧ページへ戻る機能の実装
    
    let uttr: SpeechSynthesisUtterance = null;
    
    onMounted(async () => {
      lineUser.value = await useNuxtApp().$liffInit('1657500508-Mvd69BKj');
      // ユーザーが登録したデータを配列で取得（item[]）
      const itemData = await useNuxtApp().$getItem(itemId);
      if (itemData === undefined) {
        console.log('このIDに該当するデータがありませんでした');
        return;
      }
      if (!itemData.register_at) {
        console.log('このタグはまだ登録されていません');
        router.push(`/register?id=${itemId}`);
      } else {
        item.value = itemData;
        // eslint-disable-next-line no-useless-return
        if (!('speechSynthesis' in window)) return;
        uttr = new SpeechSynthesisUtterance();
        uttr.lang = 'ja-JP';
        uttr.rate = 0.7;
        uttr.pitch = 1;
      }
    });
    
    const onSpeak = (name: string, message: string) => {
      uttr.text = `このアイテムは${name}だよ。メモを読み上げるよ。${message}`;
      window.speechSynthesis.speak(uttr);
    };
    </script>
    <template>
      <div class="root">
        <h2 v-if="lineUser" class="displayName">こんにちは{{ lineUser.displayName }}さん</h2>
        <div v-if="item">
          <p>id : {{ itemId }}</p>
          <p>タイトル：{{ item.name }}</p>
          <p v-if="item.init_at">タグ初期化日： {{ item.init_at.toDate().toLocaleDateString() }}</p>
          <p v-if="item.register_at">タグ設定日： {{ item.register_at.toDate().toLocaleDateString() }}</p>
          <p>メッセージ： {{ item.message }}</p>
          <p>設定者： {{ item.authorUser.displayName }}</p>
          <div class="img-container">
            <img :src="item.imageUrl" alt="" width="250" />
          </div>
        </div>
        <button class="speak" @click="onSpeak(item.name, item.message)">読み上げる</button>
      </div>
    </template>
    
    <style scoped>
    .root {
      padding-top: 5vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .img-container {
      width: 100%;
      text-align: center;
    }
    img {
      margin: 0 auto;
      padding: 50px 0;
    }
    </style>
    