import DefaultView from "./DefaultView";

const Leaderboards = () => {
    return (
        <DefaultView component={TmpLeaderboards} />
    );
};
const TmpLeaderboards = () => {return (<h1>Tmp Leaderboards</h1>);};

export default Leaderboards;
