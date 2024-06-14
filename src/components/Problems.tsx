import { useEffect, useState } from "react";
import Config from './../config';
import axios from "axios";
import { Button, Col, Heading, Row } from "rsuite";
import { Link } from "react-router-dom";

const Problems = () => {
    const [data, setData] = useState<string[]>(["No available problems yet"])

    useEffect(() => {
        axios
            .get(Config.SERVER_URL + "/getProblemList")
            .then((res) => {
                setData(res.data.problems)
            })
    }, [])
    return (
        <>
            <Heading level={1}>Problems list</Heading>
            <Col>
                {data.map((val, idx) => {
                    return <Row key={val}>
                        <Link to={`/chosenproblem/${idx+1}`}>
                            <Button>
                                {val}
                            </Button>
                        </Link>
                    </Row>
                })}
            </Col>
        </>
    );
};

export default Problems;
