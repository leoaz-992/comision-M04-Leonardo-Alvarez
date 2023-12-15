import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Form, Col,Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Message} from "./Message";
const LoginForm =()=>{
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) =>{
    signin(data);
  }
    

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);


  return(
    <>
    <h1 className="text-center">Inicia Sesión</h1>
    {loginErrors.map((error, i) => (
      <Message message={error} key={i} />
    ))}
    <Form className="formLogin"  onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su Email."
        {...register("email", { required: true })}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="12">
          <Form.Control type="password" placeholder="Password" 
          {...register("password", { required: true, minLength: 6 })}/>
        </Col>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button type="Submit">Inicia sesión</Button>
      </div>
    </Form>
    <p className="flex gap-x-2 text-center mt-2">
          No tienes un usuario? <Link to="/registrarse" className="text-decoration-none">Registrate</Link>
        </p>
    </>
  )

}

export default LoginForm;