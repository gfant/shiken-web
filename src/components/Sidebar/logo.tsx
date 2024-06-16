import { Link } from 'react-router-dom';
import myLogo from '../../public/image.svg'


export const LogoView = () => {
    return (
        <Link to="/">
            <img src={myLogo} alt="Shiken" style={{ display: "block", margin: "auto", height: 100, width: 159 }} />
        </Link>
    );
};

export default LogoView;