<script setup lang="ts">
import { Ref } from 'vue';

  const isNFCAvailable = ref(false);
  const isSpeechSynthesis = ref(false);
  const decodedMessage = ref("No message has been decoded");
  const uttr: Ref<SpeechSynthesisUtterance> = ref(null);
  // const serialNumber = ref(0);
  // const message = ref();
  let reader = null;
  onMounted(() => {
    console.log("Mounted");
    isNFCAvailable.value = "NDEFReader" in window;
    isSpeechSynthesis.value = "speechSynthesis" in window;
    uttr.value = new SpeechSynthesisUtterance();
    uttr.value.lang = "ja-JP";
    uttr.value.rate = 0.7;
    uttr.value.pitch = 1;
    try {
      reader = new NDEFReader();
    } catch(err) {
      console.log(err);
    }
  });

  const onSpeak = (message: string) => {
    uttr.value.text = message;
    window.speechSynthesis.speak(uttr.value);
  };

  const NFCOnScan = async () => {
    console.log("scanning...");
    await reader.scan();
    reader.addEventListener("error", () => {
      console.log("Error");
    });
    reader.addEventListener("reading", ({message}) => {
      const firstRecord = message.records[0];
      if (!firstRecord) {
        decodedMessage.value = "No message has been registered on the tag"
      }
      const dataView: DataView = firstRecord.data;
      const decoder: TextDecoder = new TextDecoder("utf-8");
      const strDecoded: string = decoder.decode(dataView.buffer);
      decodedMessage.value = strDecoded;
    })
  }
</script>
<template>
  <div class="root">
    <div>{{isNFCAvailable ? "Web NFC Availble" : "Web NFC Unavailable"}}</div>
    <div>{{isSpeechSynthesis ? "Web Speech API Availble" : "Web Speech API Unavailable"}}</div>
    <div>
      <button class="scan" @click="NFCOnScan">Scan</button>
      <button id="speak" class="speak" @click="onSpeak('この服は棚の2段目にしまってね')">Speak Out</button>
    </div>
    <div>Decoded: {{decodedMessage}}</div>
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
