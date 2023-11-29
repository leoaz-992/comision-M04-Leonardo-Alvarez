import { Form, Col,Button } from "react-bootstrap";
const LoginForm =()=>{

  return(
    <>
    <h1 className="text-center">Inicia Sesión</h1>
    <Form className="formLogin">
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su Email." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="12">
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button type="Submit">Inicia sesión</Button>
      </div>
    </Form>
    </>
  )

}

export default LoginForm;