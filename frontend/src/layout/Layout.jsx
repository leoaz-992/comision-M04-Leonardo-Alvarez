import { Container } from 'react-bootstrap';

import NavbarComponent from '../components/Navbar';

const LayoutComponent = (props) => {
    const children = props.children;

    return (
        <>
            <NavbarComponent />
            
            <Container>
                    { children }
            </Container>
        </>
    );
}

export default LayoutComponent;
