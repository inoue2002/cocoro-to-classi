<script setup lang="ts">
const router = useRouter();
const email = ref('');
const password = ref('');

onMounted(async () => {
  // すでにログインしている場合はログイン後のページを表示する
  await useNuxtApp().$existCurrentUser();
});

const login = async () => {
  if (!email.value || !password.value) {
    alert('メールアドレス・パスワードを正しく入力してください。');
    return;
  }

  try {
    // eslint-disable-next-line no-console
    //  useAuth().loginUser.valueがnullの時にtokenを呼び出そうとするとエラーがでる
    // console.log('ログイン前', useAuth().loginUser.value.token);
    await useAuth().signIn(email.value, password.value);
    // eslint-disable-next-line no-console
    console.log(useAuth().loginUser);
    // console.log('ログイン後', useAuth().loginUser.value.token);
    if (useAuth().loginUser.value != null) {
      // eslint-disable-next-line no-console
      console.log('ログイン成功');
      router.push('/event');
    }
  } catch (error) {
    console.log(error);
    // alert('メールアドレス・パスワードが違います。');
  }
};
</script>

<template>
  <main class="bg-gray-50">
    <div class="mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
      <div class="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
        <div class="p-6 sm:p-8 lg:p-16 space-y-8">
          <h2 class="text-2xl lg:text-3xl font-bold text-gray-900">ログイン</h2>
          <form class="mt-8 space-y-6" action="#">
            <div>
              <label for="email" class="text-sm font-medium text-gray-900 block mb-2">メールアドレス</label>
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                class="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
                @keypress.enter="login()"
              />
            </div>
            <div>
              <label for="password" class="text-sm font-medium text-gray-900 block mb-2">パスワード</label>
              <input
                id="password"
                v-model="password"
                type="password"
                name="password"
                placeholder="••••••••"
                class="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                required
                @keypress.enter="login()"
              />
            </div>
          </form>
          <button
            class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
            @click="login()"
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
