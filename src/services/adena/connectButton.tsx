import { IConnectProps } from './connect.types';
import { FC, useContext, useState } from 'react';
import { AdenaService } from '../../services/adena/adena';
import { IAccountInfo } from '../../services/adena/adena.types';
import Config from '../../config';
import AccountContext from '../../context/AccountContext';

const Connect: FC<IConnectProps> = () => {
    const { setChainID, setAddress } = useContext(AccountContext);
    const [addr, setAddr] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleWalletConnect = async () => {
        setIsLoading(true);
        try {
            // Attempt to establish a connection
            await AdenaService.establishConnection("");

            // Get the account info
            const info: IAccountInfo = await AdenaService.getAccountInfo();

            // Make sure the network is valid
            await AdenaService.switchNetwork(Config.CHAIN_ID);

            setAddr(info.address);
            // Update the account context
            setAddress(info.address);
            setChainID(Config.CHAIN_ID);
        } catch (e) {
            console.error(e);
        }

        setIsLoading(false);
    };

    return (
        <div>
            {isLoading ?
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
                </> :
                <>
                    Current Address: {addr ? addr : ""}
                </>
            }
        </div>
    );
};

export default Connect;