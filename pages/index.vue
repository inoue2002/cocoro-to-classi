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
    reader.addEventListener("reading", (event) => {
      console.log(event);
    })
  }
</script>
<template>
  <div>
    <div>{{isNFCAvailable ? "Web NFC Availble" : "Web NFC Unavailable"}}</div>
    <button @click="NFCOnScan">Scan</button>
  </div>
</template>
