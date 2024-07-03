import { useContext, useEffect, useRef, useState } from "react";
import ProviderContext from "../context/ProviderContext";
import { parseJSONResponse } from "../pieces/supportFuns";
import { useLocation } from "react-router-dom";
import { ProblemLeaderboardData, ScoreData } from "../pieces/Realm.types";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { TreeNode } from "primereact/treenode";

const ProblemLeaderboard = () => {
    const [problemId, setProblemId] = useState<string>("")
    const [nodes, setNodes] = useState<TreeNode[]>([]);

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
                try {
                    const response = await provider.evaluateExpression(
                        'gno.land/r/dev/shiken',
                        `RenderScores(${problemId})`
                    );
                    const jsonResponse = await parseJSONResponse(response);
                    const leaderboardData = JSON.parse(jsonResponse) as ProblemLeaderboardData;
                    setProblemLeaderBoard(leaderboardData);

                    // Actualizar nodes basado en scores
                    const newNodes: TreeNode[] = Object.entries(leaderboardData.scores).map(
                        ([addressApplicant, score]) => {
                            let scoring: ScoreData = typeof score === "object" && score !== null ? score : {};
                            return { data: { Address: addressApplicant, Score: scoring.Score } };
                        }
                    );
                    setNodes(newNodes);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [problemId, provider])

    return (
        <>
            <h1>{problemLeaderBoard.problem?.Title !== "" ? <>{problemLeaderBoard.problem?.Title}</> : <>Fetching data</>}</h1>
            {Object.keys(problemLeaderBoard.scores).length > 0 ?
                (nodes.length > 0 ? <TreeTable value={nodes} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="Address" header="Address" filter filterPlaceholder="Filter by Address"></Column>
                    <Column field="Score" header="Score" filter filterPlaceholder="Filter by Score"></Column>
                </TreeTable> : <></>) : <>No one has tried this problem yet!</>
            }
        </>
    );
};;

export default ProblemLeaderboard;
