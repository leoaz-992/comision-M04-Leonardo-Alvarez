import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Form, Col,Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Message} from "./Message";
const LoginForm =()=>{
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const { signin, errors, isAuthenticated } = useAuth();
  const [loginError, setLoginError] =useState([]);
  const navigate = useNavigate();

  const onSubmit = (data) =>{
    signin(data);
  }
    

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(()=>{
    setLoginError(errors)
    
  },[errors])


  return(
    <>
    <h1 className="text-center">Inicia Sesión</h1>
    {loginError.length>0 ? (
      <Message message={loginError} />
    ):("")}
    <Form className="formLogin"  onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su Email."
        {...register("email", { required: {value:true,message:"El email es obligatorio." },
        pattern: {
          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          message: "Correo no válido",
        },
        })}/>
        {formErrors.email&& (<span className="errorFormInvalid">{formErrors.email.message}</span>)}
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="12">
          <Form.Control type="password" placeholder="Password" 
          {...register("password", { required: {value:true, message:"La contraseña es requerida"}, minLength: {value:6,
          message:"la contraseña debe tener al menos 6 caracteres"} })}/>
           {formErrors.password && <span className="errorFormInvalid">{formErrors.password.message}</span>}
        </Col>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button type="Submit">Inicia sesión</Button>
      </div>
    </Form>
    <p className="flex gap-x-2 text-center mt-2">
          No tienes un usuario? <Link to="/registrarse" className="text-decoration-none linkText">Registrate</Link>
        </p>
    </>
  )

}

export default LoginForm;