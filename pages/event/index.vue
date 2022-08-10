<script setup lang="ts">
import { Ref } from 'vue';
import { Task } from '~~/@types/task';

const tasks: Ref<Task[]> = ref([]);

const name = ref('');

onMounted(async () => {
  // ユーザーがログインしていない場合はログインページへ遷移
  await useNuxtApp().$existCurrentUser();

  tasks.value = await useNuxtApp().$getTask();
});

const logOut = async () => {
  await useAuth().signOut();
  useRouter().push('/login');
};

const addTask = async () => {
  try {
    if (name.value === '') return;
    const id = await useNuxtApp().$addTask(name.value);
    tasks.value.push({ name: name.value, id });
    name.value = '';
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
</script>
<template>
  <div>
    <div>
      <p class="text-3xl">ログイン完了後</p>
      <p>Hello!</p>
      <div @click="logOut()">ログアウト</div>
      <div>
        ログイン情報
        {{ useAuth().loginUser }}
      </div>

      <input v-model="name" type="text" placeholder="タスクの名前を入力" class="border" />
      <div @click="addTask()">タスクを追加</div>
      <div>
        <p class="text-3xl">タスク一覧</p>
        {{ tasks }}

        <li v-for="task of tasks" :key="task.id">{{ task.name }}</li>
      </div>
    </div>
    <NuxtWelcome />
  </div>
</template>
