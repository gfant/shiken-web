import { useContext, useEffect, useState } from "react";
import DefaultView from "./DefaultView";
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
                My account ({account.address})
            </h1>
            <div>
                <ProblemsSolved/>
            </div>
        </div>
    );
};

export default MyAccount;
