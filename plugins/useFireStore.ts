import { defineNuxtPlugin } from '#app';

import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { Task } from '~~/@types/task';

export default defineNuxtPlugin(() => ({
  provide: {
    async addTask(name: string): Promise<string> {
      try {
        const docRef = collection(getFirestore(), `users/${useAuth().loginUser.value.uid}/tasks`);
        const res = await addDoc(docRef, { name });
        // eslint-disable-next-line no-console
        console.log('Document written with ID: ', docRef.id);
        return res.id;
      } catch (e) {
        throw new Error('Failed to add task to DB');
      }
    },
    async getTask() {
      const tasks: Task[] = [];
      const snapShots = await getDocs(collection(getFirestore(), 'users', useAuth().loginUser.value.uid, 'tasks'));
      snapShots.forEach((s) => {
        // なんらかの処理
        const task = s.data();
        tasks.push({ name: task.name, id: s.id });
      });
      return tasks;
    },
    // 書き込みリーダーで生成された乱数をDBに保存する
    async registerCardId() {},
    // カードに設定情報を書き込む
    async registerItem() {},
    // カードの情報を取得する（単一）
    async getItem() {},
    // ユーザーの登録したカード情報を全て取得する（一覧）
    async getItemList() {},
    // カードの情報を初期化する
    async deleteItem() {},
  },
}));
