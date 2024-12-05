<script setup lang="ts">
import NoTokenModal from '~/components/NoTokenModal.vue';
import { useAuthStore } from '~/store/auth';
import { usePlayerStore } from '~/store/players';
import { computed } from 'vue';
import { Card } from 'primevue';
import Button from 'primevue/button';
import PlayersDataView from '~/components/PlayersDataView.vue';

const auth = useAuthStore();
const players = usePlayerStore();

const totalPlayers = computed(() => players.getPlayerCount);
const averageRank = computed(() => players.getAverageRank);
const mostPlayedDay = computed(() => players.getMostPlayedDay);
</script>

<template>
  <div class="bg-gray-100 py-6 min-h-screen">
    <!-- Page Header -->
    <header class="w-full text-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Обзор героев игроков</h1>
      <p class="text-gray-500">Детальная статистика и выбранные герои всех игроков</p>
    </header>
    <!-- Statistics Section -->
     <div class="flex justify-center">
      <Card v-if="totalPlayers > 0" class="w-full max-w-3xl bg-white py-2 px-6 rounded shadow">
        <template #title>Статистика</template>
        <template #content>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-2">
                <div>
                    <p class="text-xl font-bold text-blue-600">{{ totalPlayers }}</p>
                    <p class="text-gray-500">Всего игроков</p>
                </div>
                <div>
                    <p class="text-xl font-bold text-green-600">{{ averageRank }}</p>
                    <p class="text-gray-500">Средний ранг</p>
                </div>
                <div>
                    <p class="text-xl font-bold text-purple-600">{{ mostPlayedDay || 'N/A' }}</p>
                    <p class="text-gray-500">Больше всего матчей за день</p>
                </div>
            </div>
        </template>
    </Card>
    <Card v-else class="w-full max-w-3xl bg-white py-2 px-6 rounded shadow">
        <template #title>Основной запрос</template>
        <template #content>
            <div class="mt-2 mb-4">Получает данные о всех игроках, выводит в таблицу steamId игроков, их ранг и список матчей с датой окончания матча и выбранным героем</div>
            <Button size="small" label="Выполнить" @click="players.addPlayers()"/>
        </template>
    </Card>
     </div>
     
    <div class="mt-4 flex justify-center">
        <RouterLink to="/">
            <Button label="Вернуться к инфографике"></Button>
        </RouterLink>
    </div>
    <div class="mt-4 w-full text-center" v-if="players.getPlayerCount > 0">
      <h2 class="text-2xl font-semibold text-gray-800">Результат запроса</h2>
      <p class="text-gray-500">Ниже представлено тело ответа сервера</p>
    </div>
    <div class="w-80% max-w-3xl mx-auto mt-4">
      <PlayersDataView></PlayersDataView>
    </div>
    <NoTokenModal v-if="auth.getToken === null"></NoTokenModal>
    <footer class="w-full text-center mt-8 text-gray-500 text-sm">
      <p>&copy; 2024. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
