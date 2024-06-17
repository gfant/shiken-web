import DefaultView from "../components/DefaultView";

const PageMyAccount = () => {
    return (
        <DefaultView component={TmpMyAccount}/>
    );
};

const TmpMyAccount = () => {return (<h1>My Account</h1>);};

export default PageMyAccount;
