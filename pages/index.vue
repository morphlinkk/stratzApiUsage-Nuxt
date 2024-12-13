<script setup lang="ts">
import Slide from '~/components/Slide.vue';
import { useAuthStore } from '~/store/auth';
import { usePlayerStore } from '~/store/players';

const auth = useAuthStore();
const players = usePlayerStore();

const rankFound = computed(() => {
    if (players.getAverageRank != "Не найдено") return players.getAverageRank
});

</script>

<template>
    <Slide>
        <template v-slot:title>
            <div v-if="players.getMostPlayedDay">
                Больше всего игр было сыграно <span class="text-[#D3FE3E]">{{ players.getMostPlayedDay }}</span>
            </div>
            <div v-else>После выполнения API запроса здесь будет показан день, в который было сыграно<span class="text-[#D3FE3E]"> больше всех матчей</span>
            </div>
        </template>
        <template v-slot:link v-if="players.getMostPlayedDay">
            <RouterLink to="/apiPanel" class="hover:text-[#D3FE3E]">статистика по остальным дням</RouterLink>
        </template>
    </Slide>
    <Slide bg-color="#EE964B">
        <template v-slot:title>
            <div v-if="(rankFound)">
                Средний ранг игроков составил <span class="text-[#D3FE3E]">{{ rankFound }} </span>
            </div>
            <div v-else>
                После выполнения API запроса здесь будет показан <span class="text-[#D3FE3E]">средний ранг</span> игроков
            </div>
        </template>
        <template v-slot:link v-if="rankFound">
            <RouterLink to="/apiPanel" class="hover:text-[#D3FE3E]">статистика по всем игрокам</RouterLink>
        </template>
    </Slide>
    <Slide bg-color="#3F3244">
        <template v-slot:title>
            <div v-if="players.getHeroData.length!==0">
                Самым популярным героем стал <span class="text-[#D3FE3E]">{{ players.getTopHeroes[0] || "Drow Ranger"}}</span>
            </div>
            <div v-else>
                После выполнения API запроса здесь будет показан <span class="text-[#D3FE3E]">самый популярный герой</span> в выборке матчей
            </div>
        </template>
        <template v-slot:link v-if="players.getHeroData.length!==0">
            <RouterLink to="/apiPanel" class="hover:text-[#D3FE3E]">кто вошел в топ 5 героев?</RouterLink>
        </template>
    </Slide>
    <!-- <Slide bg-color="#9E81FC" top-bar-color="#9E81FC" bottom-bar-color="#9E81FC">
        <template v-slot:title>
            <div class="flex flex-col items-center gap-8">
                <div>
                    Вся статистика приведенная на странице была получена с помощью заранее выполненных <span class="text-[#D3FE3E]">API запросов</span>
                </div>
            </div>
        </template>
        <template v-slot:link>
            <div class="text-3xl font-medium">
                cовершить запросы в реальном времени можно <NuxtLink to="/apiPanel" class="text-[#D3FE3E]">здесь</NuxtLink>
            </div>
        </template>
    </Slide> -->
    <NoTokenModal v-if="false"></NoTokenModal>
</template>