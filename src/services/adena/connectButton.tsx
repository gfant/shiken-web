import { IConnectProps } from './connect.types';
import { FC, useContext, useState } from 'react';
import { AdenaService } from '../../services/adena/adena';
import { IAccountInfo } from '../../services/adena/adena.types';
import Config from '../../config';
import AccountContext from '../../context/AccountContext';
import SidebarButton from '../../components/Sidebar/SidebarButton';

const Connect: FC<IConnectProps> = () => {
    const { setChainID, setAddress, setCoins } = useContext(AccountContext);

    const handleWalletConnect = async () => {
        try {
            await AdenaService.establishConnection("");
            await AdenaService.switchNetwork(Config.CHAIN_ID);
            const info: IAccountInfo = await AdenaService.getAccountInfo();
            console.log(info);

            setAddress(info.address);
            setChainID(Config.CHAIN_ID);
            setCoins(info.coins);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div onClick={handleWalletConnect}>
            <SidebarButton path="" header="Connect" icon="pi pi-wallet" />
        </div>
    );
};

export default Connect;