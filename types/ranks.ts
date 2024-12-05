export enum SeasonRankNames {
    Uncalibrated = 0,
    Herald = 1,
    Guardian = 2,
    Crusader = 3,
    Archon = 4,
    Legend = 5,
    Ancient = 6,
    Divine = 7,
    Immortal = 8,
}

export enum RankRomanDigits {
    I = 0,
    II = 1,
    III = 2,
    IV = 3,
    V = 4
}

type SeasonRankNamesKeys = keyof typeof SeasonRankNames;
type RankRomanDigitsKeys = keyof typeof RankRomanDigits;

export type SeasonRankWithRomanNumbers =
  | "Uncalibrated"
  | `${Exclude<SeasonRankNamesKeys, "Uncalibrated">} ${RankRomanDigitsKeys}`;
