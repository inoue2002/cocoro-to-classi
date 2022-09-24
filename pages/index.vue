<script setup lang="ts">
  const isNFCAvailable = ref(false);
  // const serialNumber = ref(0);
  // const message = ref();
  onMounted(async () => {
    isNFCAvailable.value = "NDEFReader" in window;
    if (!isNFCAvailable.value) return;
    const reader = new NDEFReader();
    await reader.scan();
    reader.addEventListener("error", () => {
      console.log("error");
    });
    reader.addEventListener("reading", (event) => {
      console.log(event);
    })
  });
</script>
<template>
  <div>{{isNFCAvailable ? "Web NFC Availble" : "Web NFC Unavailable"}}</div>

</template>
