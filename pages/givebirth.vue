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
      reader = new NDEFReader();
    } catch(err) {
      console.log(err);
    }
  })

  const NFCOnScan = async () => {
    console.log("scanning...");
    await reader.scan();
    reader.addEventListener("error", () => {
      console.log("Error");
    });
    reader.addEventListener("reading", ({message}) => {
      const firstRecord = message.records[0];
      let targetId = "";
      if (!firstRecord) {
        targetURL.value = `${URL_BASE}${uuidv4()}`;
        try {
          reader.write(targetURL.value);
        } catch(err) {
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
    <button class="givebirth" @click="NFCOnScan">Giving Birth</button>
    <div>Target URL: {{targetURL}}</div>
  </div>
</template>

<style scoped>
body, html {
  width: 100vw;
  height: 100vh;
}
.root {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.givebirth {
  margin: 5px;
  padding: 10px;
  background: #eaeaea;
  border-radius: 5px;
}
</style>
