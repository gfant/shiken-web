import DefaultView from "../components/DefaultView";

const PageLeaderboards = () => {
    return (
        <DefaultView component={TmpLeaderboards}/>
    );
};

const TmpLeaderboards = () => {return (<h1>Leaderboards</h1>);};

export default PageLeaderboards;
