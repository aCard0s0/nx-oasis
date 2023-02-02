import {BinancePair} from "@oasis/share-types";

export class BinancePairsDetails {
  private static instance: BinancePairsDetails
  private binancePairs: Set<BinancePair>

  public static getInstance(): BinancePairsDetails {
    if(!BinancePairsDetails.instance) {
      return BinancePairsDetails.instance = new BinancePairsDetails();
    }
    return BinancePairsDetails.instance;
  }

  constructor() {
    this.binancePairs = new Set<BinancePair>()
  }

  add(pairInfo: BinancePair) {
    this.binancePairs.add(pairInfo);
  }
}
