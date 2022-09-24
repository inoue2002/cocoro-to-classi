import { defineNuxtPlugin } from '#app';

import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
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
    async registerCardId(itemId: string) {
      try {
        await setDoc(doc(getFirestore(), 'items/', itemId), { init_at: new Date(), id: itemId });
      } catch (error) {
        alert(error);
        throw new Error(error);
      }
    },
    // ユーザーが初めてカードにアクセスした時、カードに設定情報を書き込む
    async registerItem() {},
    // カードの情報を取得する（単一）
    async getItem(itemId: string): Promise<Item> {
      const docRef = doc(getFirestore(), 'items', itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        return docSnap.data() as Item;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
        return undefined;
      }
      // const item: Item = {
      //   id: String(itemId),
      //   init_at: new Date(),
      //   register_at: new Date(),
      //   name: 'シーツ',
      //   imageUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
      //   message: 'シーツは2階の棚の上',
      //   authorUser: {
      //     displayName: 'ようかん',
      //     userId: 'zzzzzzzzzzz',
      //     statusMessage: '元気です',
      //     pictureUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
      //   },
      // };
    },
    // ユーザーの登録したカード情報を全て取得する（一覧）
    getItemList(userId: string): Item[] {
      // const tasks: Task[] = [];
      // const snapShots = await getDocs(collection(getFirestore(), 'items'));
      // snapShots.forEach((s) => {
      //   // なんらかの処理
      //   const task = s.data();
      //   tasks.push({ name: task.name, id: s.id });
      // });

      console.log(userId);
      const itemList: Item[] = [
        {
          id: 'test1',
          init_at: Timestamp.fromDate(new Date()),
          register_at: Timestamp.fromDate(new Date()),
          name: 'シーツ',
          imageUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
          message: 'シーツは2階の棚の上',
          authorUser: {
            displayName: 'ようかん',
            userId: 'zzzzzzzzzzz',
            statusMessage: '元気です',
            pictureUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
          },
        },
        {
          id: 'test2',
          init_at: Timestamp.fromDate(new Date()),
          register_at: Timestamp.fromDate(new Date()),
          name: 'シーツ',
          imageUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
          message: 'シーツは2階の棚の上',
          authorUser: {
            displayName: 'ようかん',
            userId: 'zzzzzzzzzzz',
            statusMessage: '元気です',
            pictureUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
          },
        },
        {
          id: 'test3',
          init_at: Timestamp.fromDate(new Date()),
          register_at: Timestamp.fromDate(new Date()),
          name: 'シーツ',
          imageUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
          message: 'シーツは2階の棚の上',
          authorUser: {
            displayName: 'ようかん',
            userId: 'zzzzzzzzzzz',
            statusMessage: '元気です',
            pictureUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
          },
        },
      ];
      return itemList;
    },
    // カードの情報を初期化する
    async deleteItem() {},
  },
}));
