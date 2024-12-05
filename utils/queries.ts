import { gql } from 'graphql-tag'
import type { MatchType, PlayerType } from '~/types/stratzgql';

export const fullQuery = gql`
  query players($steamAccountIds: [Long!]!, $request: PlayerMatchesRequestType!) {
    players(steamAccountIds: $steamAccountIds) {
      steamAccountId
      steamAccount {
        seasonRank
      }
      matches(request: $request) {
        id
        endDateTime
        players {
          hero {
            displayName
          }
        }
      }
    }
  }
`;

export interface PlayersQueryResponse {
  players: PlayerType[];
}

export const transformDataForQuery = (
  data: Array<Record<string, any>>
): {
  steamAccountIds: PlayerType['steamAccountId'][];
  request: { matchIds: MatchType['id'][]; playerList: string };
} => {
  const steamAccountIds: PlayerType['steamAccountId'][] = [];
  const matchIds: MatchType['id'][] = [];

  data.forEach((playersObject) => {
    Object.values(playersObject).forEach((player) => {
      if (player.steamAccountId) {
        steamAccountIds.push(player.steamAccountId);
      }

      if (player.matches) {
        player.matches.forEach((match: any) => {
          if (match?.id) {
            matchIds.push(match.id);
          }
        });
      }
    });
  });

  return {
    steamAccountIds,
    request: {
      matchIds,
      playerList: "SINGLE",
    },
  };
};
