<template>
    <div class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 drop-shadow-2xl">
        <div class="container max-w-xl w-3/4 bg-white p-4 rounded-xl min-h-60 flex justify-center">
            <div class="flex flex-col items-center justify-center p-4">
                <div v-if="hasToken" class="my-4 text-green-500">Token provided</div>
                <div v-else class="text-center flex flex-col gap-2 max-w-xl font-medium text">
                    <div class="text-xl">Прежде чем совершать API запросы, необходимо установить токен авторизации Stratz.</div>
                    <NuxtLink to="https://stratz.com/api" target="_blank">Получить токен можно <span class="text-[#0ED08C] underline">здесь</span></NuxtLink>
                    <div class="mt-2 flex flex-col gap-4 items-center">
                        <input v-model="tokenInput" placeholder="Введите токен" class="w-full border border-red-400 p-1 rounded-md">
                        <button @click="auth.setToken(tokenInput)" class="bg-[#693EFE] text-white py-2 px-4 rounded-xl hover:bg-[#412a94] font-medium">Установить токен</button>
                        <button @click="auth.setToken(baseToken)" class="text-[#693EFE]">Или использовать предустановленный токен</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { usePlayerStore } from '~/store/players';

const players = usePlayerStore();
const auth = useAuthStore();
const baseToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiNzg2YjY2MmUtMmI1Zi00NzQ0LWJjZmEtMzhlYzIxNWY2MDEyIiwiU3RlYW1JZCI6IjQyNDA2ODE0NSIsIm5iZiI6MTczMzQzODU0OCwiZXhwIjoxNzY0OTc0NTQ4LCJpYXQiOjE3MzM0Mzg1NDgsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.vSx5CcWQgD4SGRg9xu_sIpnF7L5LDpk7LBfXYtvY5lk';

const tokenInput = ref<string>(auth.getToken || '');

const hasToken = computed(() => auth.getToken !== null);
</script> 