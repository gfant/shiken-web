import SidebarView from "./Sidebar/Sidebar";
import Connect from "../services/adena/connectButton";
import { useContext } from "react";
import AccountContext from "../context/AccountContext";
import UserData from "./UserData";

interface Content {
    component: React.ComponentType;
}

const DefaultView: React.FC<Content> = ({ component: Component }) => {
    const { address } = useContext(AccountContext);

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
                    {address ? (
                        <UserData />
                    ) : (<div>
                        <Connect />
                    </div>
                    )}
                </div>
            </div >
        </>
    );
};

export default DefaultView;
