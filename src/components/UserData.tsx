import { useContext, useEffect, useState } from "react";
import AccountContext from "../context/AccountContext";

interface DataType {
    Account: string;
    Coins: number;
}

const UserData = () => {
    const account = useContext(AccountContext);
    const [data, setData] = useState({} as DataType);

    useEffect(() => {
        const coinsVal = account.coins!.substring(0, account.coins!.length - 5);
        const coinsFloat = parseFloat(coinsVal) / 1_000_000;
        const trimAddr = account.address!.substring(0, 5) + "..." + account.address!.substring(account.address!.length - 6, account.address!.length - 1)
        setData(prev =>
        ({
            Account: trimAddr,
            Coins: coinsFloat,
        }),);
    }, [account])

    return (
        <div>
            <>
                <div className="col-12">
                    <div className='bg-primary text-primary border-round p-2'>
                        <div className="flex flex-column">
                            {Object.keys(data).map((keyName, keyIndex) => (
                                <div key={keyIndex} className="grid">
                                    <div className="col-5 text-left font-bold">{keyName}</div>
                                    <div className="col-5 col-offset-2 text-right font-bold">{data[keyName as keyof DataType]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default UserData;
