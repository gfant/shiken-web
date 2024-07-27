import { IConnectProps } from './connect.types';
import { FC, useContext, useState } from 'react';
import { AdenaService } from '../../services/adena/adena';
import { IAccountInfo } from '../../services/adena/adena.types';
import Config from '../../config';
import AccountContext from '../../context/AccountContext';

const Connect: FC<IConnectProps> = () => {
    const { setChainID, setAddress } = useContext(AccountContext);

    const handleWalletConnect = async () => {
        try {
            await AdenaService.establishConnection("");
            await AdenaService.switchNetwork(Config.CHAIN_ID);
            const info: IAccountInfo = await AdenaService.getAccountInfo();

            
            setAddress(info.address);
            setChainID(Config.CHAIN_ID);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <>
                <div className="col-12" onClick={handleWalletConnect}>
                    <div className='bg-primary text-primary border-round hover:bg-white hover:text-purple-500'>
                        <div className="flex flex-column md:flex-row">
                            <div className="flex align-items-center p-2 justify-content-center font-bold border-round">
                                <i className="pi pi-wallet" />
                            </div>
                            <div className="flex align-items-center p-2 justify-content-center font-bold border-round">
                                <p>Connect</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default Connect;