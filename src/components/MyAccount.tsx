import { useContext } from "react";
import AccountContext from "../context/AccountContext";
import ProblemsSolved from "./UserAccount/ProblemsSolved";

const MyAccount = () => {
    const account = useContext(AccountContext);


    const handleCopyToClipboard = async () => {
        await navigator.clipboard.writeText(account.address!)
    };
    return (
        <div>
            <h1 onClick={handleCopyToClipboard} style={{ cursor: 'pointer', userSelect: 'none' }}>
                My account {account.address?.length == 40 ? <span>({account.address})</span>: <span>(Not connected)</span>}
            </h1>
            <div>
                <ProblemsSolved/>
            </div>
        </div>
    );
};

export default MyAccount;
