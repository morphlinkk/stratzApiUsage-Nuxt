import { RankRomanDigits, SeasonRankNames} from "~/types/ranks";
import type {SeasonRankWithRomanNumbers } from "~/types/ranks";

export const getSeasonRankString = (seasonRankNumber: number): SeasonRankWithRomanNumbers => {
    const digits = seasonRankNumber.toString().padStart(2, "0").split("");
    const rankIndex = parseInt(digits[0]);
    const romanIndex = parseInt(digits[1]);
    let seasonRank: SeasonRankWithRomanNumbers;
    if (seasonRankNumber === 0) {
        seasonRank = "Uncalibrated";
    } else if (romanIndex >= 5 && romanIndex < 8) {
        seasonRank = `${SeasonRankNames[rankIndex]} ${RankRomanDigits[4]}` as SeasonRankWithRomanNumbers;
    } else if (romanIndex >= 8 && romanIndex < 10) {
        seasonRank = `${SeasonRankNames[rankIndex + 1]} ${RankRomanDigits[0]}` as SeasonRankWithRomanNumbers;
    } else {
        seasonRank = `${SeasonRankNames[rankIndex]} ${RankRomanDigits[romanIndex]}` as SeasonRankWithRomanNumbers;
    }
    return seasonRank
}

export const formatUnixDate = (unixTimestamp: number): string =>{
    const date = new Date(unixTimestamp * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }