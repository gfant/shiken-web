import { useContext, useEffect, useRef, useState } from "react";
import ProviderContext from "../context/ProviderContext";
import { parseJSONResponse } from "../pieces/supportFuns";
import { useLocation } from "react-router-dom";
import { ProblemLeaderboardData, ScoreData } from "../pieces/Realm.types";
import { Skeleton } from "primereact/skeleton";
import AddressFinder from "./LeaderboardFinder";

const ProblemLeaderboard = () => {
    const [problemId, setProblemId] = useState<string>("")
    const [callFunc, setCallFunc] = useState<boolean>(false)

    const [problemLeaderBoard, setProblemLeaderBoard] = useState<ProblemLeaderboardData>({
        problem: {
            Title: "",
            Statement: "",
            Examples: [],
        },
        scores: [] as ScoreData[],
    });

    const location = useLocation();
    const { provider } = useContext(ProviderContext);

    // Gets the problem Id
    useEffect(() => {
        if (location) {
            const getProblemId = async () => {
                const parts = location.pathname.split("/");
                const id = parts[parts.length - 1];
                setProblemId(id);
                setCallFunc(true);
            }
            getProblemId();
        }
    }, [location])

    // Gets the problem data to show
    useEffect(() => {
        if (provider !== null) {
            const fetchData = async () => {
                try {
                    const response = await provider.evaluateExpression(
                        'gno.land/r/dev/shiken',
                        `RenderScores(${problemId})`
                    );
                    const jsonResponse = await parseJSONResponse(response);
                    const leaderboardData = JSON.parse(jsonResponse) as ProblemLeaderboardData;
                    setProblemLeaderBoard(leaderboardData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [problemId, provider])

    return (
        <>
            <h1 className="pb-6">
                {callFunc && problemLeaderBoard.problem?.Title !== "" ? (
                    <>Leaderboard for {problemLeaderBoard.problem?.Title}</>
                ) : (
                    <div className="border-round-xl">
                        <Skeleton width="100rem" height="4rem" />
                    </div>
                )}
            </h1>
            {callFunc && problemLeaderBoard.scores.length !== 0 ?
                <>
                    <AddressFinder scores={problemLeaderBoard.scores![0]} />
                    <div className="flex flex-row justify-content-between w-full p-2">
                        <div className="font-bold text-lg px-4 py-2">
                            Address
                        </div>
                        <div className="font-bold text-lg px-4 py-2">
                            Score
                        </div>
                    </div>
                    {
                        problemLeaderBoard.scores.length !== 0 ? Object.entries(problemLeaderBoard.scores[0]).map(([key, score], index) => (

                            <div className={`flex flex-row justify-content-between w-full 
                            ${index % 2 === 0 ? 'bg-primary-500' : 'bg-primary-700'} 
                            text-white
                            font-bold
                            p-2`} key={key}>
                                <div className="px-4 py-2">
                                    {score.Address}
                                </div>
                                <div className="px-4 py-2">
                                    {score.Score}
                                </div>
                            </div>
                        )) : <></>
                    }
                </> : (
                    <div className="bg-black-alpha-10 border-round-xl">
                        <Skeleton width="100rem" height="18rem" />
                    </div>
                )}
        </>
    );
};

export default ProblemLeaderboard;
