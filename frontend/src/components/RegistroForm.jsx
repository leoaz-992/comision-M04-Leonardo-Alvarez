import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Form, Col,Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {Message} from './Message';

const RegistroForm =()=>{
  const { signup,errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);


  return(
    <>
    <h1 className="text-center">Registrarse</h1>
    {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
    <Form onSubmit={handleSubmit(onSubmit)} className="formLogin">
      <Form.Group className="mb-3" controlId="fistname">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su nombre." {...register("firstname",{required:true})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastname">
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su apellido." {...register("lastname",{required:true})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Nombre de usuario</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su nombre de usuario." {...register("username",{required:true})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su Email." {...register("email",{required:true})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="12">
          <Form.Control type="password" placeholder="Password" {...register("password",{required:true})}/>
        </Col>
      </Form.Group>
      <Form.Group className="mb-3" controlId="avatarURL">
        <Form.Label>avatar URL</Form.Label>
        <Form.Control type="text" placeholder="Ingrese la url de una imagen." {...register("avatarURL")} />
      </Form.Group>
      <div className="d-grid gap-2 mt-5">
        <Button type="Submit" variant="outline-success" size="lg">Registrarse</Button>
      </div>
    </Form>
    </>
  )

}

export default RegistroForm;