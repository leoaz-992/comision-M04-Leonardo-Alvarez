import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useAuth} from "../context/authContext";
import { usePost } from "../context/postContext";
import {Message} from "./Message";


// eslint-disable-next-line react/prop-types
function PostForm() {
  const { user,isAuthenticated } = useAuth();
  const {createPost, errorPost} = usePost();

  const navigate = useNavigate();

  if(!isAuthenticated){
    navigate("/");
  }
  
  // eslint-disable-next-line no-unused-vars
  const {
    register,
    handleSubmit,
    formState: { errors },  
  } = useForm();

  const submitPost = async (data) => {
    try {
      const res = await createPost({...data,
      autor:user.id});
      
      /* if (params.id) {
        updatePost(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createPost({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } */

      
    } catch (error) {
      console.log(error);
    
    }
  };

  return (
    <>
      {errorPost.length!=0?(<Message message={errorPost[0]}/>):("")}
      <Form className="formLogin" 
      onSubmit={handleSubmit(submitPost)}>
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
        <Form.Group className="mb-3" controlId="imageURL">
          <Form.Label>imagen URL:</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la url de una imagen." {...register("imageURL")} />
          {errors.description && (
          <p className="text-danger">Ingrese una imagen</p>
        )}
        </Form.Group>
        <div className="d-grid gap-2 mt-5">
          <Button variant="outline-success" type="Submit" size="lg"> Crear publicacion</Button>
        </div>
      </Form>
    </>
  )
}

export default PostForm;