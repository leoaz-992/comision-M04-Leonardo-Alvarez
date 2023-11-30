import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {useAuth} from "../context/authContext";
import { Link } from 'react-router-dom';

function NavbarComponent() {
  const { isAuthenticated, logout,} = useAuth();
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">Proyecto integrador</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="justify-content-end" id="navbarScroll">
          <Nav
            className="ml-auto my-2 my-lg-0 mx-2"
            navbarScroll
          >
            <Nav.Link href="/">Inicio</Nav.Link>
            {isAuthenticated ? (
              <>
              <Nav.Link href="/perfil">perfil</Nav.Link>
              <a className='btn btn-outline-success' href='/crear-post'>crear publicacion</a>
               <Button className='ms-2 me-3' variant="outline-danger" size='sm'
               onClick={() => logout()}>Cerrar sesion</Button>
                
               </>

            ):(<>
              <Nav.Link href="/login">Iniciar sesion</Nav.Link>
            <Nav.Link href="/registrarse">Registrarse</Nav.Link></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
