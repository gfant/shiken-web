import { useEffect, useState } from "react";
import Config from './../config';
import axios from "axios";
import { Row } from "rsuite";
import ProblemsButton from "./Problems/ProblemButton";

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

            <div className="flex align-items-center justify-content-center h-4rem font-bold border-round bg-secondary">
                <h1 className="text-secondary">Problems list</h1>
            </div>
            {data.map((val, idx) => {
                return <ProblemsButton path={`/chosenproblem/${idx + 1}`} header={val} key={idx} />
            })}
        </>
    );
};

export default Problems;
