import { useContext, useEffect, useState } from "react";
import AccountContext from "../../context/AccountContext";
import { Chart } from 'primereact/chart';
import { Knob } from "primereact/knob";

const ProblemsSolved = () => {
    const account = useContext(AccountContext);
    const [Problems, setProblems] = useState(3)
    const [ProblemsSolved, setProblemsSolved] = useState(2)
    const [Percentage, setPercentage] = useState(0)

    useEffect(() => {
        console.log({ Problems, ProblemsSolved })
        const percentage = Math.round(100 * ProblemsSolved / Problems);
        setPercentage(percentage)
    }, [account])

    return (
        <div className="col-4 border-1 border-round-md border-white">
            <div className="flex justify-content-around">
                <div className="text-2xl pb-4">Problems</div>
            </div>
            <div className="flex flex-row justify-content-around">
                <div className="col-5 flex justify-content-around">
                    <Knob value={Percentage} max={100} valueTemplate={"{value}%"} readOnly />
                </div>
                <div className="col-5">
                    You have solved {ProblemsSolved} of the {Problems} problems available.
                </div>
            </div>
        </div>
    );
};

export default ProblemsSolved;