import { useState } from "react";
import Config from './../config';
import axios from "axios";
import { Container, IconButton, Input, Panel } from "rsuite";
import CheckOutlineIcon from '@rsuite/icons/CheckOutline';

interface ProblemContent {
    title: string,
    statement: string,
    examples: string[],
    error: string,
}

const SendSolution = ({ id }: { id: string }) => {
    const [code, setCode] = useState<string>("")

    const RunCode = () => {
        const input = code.replace(/ /g, '\n').replace(/\n/g, '\t');
        axios
            .post(Config.SERVER_EXEC + "/runCode", {
                id: id,
                code: input,
            })
            .then((res) => {
                console.log(res.data)
            })
    }
    return (
        <>
            <Container>
                <Panel header="Send your solution" bordered>
                    <Input onChange={val => setCode(val)} as="textarea" rows={20} placeholder="Fancy cool code" />
                    <IconButton icon={<CheckOutlineIcon />} onClick={() => { RunCode() }}>Send answer</IconButton>
                </Panel>
            </Container>

        </>
    );
};

export default SendSolution;