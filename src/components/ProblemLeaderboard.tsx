import { useContext, useEffect, useState } from "react";
import ProviderContext from "../context/ProviderContext";
import { parseJSONResponse } from "../pieces/supportFuns";
import { useLocation } from "react-router-dom";
import { ProblemLeaderboardData, ScoreData } from "../pieces/Realm.types";

const ProblemLeaderboard = () => {
    const [problemId, setProblemId] = useState<string>("")
    const [problemLeaderBoard, setProblemLeaderBoard] = useState<ProblemLeaderboardData>({
        problem: {
            Title: "",
            Statement: "",
            Examples: [],
        },
        scores: {} as ScoreData
    }
    )
    const location = useLocation();

    const { provider } = useContext(ProviderContext);

    // Gets the problem Id
    useEffect(() => {
        if (location) {
            const getProblemId = async () => {
                const parts = location.pathname.split("/");
                const id = parts[parts.length - 1];
                setProblemId(id);
            }
            getProblemId();
        }
    }, [location])

    // Gets the problem data to show
    useEffect(() => {
        if (provider !== null) {
            const fetchData = async () => {
                provider.evaluateExpression('gno.land/r/dev/shiken', `RenderScores(${problemId})`)
                    .then((response: any) => parseJSONResponse(response))
                    .then((response: string) => JSON.parse(response) as ProblemLeaderboardData)
                    .then((response: any) => setProblemLeaderBoard(response as ProblemLeaderboardData))
                    .catch((error: any) => console.log(error));
            };
            fetchData();
        }
    }, [problemId, provider])

    return (
        <>
            <h1>{problemLeaderBoard.problem?.Title !== "" ? <>{problemLeaderBoard.problem?.Title}</> : <>Fetching data</>}</h1>
            {Object.keys(problemLeaderBoard.scores).length > 0 ? <></> : <>No one has tried this problem yet!</>}
        </>
    );
};;

export default ProblemLeaderboard;
