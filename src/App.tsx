import { useState, useEffect } from 'react';
import { GnoWSProvider } from '@gnolang/gno-js-client';
import { IAccountContext } from './context/accountContext.types.js';
import { IProviderContext } from './context/providerContext.types.js';
import AccountContext from './context/AccountContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProviderContext from './context/ProviderContext';
import Config from './config';

import PageHome from './pages/pageHome';
import PageProblems from './pages/pageProblems';
import PageChosenProblem from './pages/pageChosenProblem';

import { PrimeReactProvider } from 'primereact/api';

import "./style.css"
import 'primereact/resources/themes/vela-purple/theme.css';// theme
import 'primereact/resources/primereact.css'; // core css

const App = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [chainID, setChainID] = useState<string | null>(null);

  // Only God knows
  const accountContext: IAccountContext = {
    address,
    chainID,

    setAddress,
    setChainID
  };

  // Provides the websocket required to connect to chain
  const [provider, setProvider] = useState<GnoWSProvider | null>(
    new GnoWSProvider(Config.CHAIN_RPC)
  );

  useEffect(() => { }, [provider]);

  // Still not sure
  const wsProvider: IProviderContext = {
    provider,
    setProvider
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageHome />,
    },
    {
      path: "/problems",
      element: <PageProblems />,
    },
    {
      path: "/chosenproblem/:problemId",
      element: <PageChosenProblem />,
    },
  ])

  return (
    <PrimeReactProvider>
      <ProviderContext.Provider value={wsProvider}>
        <AccountContext.Provider value={accountContext}>
          <RouterProvider router={router} />
        </AccountContext.Provider>
      </ProviderContext.Provider>
    </PrimeReactProvider>
  );
};

export default App;
