import DefaultView from "../components/DefaultView";

const PageHome = () => {
    return (
        <DefaultView component={TmpHome}/>
    );
};

const TmpHome = () => {return (<h1>Shiken</h1>);};

export default PageHome;
