import { useState } from "react";
import Config from './../config';
import axios from "axios";
import { Container, IconButton, Input, Tag, Panel, Header, Heading } from "rsuite";
import CheckOutlineIcon from '@rsuite/icons/CheckOutline';

interface Output {
    output: string,
    error: string,
}

const SendSolution = ({ id }: { id: string }) => {
    const [code, setCode] = useState<string>("")
    const [response, setResponse] = useState<Output>({} as Output)

    const RunCode = () => {
        const input = code.replace(/ /g, '\t').replace(/\n/g, '\n');
        axios
            .post(Config.SERVER_EXEC + "/runCode", {
                id: id,
                code: input,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log(res.data)
                setResponse(res.data as Output)
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
            <br/>
            {response.error === null && response.output !== "" ? <Tag color="green"><Heading level={5}>{response.output}</Heading></Tag> :
                response.output === "" ?     <Tag color="red"><Heading level={5}>Your code didn't pass the tests</Heading></Tag>
: <></>
            }

        </>
    );
};

export default SendSolution;