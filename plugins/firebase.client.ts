import { defineNuxtPlugin } from '#app';

import { initializeApp } from 'firebase/app';

export default defineNuxtPlugin(() => {
  useState('firebaseApp', () => {
    const config = useRuntimeConfig();
    const firebaseConfig = {
      apiKey: config.FIREBASE_API_KEY,
      authDomain: config.FIREBASE_AUTH_DOMAIN,
      projectId: config.FIREBASE_PROJECT_ID,
      storageBucket: config.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
      appId: config.FIREBASE_APP_ID,
    };
    // eslint-disable-next-line no-console
    console.log('検証用', { firebaseConfig });
    return initializeApp(firebaseConfig);
  });
});
