import { useContext, useEffect, useState } from "react";
import ProviderContext from "../context/ProviderContext";
import { parseJSONResponse } from "../pieces/supportFuns";
import { StructuredData } from "../pieces/Realm.types";
import ProblemsButton from "./Problems/ProblemButton";

const Leaderboards = () => {
    const nothing = "No available problems yet";

    const { provider } = useContext(ProviderContext);
    const [Problems, setProblems] = useState<StructuredData>({})

    useEffect(() => {
        // Calls contract to get Problems data
        const fetchData = async () => {
            if (provider !== null) {
                provider.evaluateExpression('gno.land/r/dev/shiken', `RenderProblems()`)
                    .then((response: any) => parseJSONResponse(response))
                    .then((response: string) => JSON.parse(response) as StructuredData)
                    .then((response: StructuredData) => { setProblems(response as StructuredData); })
                    .catch((error: any) => console.log(error));
            };
        };
        fetchData();
    }, [provider])
    return (
        <div>
            <div className="flex align-items-center justify-content-center h-4rem font-bold border-round bg-secondary">
                <h1 className="text-secondary">Leaderboards</h1>
            </div >
            {
                Object.keys(Problems).length > 0 ? Object.entries(Problems).map(([key, problem]) => {
                    return <ProblemsButton path={`/leaderboard/${key}`} header={`Problem ${key}: ${problem.Title}`} key={key} />
                }) : <ProblemsButton path={"/"} header={nothing} key={0} />
            }
        </div >
    );
};

export default Leaderboards;
