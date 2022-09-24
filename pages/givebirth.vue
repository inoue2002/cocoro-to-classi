<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';

  const URL_BASE = "https://liff.line.me/1657500508-Mvd69BKj/item?id=";
  const isNFCAvailable = ref(false);
  const targetURL = ref("No ID");
  let reader = null;
  onMounted(() => {
    console.log("Mounted");
    isNFCAvailable.value = "NDEFReader" in window;
    try {
      // @ts-ignore
      reader = new NDEFReader();
    } catch(err) {
      console.log(err);
    }
  })

  const NFCOnScan = async () => {
    console.log("scanning...");
    try {
      await reader.scan();
    } catch(error){
      alert(error);
      console.log(error)
    }
    reader.addEventListener("error", () => {
      console.log("Error");
    });
    reader.addEventListener("reading", ({message}) => {
      const firstRecord = message.records[0];
      if (!firstRecord) {
        const itemId = uuidv4()
        targetURL.value = `${URL_BASE}${itemId}`;
        try {
          // 新しくタグに書き込む
          reader.write({
            records: [{ recordType: "url", data: targetURL.value }]
          });
          // データーベースに記録する
          useNuxtApp().$registerCardId(itemId)
        } catch(err) {
          alert(err)
          console.log(err);
        }
        return;
      }
      const dataView: DataView = firstRecord.data;
      const decoder: TextDecoder = new TextDecoder("utf-8");
      const strDecoded: string = decoder.decode(dataView.buffer);
      targetURL.value = strDecoded;
    });
  }
</script>

<template>
  <div class="root">
    <div>{{isNFCAvailable ? "Web NFC Available" : "Web FNC Unavailable"}}</div>
    <button class="givebirth" @click="NFCOnScan">タグにいのちを吹き込む</button>
    <div>Target URL: {{targetURL}}</div>
  </div>
</template>

<style scoped>
.root {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
