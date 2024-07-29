import { InputText } from "primereact/inputtext";
import { ScoreData } from "../pieces/Realm.types";
import { useState } from "react";
import { Button } from "primereact/button";

interface AddressFinderProps {
    scores: ScoreData;
}

const AddressFinder = (scores: AddressFinderProps) => {
    const [searchAddress, setSearchAddress] = useState<string>("")
    const [click, setClick] = useState(false)

    function request() {
        setClick(true)
    }

    return (
        <div className="border-2 border-primary-500 w-full h-6rem m-2 px-6 surface-overlay font-bold flex align-items-center">
            <div className="grid">
                <div className="col-12 flex flex-row align-items-center">
                    <div>
                        Search an address
                    </div>
                    <div className="px-6">
                        <InputText className="px-12" value={searchAddress} onChange={(e) => {
                            console.log(scores.scores[searchAddress]);
                            setSearchAddress(e.target.value);
                            setClick(false);
                        }} />
                    </div>
                    <div>
                        <Button label="Submit" onClick={request}/>
                    </div>
                </div>
                <div>
                    {click ? (
                        searchAddress == "" ?
                            <>{click}</>
                            : (
                                scores.scores[searchAddress] !== undefined ?
                                    <>{scores.scores[searchAddress].Score}</>
                                    :
                                    <>No attempt for this problem with the given address</>
                            )
                    )
                        :
                        <>{click}</>
                    }
                </div>
            </div>
        </div >
    );
};

export default AddressFinder;
