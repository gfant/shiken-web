export interface IAccountContext {
  address: string | null;
  chainID: string | null;
  coins: string | null;

  setAddress: (address: string) => void;
  setChainID: (chainID: string) => void;
  setCoins: (coins: string) => void;
}
