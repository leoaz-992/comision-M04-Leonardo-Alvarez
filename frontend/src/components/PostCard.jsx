import { Card, Button,Modal,Form, Alert} from 'react-bootstrap';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import{createComment } from "../api/coment"
import{ useAuth } from '../context/authContext';
import ComentsCard from './ComentsCard';


// eslint-disable-next-line react/prop-types
function Post({post}) {
  const [show, setShow] = useState(false);
  const [errComment,setErrComment]= useState([])
  const { user, isAuthenticated} =useAuth();
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
  // eslint-disable-next-line react/prop-types
  
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

  const autorPost= post.autorData.userName;

  return (
    <div className='col-lg-6 px-3 py-2'>
    <Card>
      <Card.Header className="d-flex justify-content-between px-0 mx-0">
        <div className="ps-2"><strong>{autorPost}</strong> agregó</div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
        {description}
        </Card.Text>
        
        <ComentsCard postId={postId}/>

      </Card.Body>
      <Card.Footer className="text-muted align-items-center d-flex justify-content-between">
        <div className=''>
          {datePost}
        </div>
      {isAuthenticated?(
          <div>
          <Button variant="primary"onClick={handleShow}>Comentar</Button>
          <Link className='mx-1 btn btn-secondary tbn-sm' to={`post/${postId}`}>ver el post Completo</Link>
          </div>
        ):(
          
          <Link className='mx-1 btn btn-secondary tbn-sm' to={`post/${postId}`}>ver el post Completo</Link>
        )}
      </Card.Footer>
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