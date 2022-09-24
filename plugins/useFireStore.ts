import { defineNuxtPlugin } from '#app';

import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { Task } from '~~/@types/task';

import { Item } from '~/@types/item';
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
    // 初期化・書き込みリーダーで生成された乱数をDBに保存する(IDと日付)
    registerCardId(itemId: string) {
      console.log(itemId);
      console.log(new Date());
    },
    // ユーザーが初めてカードにアクセスした時、カードに設定情報を書き込む
    async registerItem() {

    },
    // カードの情報を取得する（単一）
    getItem(itemId: string): Item {
      const item = {
        id: String(itemId),
        init_at: new Date(),
        register_at: new Date(),
        name: 'シーツ',
        imageUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
        message: 'シーツは2階の棚の上',
        authorUserId: '123456789',
      };
      return item;
    },
    // ユーザーの登録したカード情報を全て取得する（一覧）
    getItemList(userId: string): Item[] {
      console.log(userId);
      const itemList: Item[] = [
        {
          id: 'test1',
          init_at: new Date(),
          register_at: new Date(),
          name: 'シーツ',
          imageUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
          message: 'シーツは2階の棚の上',
          authorUserId: '123456789',
        },
        {
          id: 'test2',
          init_at: new Date(),
          register_at: new Date(),
          name: 'シーツ',
          imageUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
          message: 'シーツは2階の棚の上',
          authorUserId: '123456789',
        },
        {
          id: 'test3',
          init_at: new Date(),
          register_at: new Date(),
          name: 'シーツ',
          imageUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
          message: 'シーツは2階の棚の上',
          authorUserId: '123456789',
        },
      ];
      return itemList;
    },
    // カードの情報を初期化する
    async deleteItem() {},
  },
}));
