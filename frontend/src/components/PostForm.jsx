import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useAuth} from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {usePosts} from "../context/postContext"


function PostForm() {
  const { user,  } = useAuth();
  const {createPost}= usePosts();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors }
  } = useForm();

  const createnewPost = (data) => {
    const res = createPost(data);
    if (res.mensaje === 'Post creado con éxito') {
      navigate('/');
    }
  }


  return (
    <>
      <h1 className="text-center">crea tu publicacion</h1>
      <Form className="formLogin" 
      onSubmit={handleSubmit(createnewPost)}>
        <Form.Control type="hidden" value={user?(user.id):("")} readOnly {...register("autor", { required: true })}/>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titulo de la publicacion.</Form.Label>
          <Form.Control type="text" placeholder="Ingrese un titulo." {...register("title",{required:true})} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description" >
          <Form.Label>Descripcion:</Form.Label>
          <Form.Control as="textarea" rows={3} {...register("description",{ required: true })} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="imageURL">
          <Form.Label>imagen URL:</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la url de una imagen."{...register("imageURL")} />
        </Form.Group>
        <div className="d-grid gap-2 mt-5">
          <Button variant="outline-success" type="Submit" size="lg"> Crear publicacion</Button>
        </div>
      </Form>
    </>
  )
}

export default PostForm;