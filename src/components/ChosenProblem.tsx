import { useEffect, useState } from "react";
import Config from './../config';
import axios from "axios";
import { Button, Col, Container, Heading, List, Panel, Row } from "rsuite";
import SendSolution from "./SendSolution";
import { useLocation } from "react-router-dom";

interface ProblemContent {
    title: string,
    statement: string,
    examples: string[],
    error: string,
}

const ChosenProblem = () => {
    const [data, setData] = useState<ProblemContent>({} as ProblemContent)
    const [problemId, setProblemId] = useState<string>("")
    const location = useLocation();

    useEffect(() => {
        if (location) {
            const parts = location.pathname.split("/");
            const id = parts[parts.length - 1];
            setProblemId(id);
            axios
                .get(`${Config.SERVER_URL}/getProblem/${id}`)
                .then((res) => {
                    console.log(res.data)
                    setData(res.data as ProblemContent)
                })
        }
    }, [location])

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
                                    <br />
                                    <br />
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
                            <SendSolution id={problemId} />
                        </Container>
                    </> : <Heading level={1}>An error ocurred, please refresh the page</Heading>
            }
        </>
    );
};

export default ChosenProblem;