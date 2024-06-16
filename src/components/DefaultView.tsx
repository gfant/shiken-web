import SidebarView from "./Sidebar/Sidebar";
import Connect from "../services/adena/connectButton";
import 'rsuite/FlexboxGrid/styles/index.css';

interface Content {
    component: React.ComponentType;
}

const DefaultView: React.FC<Content> = ({ component: Component }) => {
    return (
        <>
            <div className="grid bg-secondary-600">
                <div className="col-1">
                    <SidebarView />
                </div>
                <div className="col-8">
                    <Component />
                </div>
                <div className="col-3">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Connect />
                    </div>
                </div>
            </div >
        </>
    );
};

export default DefaultView;
