import { useEffect, useState } from "react";
import Config from './../config';
import axios from "axios";
import { Button, Col, Container, Heading, List, Panel, Row } from "rsuite";
import SendSolution from "./SendSolution";

interface ProblemContent {
    title: string,
    statement: string,
    examples: string[],
    error: string,
}

const ChosenProblem = () => {
    const [data, setData] = useState<ProblemContent>({} as ProblemContent)

    useEffect(() => {
        console.log(200)
        axios
            .get(Config.SERVER_URL + "/getProblem/1")
            .then((res) => {
                console.log(res.data)
                setData(res.data as ProblemContent)
            })
    }, [])
    return (
        <>
            {
                data.error === null ?
                    <>
                        <Heading level={1}>{data.title}</Heading>
                        <Container>
                            <Panel header="The problem" bordered>
                                <Col>
                                    <Row>
                                        {data.statement}
                                    </Row>
                                    <br/>
                                    <br/>
                                    <Row>
                                        <Heading level={6}>Some examples</Heading>
                                        <List>
                                            {data.examples.map((item, idx) => {
                                                return <>
                                                    <List.Item>
                                                        {item}
                                                    </List.Item>
                                                </>
                                            })}
                                        </List>
                                    </Row>
                                </Col>
                            </Panel>
                            <SendSolution/>
                        </Container>
                    </> : <Heading level={1}>An error ocurred, please refresh the page</Heading>
            }
        </>
    );
};

export default ChosenProblem;