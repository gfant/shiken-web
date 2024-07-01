import { useEffect, useRef, useState } from "react";
import Config from './../config';
import axios from "axios";
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from "primereact/card";
import SendCodeButton from "./Problem/SendCodeButton";
import { Toast } from "primereact/toast";

interface Output {
    output: string,
    error: string,
}



const SendSolution = ({ id }: { id: string }) => {
    const [code, setCode] = useState<string>('')
    const [count, setCount] = useState(0);
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

    const RunCode = () => {
        const input = code.replace(/ /g, '\t').replace(/\n/g, '\n');
        axios
            .post(Config.SERVER_EXEC + "/run", {
                id: id,
                code: input,
            }, {
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    'Access-Control-Allow-Origin':"*",
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
                <div onClick={() => { RunCode() }}><SendCodeButton /></div>
                <br />
            </Card>
        </>
    );
};

export default SendSolution;