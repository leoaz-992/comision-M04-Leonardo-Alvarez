import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {useAuth} from "../context/authContext";

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
              <Nav.Link href="/perfil">perfil</Nav.Link>
              <a className='btn btn-outline-success m-1' href='/crear-post'>crear publicacion</a>
               <Button className='m-1' variant="outline-danger" size='sm'
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
