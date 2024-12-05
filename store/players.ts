import { defineStore } from 'pinia';
import data from '../assets/players.json';
import { transformDataForQuery } from '~/utils/queries';
import type { HeroType, MatchPlayerType, MatchType, PlayerType } from '~/types/stratzgql';
import { SeasonRankNames, RankRomanDigits, type SeasonRankWithRomanNumbers } from '~/types/ranks';

export const usePlayerStore = defineStore('players', {
  state: () => ({
    players: [] as Array<PlayerType>,
    dataViewPlayers: [] as Array<{ steamId: number, pickedHeroes: HeroType["displayName"][], seasonRank: SeasonRankWithRomanNumbers }>,
  }),
  getters: {
    getPlayers: (state) => state.players || null,
    getDataViewPlayers: (state) => state.dataViewPlayers || null,
    getPlayerCount: (state) => state.players.length,
    getMostPlayedDay: (state) => {
      const dayCount = state.players.reduce((acc, player) => {
        if (Array.isArray(player.matches)) {
          player.matches.forEach((match) => {
            if (match && typeof match.endDateTime === 'number') {
              // unix timestamp в дату
              const date = new Date(match.endDateTime * 1000);
              const day = date.getUTCDate();
              const month = date.getUTCMonth() + 1;
              const year = date.getUTCFullYear();
              const dayKey = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
              acc[dayKey] = (acc[dayKey] || 0) + 1;
            }
          });
        }
        return acc;
      }, {} as Record<string, number>);
    
      let mostPlayedDayKey: string | null = "";
      let maxCount = 0;
    
      Object.entries(dayCount).forEach(([day, count]) => {
        if (count > maxCount) {
          maxCount = count;
          mostPlayedDayKey = day;
        }
      });
    
      if (mostPlayedDayKey !== "") {
        const [day, month, year] = mostPlayedDayKey.split('-').map(Number);
        const date = new Date(year, month - 1, day);
      
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
      }
      
      return null;
    },
    
    getHeroData: (state) => {
      const heroCount = state.players.reduce((acc, player) => {
        if (Array.isArray(player.matches)) {
          player.matches.forEach((match) => {
            if (Array.isArray(match?.players)) {
              const matchPlayer = match.players[0];
              const heroName = matchPlayer?.hero?.displayName;
    
              if (heroName) {
                acc[heroName] = (acc[heroName] || 0) + 1;
              }
            }
          });
        }
        return acc;
      }, {} as Record<string, number>);
      return Object.entries(heroCount)
        .sort(([, countA], [, countB]) => countB - countA);
    },
    
    getActualRanks: (state): number[] => {
      return state.players.flatMap((player) => player.steamAccount?.seasonRank).filter((rank) => rank !== undefined && rank !== null) as number[];
    },
    getAverageRank(): string {
      const actualRanks = this.getActualRanks;
      if (actualRanks.length === 0) return "Не найдено";
    
      const totalRank = actualRanks.reduce((sum: number, rank: number) => sum + rank, 0);
      const averageRank = totalRank / actualRanks.length;
      const digits = averageRank.toFixed(0).padStart(2, '0').split('');
      const rank = parseInt(digits[0]);
      const roman = parseInt(digits[1]);
      switch (true) {
        case (roman >= 5 && roman < 8):
          return SeasonRankNames[rank]+" "+RankRomanDigits[4];
        case (roman >= 8 && roman < 10):
          return SeasonRankNames[rank+1]+" "+RankRomanDigits[0];
        default:
          return SeasonRankNames[rank]+" "+RankRomanDigits[roman];
      }
    },
  },
  actions: {
    async addPlayers() {
      try {
        const requestObject = transformDataForQuery(data);

        // Разделение запроса по чанкам из 5 аккаунтов
        const chunks = this.chunkArray(requestObject.steamAccountIds, 5);

        for (const chunk of chunks) {
          const chunkRequest = {
            steamAccountIds: chunk,
            request: {
              matchIds: requestObject.request.matchIds,
              playerList: "SINGLE",
              take: 5,
            },
          };

          const response = await StratzAPI<PlayersQueryResponse>(fullQuery, chunkRequest);

          this.players = [...this.players, ...(response.players || [])];
        }

        console.log('Players added:', this.players);
      } catch (error) {
        console.error('Failed to fetch players:', error);
      }
    },
    chunkArray(array: number[], chunkSize: number): number[][] {
      const result = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
      }
      return result;
    },
    resetPlayers() {
      this.players = [];
    },
    // больше не используется 
    //
    // fillDataViewPlayers() {
    //   this.dataViewPlayers = this.players.map((player) => {
    //     const steamId = player.steamAccountId || 0;
    
    //     const pickedHeroes = player.matches
    //       ?.flatMap((match) =>
    //         match?.players?.map((matchPlayer) => matchPlayer?.hero?.displayName)
    //       )
    //       .filter((heroName): heroName is string => heroName !== undefined) || [];
    
    //     const seasonRankNumber = player.steamAccount?.seasonRank || 0;
    //     const digits = seasonRankNumber.toString().padStart(2, "0").split("");
    //     const rankIndex = parseInt(digits[0]);
    //     const romanIndex = parseInt(digits[1]);
    
    //     let seasonRank: SeasonRankWithRomanNumbers;
    //     if (seasonRankNumber === 0) {
    //       seasonRank = "Uncalibrated";
    //     } else if (romanIndex >= 5 && romanIndex < 8) {
    //       seasonRank = `${SeasonRankNames[rankIndex]} ${RankRomanDigits[4]}` as SeasonRankWithRomanNumbers;
    //     } else if (romanIndex >= 8 && romanIndex < 10) {
    //       seasonRank = `${SeasonRankNames[rankIndex + 1]} ${RankRomanDigits[0]}` as SeasonRankWithRomanNumbers;
    //     } else {
    //       seasonRank = `${SeasonRankNames[rankIndex]} ${RankRomanDigits[romanIndex]}` as SeasonRankWithRomanNumbers;
    //     }
    //     return {
    //       steamId,
    //       pickedHeroes,
    //       seasonRank,
    //     };
    //   });
    // },
  },
});
