<template>
    <div class="flex max-w-screen justify-center my-16">
        <button @click="fetchPlayerRank(playerInput)">Get seasonRank</button>
        <input v-model="playerInput" placeholder="Input your steamAccountId" class="border border-red-400 p-1">
    </div>
    <div v-if="playerRank" class="text-center my-4">
        Player season rank: {{ playerRank }}
    </div>
</template>

<script setup lang="ts">
import type { DotaQuery } from '~/types/stratzgql';
const playerInput = ref<string>('162560919');
const playerRank = ref<string | null>(null);

const fetchPlayerRank = async (playerInput: string) => {
    const res = await StratzAPI<DotaQuery>(fullQuery, { steamAccountId: parseInt(playerInput) });
    console.log(res);
    playerRank.value = res?.player?.steamAccount?.seasonRank || null;
    return res;
}
</script>