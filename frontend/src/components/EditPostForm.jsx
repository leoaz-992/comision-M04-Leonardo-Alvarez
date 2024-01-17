import { Form, Button, Alert } from "react-bootstrap";
import Image from 'react-bootstrap/Image';


import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import {useAuth} from "../context/authContext";
import { usePost } from "../context/postContext";
import {Message} from "./Message";
import ButtonClose from "./buttonClose";


// eslint-disable-next-line react/prop-types
function EditPostForm({idPost}) {
  
  const REDIRECT_TO ="/perfil";

  const { user } = useAuth();
  const {post,getOnePost, errorPost, updatePost} = usePost();
  const navigate = useNavigate();
  const [message,setMessage]=useState("")
  const [show, setShow] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
        await getOnePost(idPost);
    };

    fetchPost();
}, [idPost]);

useEffect(() => {
    
    if (post) {
        setValue('title', post.title);
        setValue('description', post.description);
        setValue('imageURL', post.imageURL);
    }
}, [post]);

  // eslint-disable-next-line no-unused-vars
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },  
  } = useForm();


  const submitPost = async (data) => {
    if(post.autorName._id!== user.id){
      setMessage("No puedes modificar este post.")
      return
    }
    try {
      const res = await updatePost({
        ...data,
        id: idPost,
        autor:post.autorName._id
      });
      setMessage(""); 
      setMessage(res?.data.mensaje);
      setTimeout(() => {
        navigate(REDIRECT_TO); // Navega a la página de inicio
      }, 600);
    } catch (error) {
      console.log(error)
      setMessage(error.mensaje)
    }
  };
  


  return (
    <>
      {errorPost.length!=0?(<Message message={errorPost[0]}/>):("")}
      {message?(<Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{message}</Alert.Heading>
  
      </Alert>):("")}
      
      <Form className="formLogin" 
      onSubmit={handleSubmit(submitPost)}>
        <div className="row justify-content-end pe-2">
            <ButtonClose textOverlay="Cerrar" redirectTo={REDIRECT_TO}/>
        </div>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titulo de la publicacion.</Form.Label>
          <Form.Control type="text" placeholder="Ingrese un titulo." {...register("title",{required:true})} />
          {errors.title && (
          <p className="text-danger">Ingrese un titulo.</p>
        )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="description" >
          <Form.Label>Descripcion:</Form.Label>
          <Form.Control as="textarea" rows={3} {...register("description",{ required: true })} />
          {errors.description && (
          <p className="text-danger">Ingrese una descripcion.</p>
        )}
        </Form.Group>
          {post?(
          <div>
            <h6 className="form-label">Imagen de la publicacion</h6>
            <Image className="p-2" src={post?.imageURL} fluid thumbnail />
          </div>
          ):("")}
        <Form.Group className="mb-3" controlId="imageURL">
          <Form.Label>URL de la imagen:</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la url de una imagen." {...register("imageURL")} />
          {errors.description && (
          <p className="text-danger">Ingrese una imagen</p>
        )}
        </Form.Group>
        <div className="d-grid gap-2 mt-5">
          <Button variant="outline-success" type="Submit" size="lg"> Editar publicacion</Button>
        </div>
      </Form>
    </>
  )
}

export default EditPostForm