<script setup lang="ts">
  const isNFCAvailable = ref(false);
  // const serialNumber = ref(0);
  // const message = ref();
  let reader = null;
  onMounted(() => {
    console.log("Mounted");
    try {
      isNFCAvailable.value = "NDEFReader" in window;
    } catch(err) {
      console.log(err);
    }
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
      if (!firstRecord) {
        throw new Error("The first record does not exist");
      }
      const dataView: DataView = firstRecord.data;
      const decoder: TextDecoder = new TextDecoder("utf-8");
      const strDecoded: string = decoder.decode(dataView.buffer);
      console.log(strDecoded);
    })
  }
</script>
<template>
  <div>
    <div>{{isNFCAvailable ? "Web NFC Availble" : "Web NFC Unavailable"}}</div>
    <button class="scan" @click="NFCOnScan">Scan</button>
  </div>
</template>

<style scoped>
.scan {
  margin: 5px;
  padding: 10px;
  background: #eaeaea;
  border-radius: 5px;
}
</style>
