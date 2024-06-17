import DefaultView from "./DefaultView";

const MyAccount = () => {
    return (
        <DefaultView component={TmpMyAccount} />
    );
};
const TmpMyAccount = () => {return (<h1>Tmp MyAccount</h1>);};

export default MyAccount;
