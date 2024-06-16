import { useState } from 'react';

import { Sidebar } from 'primereact/sidebar';
import 'primeicons/primeicons.css';

import LogoView from './logo';
import SidebarButton from './SidebarButton';


export const SidebarView = () => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <div className="card flex justify-content-center">
                <Sidebar visible={visible} onHide={() => setVisible(false)} >
                    <LogoView />
                    <SidebarButton path="/" header="Home" icon="pi pi-home" />
                    <SidebarButton path="/problems" header="Problems" icon="pi pi-list-check" />
                    <SidebarButton path="/leaderboard" header="Leaderboard" icon="pi pi-flag-fill" />
                    <SidebarButton path="/myAccount" header="My account" icon="pi pi-user" />
                    <SidebarButton path="https://github.com/iam-agf/shiken-project.git" header="Github" icon="pi pi-github" />
                </Sidebar >

                { /* Button */}
                <div className="col-offset-1 col-10" onClick={() => setVisible(true)}>
                    <SidebarButton path="" header="Menu" icon="pi pi-align-justify" />
                </div>
            </div >
        </>
    );
};

export default SidebarView;