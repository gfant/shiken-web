import { createContext } from 'react';
import { IAccountContext } from './accountContext.types';

const AccountContext = createContext<IAccountContext>({
  address: '',
  chainID: '',
  coins: '',
  setAddress: () => { },
  setChainID: () => { },
  setCoins: () => { },
});

export default AccountContext;
