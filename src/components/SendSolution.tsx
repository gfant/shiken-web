import { useContext, useEffect, useRef, useState } from "react";
import Config from './../config';
import axios from "axios";
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { AdenaService } from "../services/adena/adena";
import { EMessageType } from "../services/adena/adena.types";
import AccountContext from "../context/AccountContext";
import SendButton from "./Problem/SendCodeButton";
import { MsgSend } from "@gnolang/gno-js-client";

interface Output {
    output: string,
    error: string,
}



const SendSolution = ({ id }: { id: string }) => {
    const [count, setCount] = useState(0);
    const { address } = useContext(AccountContext);
    const [code, setCode] = useState<string>('')
    const [hash, setHash] = useState<string>('')
    const [response, setResponse] = useState<Output>({} as Output)
    const toast = useRef<Toast>(null);


    const showToast = ({ severity, summary, detail }: { severity: "success" | "info" | "warn" | "error", summary: string, detail: string }) => {
        toast?.current?.show({ severity: severity, summary: summary, detail: detail, life: 3000 });
    }

    useEffect(() => {
        if (count > 0) {
            if (response.error !== null) {
                showToast({ severity: "error", summary: "Error in your code", detail: "Your code didn't pass the tests" })
            }
            if (response.error === null && response.output !== "") {
                showToast({ severity: "success", summary: "Congratulations!", detail: `The response was ${response.output}` })
            }
        }
    }, [response, count])

    const SendCrypto = async () => {
        if (address === "" || address === null) {
            // Wallet not connected
            showToast({ severity: "error", summary: "Connect your wallet", detail: "" })
            return;
        }

        try {
            const sendMsg: MsgSend = {
                from_address: address,
                to_address: "g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5",
                amount: "10000000ugnot",
            };

            const getTx = await AdenaService.sendTransaction(
                [
                    {
                        type: EMessageType.MSG_SEND,
                        value: sendMsg
                    }
                ],
                5000000
            );
            setHash(getTx.hash);
        } catch (e) {
            console.error(e);

        }

    };

    const RunCode = () => {
        const input = code.replace(/ /g, '\t').replace(/\n/g, '\n');
        axios
            .post(Config.SERVER_EXEC + "/run", {
                id: id,
                code: input,
            }, {
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    'Access-Control-Allow-Origin': "*",
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT"
                }
            })
            .then((res) => {
                console.log(res.data)
                setResponse(res.data as Output)
                setCount(prev => prev + 1)
            })
    }
    return (
        <>
            <Toast ref={toast} />
            <Card title="Your solution" className="bg-white m-2 text-primary-900">
                <p>Add your code in the following box</p>
                <div className="grid">
                    <div className="col-8 col-offset-3">
                        <InputTextarea autoResize id="code" value={code} onChange={e => setCode(e.target.value)} cols={60} rows={12} className="text-white justify-center col-9" />
                    </div>
                </div>
                {hash === "" ? <div onClick={() => { SendCrypto() }}><SendButton content={"Generate hash"} /></div> : <div onClick={() => { RunCode() }}><SendButton content={"Send Solution"} /></div>}
                <div className="col-8 col-offset-3">
                    {hash !== "" ? <div>
                        <p>Hash for attempt: <b>{hash}</b></p>
                    </div> : <></>}
                </div>
                <br />
            </Card>
        </>
    );
};

export default SendSolution;