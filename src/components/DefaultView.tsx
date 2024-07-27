import SidebarView from "./Sidebar/Sidebar";
import Connect from "../services/adena/connectButton";
import { useContext, useEffect } from "react";
import AccountContext from "../context/AccountContext";

interface Content {
    component: React.ComponentType;
}

const DefaultView: React.FC<Content> = ({ component: Component }) => {
    const { address } = useContext(AccountContext);

    useEffect(() => {
        console.log(address)
    }, [])
    return (
        <>
            <div className="grid bg-secondary-600">
                <div className="col-2">
                    <SidebarView />
                </div>
                <div className="col-8">
                    <Component />
                </div>
                <div className="col-2">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {address ? (
                            <div>Current Address: {address}</div>
                        ) : (<div>
                            <Connect/>
                        </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
};

export default DefaultView;
