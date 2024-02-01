import { useEffect, useRef } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {Message} from './Message';
import { Link } from "react-router-dom";

const RegistroForm =()=>{
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await signup(data);
  };

  useEffect(() => {
    if (isAuthenticated){ 
      
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const password = useRef(null);
  password.current = watch("password", "");


  return(
    <>
    <h1 className="text-center">Registrarse</h1>
    {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
    <Form onSubmit={handleSubmit(onSubmit)} className="formLogin">
      <Form.Group className="mb-3" controlId="fistname">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su nombre." {...register("firstname",{required:{
          value:true,
          message:"El nombre es requerido."
        },
        maxLength: {value:20,
        message:"El nombre no debe ser mayor a 20 caracteres"},
        minLength: {value:2,
        message:"Ingrese un nombre valido."}})} />
        {errors.firstname && <span className="errorFormInvalid">{errors.firstname.message}</span>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastname">
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su apellido." {...register("lastname",{required:{
          value:true,
          message:"El apellido es requerido."
        },
        maxLength: {value:20,
        message:"El apellido no debe ser mayor a 20 caracteres"},
        minLength: {value:2,
        message:"Ingrese un apellido valido."}})} />
        {errors.lastname && <span className="errorFormInvalid">{errors.lastname.message}</span>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Nombre de usuario</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su nombre de usuario." {...register("username",{required:{
          value:true,
          message:"El nombre de usuario es requerido."
        },
        maxLength: {value:30,
        message:"El nombre de usuario no debe ser mayor a 30 caracteres"},
        minLength: {value:2,
        message:"Ingrese un nombre de usuario valido."}})} />
        {errors.username && <span className="errorFormInvalid">{errors.username.message}</span>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su Email." {...register("email",{required:{
          value:true,
          message:"El correo es obligatorio."},
         pattern: {
          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          message: "Correo no válido",
        },})}/>
         {errors.email && <span className="errorFormInvalid">{errors.email.message}</span>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label column sm="2">
          Contraseña
        </Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password",{ required: {
              value: true,
              message: "Contraseña es requerida",
            },
            minLength: {
              value: 6,
              message: "Contraseña debe ser mayor a 6 caracteres",
            },
          })}/>
        {errors.password && <span className="errorFormInvalid">{errors.password.message}</span>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label >
          Confirmar Contraseña
        </Form.Label>
          <Form.Control type="password" placeholder="Repetir Contraseña" {...register("confirmPassword", {
            required: {
              value: true,
              message: "Es requerida la confirmación de la contraseña",
            },
            minLength: {
              value: 6,
              message: "La contraseña debe ser mayor a 6 caracteres",
            },
            validate: (value) =>
              value === password.current || "Las contraseñas no coinciden",
          })}/>
        {errors.confirmPassword && (
          <span className="errorFormInvalid">{errors.confirmPassword.message}</span>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="avatarURL">
        <Form.Label>avatar URL</Form.Label>
        <Form.Control type="text" placeholder="Ingrese la url de una imagen." {...register("avatarURL")} />
      </Form.Group>
      <div className="d-grid gap-2 mt-5">
        <Button type="Submit" variant="outline-success" size="lg">Registrarse</Button>
      </div>
    </Form>
    <p className="flex gap-x-2 text-center mt-2">
          Ya tienes un usuario? <Link to="/login" className="text-decoration-none linkText">Inicia sesión</Link>
        </p>
    </>
  )

}

export default RegistroForm;