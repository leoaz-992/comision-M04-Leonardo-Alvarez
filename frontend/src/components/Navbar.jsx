import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {useAuth} from "../context/authContext";
import { Link } from 'react-router-dom';

function NavbarComponent() {
  const { isAuthenticated, user, logout} = useAuth();
  
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand className='textTitle' href="/">mis viajes App</Navbar.Brand>
        {isAuthenticated?(
        <strong className='text-secondary ms-2'>Bienvenido {user.username}</strong>
      ):("")}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="justify-content-end" id="navbarScroll">
          <Nav
            className="ml-auto my-2 my-lg-0 mx-2"
            navbarScroll
          >
            <Nav.Link href="/">Inicio</Nav.Link>
            {isAuthenticated ? (
              <>
              <Nav.Link to="/perfil">perfil</Nav.Link>
              <Link className='btn btn-outline-success m-1' href='/crear-post'>crear publicacion</Link>
               <Button className='m-1' variant="outline-danger" size='sm'
               onClick={() => logout()}>Cerrar sesion</Button>
                
               </>

            ):(<>
              <Nav.Link as={Link} to="/login">Iniciar sesion</Nav.Link>
            <Nav.Link as={Link} to="/registrarse">Registrarse</Nav.Link></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
