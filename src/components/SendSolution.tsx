import { useState } from "react";
import Config from './../config';
import axios from "axios";
import { Button, Container, Input, Panel } from "rsuite";

interface ProblemContent {
    title: string,
    statement: string,
    examples: string[],
    error: string,
}

const SendSolution = () => {
    const [data, setData] = useState<ProblemContent>({} as ProblemContent)

    const RunCode = () => {
        axios
            .post(Config.SERVER_URL + "/runCode",)
            .then((res) => {
                console.log(res.data)
                setData(res.data as ProblemContent)
            })
    }
    return (
        <>
            <Container>
                <Panel header="Send your solution" bordered>
                    <Input as="textarea" rows={20} placeholder="Fancy cool code" />
                </Panel>
            </Container>

        </>
    );
};

export default SendSolution;