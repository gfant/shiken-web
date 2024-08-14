import { InputText } from "primereact/inputtext";
import { ScoreUser } from "../pieces/Realm.types";
import { useState } from "react";
import { Button } from "primereact/button";

interface AddressFinderProps {
    scores: ScoreUser[];
}

const AddressFinder = (props: AddressFinderProps) => {
    const [searchAddress, setSearchAddress] = useState<string>("");
    const [click, setClick] = useState(false);
    const [result, setResult] = useState<JSX.Element | null>(null);

    function handleButtonClick() {
        setClick(true);
        const scoresArr = props.scores;
        for (let i = 0; i < scoresArr.length; i++) {
            if (scoresArr[i].Address === searchAddress) {
                setResult(
                    <div className="grid">
                        <div className="col-12 flex flex-column">
                            <div className="flex align-items-center m-1 mx-4">Address: {scoresArr[i].Address}</div>
                            <div className="flex align-items-center m-1 mx-4">Score: {scoresArr[i].Score}</div>
                        </div>
                    </div>
                );
                return;
            }
        }
        setResult(<div className="flex align-items-center m-1 mx-4">No attempt for this problem with the given address</div>);
    }

    return (
        <div className="border-2 border-primary-500 w-full h-6rem m-2 px-8 surface-overlay font-bold flex align-items-center justify-content-between">
            <div className="grid grid-cols-3">
                <div className="col-span-1 flex flex-row align-items-center">
                    <div>
                        Search an address
                    </div>
                    <div className="px-6">
                        <InputText className="px-12" value={searchAddress} onChange={(e) => {
                            setSearchAddress(e.target.value);
                            setClick(false);
                        }} />
                    </div>
                    <div>
                        <Button label="Submit" onClick={handleButtonClick} />
                    </div>
                </div>
                <div className="col-span-1">
                    {click ? result : null}
                </div>
            </div>
        </div>
    );
};

export default AddressFinder;
