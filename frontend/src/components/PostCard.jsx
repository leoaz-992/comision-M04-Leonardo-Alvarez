import { Card, Button,Modal,Form, Alert } from 'react-bootstrap';
import {useAuth} from "../context/authContext";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import{createComment } from "../api/coment"
// eslint-disable-next-line react/prop-types
function Post({post}) {
  const { isAuthenticated, user } = useAuth();
  const [show, setShow] = useState(false);
  const [errComment,setErrComment]= useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
  const sendComment=async(data)=>{
      const res = await createComment(data);
      res ==="comentario creado con éxito"?setShow(false):setErrComment(res)
  }

  const {
    register,
    handleSubmit,
  } = useForm();
  //los datos del post
  // eslint-disable-next-line react/prop-types
  const postId = post._id;

  
  const datePost =
    // eslint-disable-next-line react/prop-types
    new Date(post.createdAt).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12:"",
      hour:"numeric",
      minute:"numeric"
    })
  // eslint-disable-next-line react/prop-types
  const title= post.title;
  // eslint-disable-next-line react/prop-types
  const description= post.description;

  return (
    <div className='col-lg-5 mx-3'>
    <Card>
      <Card.Header className="text-center">publicacion</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
        {description}
        </Card.Text>
        {isAuthenticated?(
          <>
          <Button variant="primary"onClick={handleShow}>Comentar</Button>
          <Link className='mx-1 btn btn-secondary tbn-sm' to={`post/${postId}`}>ver el post Completo</Link></>
        ):(
          <Link className='mx-1 btn btn-secondary tbn-sm' to={`post/${postId}`}>ver el post Completo</Link>
        )}
      </Card.Body>
      <Card.Footer className="text-muted">{datePost}</Card.Footer>
    </Card>
          {//modal para crear un comentario
          }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comentar: <strong>{title}</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errComment?(
          <>
          {errComment.map((err,i)=>(
            <Alert key={i} variant="danger">{err}</Alert>
          ))}
          </>):("")}
          <Form >
          <Form.Control type="hidden" value={isAuthenticated?(user.id):(null)} readOnly {...register("autor", { required: true })}/>
          <Form.Control type="hidden" value={postId} readOnly {...register("post", { required: true })}/>
            <Form.Group className="mb-3" controlId="comment">
              <Form.Label>Tu comentario:</Form.Label>
              <Form.Control as="textarea" rows={3} {...register("comment", { required: true })}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit(sendComment)}>
            Comentar
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  )
}

export default Post