import { Link } from 'react-router-dom';
import { Col, Grid, IconButton, Row } from 'rsuite';
import DocPassIcon from '@rsuite/icons/DocPass';


export const Sidebar = () => {
    return (
        <Grid>
            <Col >
                <Row>
                    <Link to="/problems">
                        <IconButton icon={<DocPassIcon />}>Problems</IconButton>
                    </Link>
                </Row>
                <Row>
                    <Link to="/">
                        <IconButton icon={<DocPassIcon />}>Home</IconButton>
                    </Link>
                </Row>
            </Col>
        </Grid>
    );
};

export default Sidebar;