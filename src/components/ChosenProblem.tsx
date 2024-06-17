import { useEffect, useState } from "react";
import Config from './../config';
import axios from "axios";
import SendSolution from "./SendSolution";
import { useLocation } from "react-router-dom";

import { Card } from 'primereact/card';
import ExampleView from "./ChosenProblem/ExampleView";

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
                        <h1>{data.title}</h1>
                        <Card title="The problem" className="bg-white m-2 text-primary-900">
                            <p>
                                {data.statement}
                            </p>
                        </Card>
                        <Card title="Examples" className="bg-white m-2 text-primary-900">
                            {data.examples.map((item, idx) => {
                                return <>
                                    <ExampleView content={item} />
                                </>
                            })}

                        </Card>
                            <SendSolution id={problemId} />
                    </> : <h1>An error ocurred, please refresh the page</h1>
            }
        </>
    );
};

export default ChosenProblem;