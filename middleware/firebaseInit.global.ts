// import { initializeApp, getApp } from "firebase/app";
import { initializeApp } from 'firebase/app';
// import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { useRuntimeConfig } from '#app';

export default defineNuxtRouteMiddleware(() => {
  const config = useRuntimeConfig();
  initializeApp({
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.FIREBASE_APP_ID,
  });
  //   if (process.env.NODE_ENV === "development") {
  //     // 開発時はlocalhostを参照する
  //     const functions = getFunctions(getApp());
  //     connectFunctionsEmulator(functions, "localhost", 5002);
  //   }
});
