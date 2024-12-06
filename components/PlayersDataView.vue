<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

import { computed } from 'vue';
import { usePlayerStore } from '~/store/players';

const players = usePlayerStore();

const playerMatches = computed(() => {
    return players.getPlayers.map(player => ({
        steamAccountId: player.steamAccountId,
        seasonRank: player.steamAccount?.seasonRank || 0,
        matches: player?.matches?.map(match => ({
            matchId: match?.id,
            hero: match?.players?.[0]?.hero?.displayName || 'Unknown',
            endDateTime: match?.endDateTime,
        })) || [],
    }));
});
</script>

<template>
    <div class="max-w-4xl mx-auto w-full">
        <Accordion>
            <AccordionPanel
                v-for="player in playerMatches"
                :key="player.steamAccountId"
                :value="player.steamAccountId"
            >
                <AccordionHeader
                    class="font-medium px-4 py-2 shadow-md transition"
                >
                    {{ `steamId: ${player.steamAccountId} / ${getSeasonRankString(player.seasonRank)}` }}
                </AccordionHeader>
                <AccordionContent>
                    <div class="flex flex-col gap-4 p-4 rounded shadow-sm">
                        <div
                            v-if="player.matches.length > 0"
                            v-for="match in player.matches"
                            :key="match.matchId"
                            class="flex gap-4 p-2 border-b last:border-b-0"
                        >
                            <span class="text-sm font-semibold">matchId: {{ match.matchId }}</span>
                            <span class="text-sm font-semibold">{{ match.hero }}</span>
                            <span class="text-sm font-semibold">{{ formatUnixDate(match.endDateTime) }}</span>
                        </div>
                        <div v-else class="text-gray-500">
                            No matches available
                        </div>
                    </div>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </div>
</template>
