import { useContext, useEffect, useState } from "react";
import SendSolution from "./SendSolution";
import { useLocation } from "react-router-dom";

import { Card } from 'primereact/card';
import ExampleView from "./Problem/ExampleView";
import ProviderContext from "../context/ProviderContext";
import { parseJSONResponse } from "../pieces/supportFuns";

interface ProblemContent {
    Title: string,
    Statement: string,
    Examples: string[],
    Error: string,
}

const Problem = () => {
    const [problemId, setProblemId] = useState<string>("")
    const location = useLocation();

    const { provider } = useContext(ProviderContext);
    const [problem, setProblem] = useState<ProblemContent>({
        Title: "",
        Statement: "",
        Examples: [],
        Error: "",
    });

    // Gets the problem Id
    useEffect(() => {
        if (location) {
            const parts = location.pathname.split("/");
            const id = parts[parts.length - 1];
            setProblemId(id);
        }
    }, [location])

    // Gets the problem data to show
    useEffect(() => {
        if (provider !== null) {
            const fetchData = async () => {
                provider.evaluateExpression('gno.land/r/dev/shiken', `RenderProblem(${problemId})`)
                    .then((response: any) => parseJSONResponse(response))
                    .then((response: string) => JSON.parse(response) as ProblemContent)
                    .then((response: ProblemContent) => setProblem(response as ProblemContent))
                    .catch((error: any) => console.log(error));
            };
            fetchData();
        }
    }, [problemId, provider])

    return (
        <>
            {
                problem.Title !== "" ?
                    <>
                        <h1>{problem.Title}</h1>
                        <Card title="The problem" className="bg-white m-2 text-primary-900">
                            <p>
                                {problem.Statement}
                            </p>
                        </Card>
                        <Card title="Examples" className="bg-white m-2 text-primary-900">
                            {problem.Examples.map((item, idx) => {
                                return <div key={idx}>
                                    <ExampleView content={item} key={idx} />
                                </div>
                            })}

                        </Card>
                        <SendSolution id={problemId} />
                    </> : <h1>Waiting response from chain...</h1>
            }
        </>
    );
};

export default Problem;