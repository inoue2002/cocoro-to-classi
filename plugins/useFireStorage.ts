import { defineNuxtPlugin } from '#app';

import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export default defineNuxtPlugin(() => ({
  provide: {
    async uploadfile(fileName: string, file: any) {
      console.log('起動');
      const storage = getStorage();
      const storageRef = ref(storage, `items/${fileName}`);
      // 'file' comes from the Blob or File API
      const snapshot= await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref).then((downloadURL) => {
        return downloadURL;
      });
      console.log('Uploaded a blob or file!');
      return downloadURL
    },
  },
}));
