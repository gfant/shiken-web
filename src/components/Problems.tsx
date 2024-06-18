import { useContext, useEffect, useState } from "react";
import Config from './../config';
import ProblemsButton from "./Problems/ProblemButton";
import ProviderContext from "../context/ProviderContext";
import AccountContext from "../context/AccountContext";
import { parseJSONResponse } from "../pieces/supportFuns";

interface StructuredData {
    [key: number]: Problem;
}

interface Problem {
    Title: string;
    Statement: string;
    Examples: string[];

}

const Problems = () => {
    const nothing = "No available problems yet";

    const { provider } = useContext(ProviderContext);
    const { address } = useContext(AccountContext);
    const [Problems, setProblems] = useState<StructuredData>({})

    useEffect(() => {
        // Calls contract to get Problems data
        const GetProblems = async () => {
            if (provider !== null && address !== "") {
                const fetchData = async () => {
                    if (provider && address != null) {
                        provider.evaluateExpression('gno.land/r/dev/shiken', `RenderProblems()`)
                            .then((response: any) => parseJSONResponse(response))
                            .then((response: string) => JSON.parse(response) as StructuredData)
                            .then((response: StructuredData) => { setProblems(response as StructuredData); })
                            .catch((error: any) => console.log(error));
                    };
                };
                fetchData();
            }
        }
        GetProblems()
    }, [provider, address])
    return (
        <>
            <div className="flex align-items-center justify-content-center h-4rem font-bold border-round bg-secondary">
                <h1 className="text-secondary">Problems list</h1>
            </div>
            {Object.keys(Problems).length > 0 ? Object.entries(Problems).map(([key, problem]) => {
                return <ProblemsButton path={`/chosenproblem/${key}`} header={`Problem ${key}: ${problem.Title}`} key={key} />
            }): <ProblemsButton path={"/"} header={nothing} key={0} />}
        </>
    );
};

export default Problems;
