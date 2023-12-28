import { Card, Button,Modal,Form, Alert} from 'react-bootstrap';
import { useState} from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import{ useAuth } from '../context/authContext';
import { usePost } from'../context/postContext'
import ComentsCard from './ComentsCard';

// eslint-disable-next-line react/prop-types
function Post({post}) {
  const [show, setShow] = useState(false);
  const [errCreateComment,setErrCreateComment]= useState([])
  const { user, isAuthenticated} =useAuth();
  const {comments,createComment,getAllComments} =usePost();
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  
  const sendComment=async(data)=>{
    const res = await createComment(data);
    res ==="comentario creado con éxito"?setShow(false):setErrCreateComment(res)
    getAllComments()
  }
  
  const {
    register,
    handleSubmit,
  } = useForm();
  //los datos del post
  // eslint-disable-next-line react/prop-types
  const postId = post._id;
  // eslint-disable-next-line react/prop-types
  
  const commentsOfPost = comments.filter(item => item?.post?._id === postId);

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

  // eslint-disable-next-line react/prop-types
  const autorPost= post?.autorData?.userName;

  return (
    <>
    <Card>
      <Card.Header className="d-flex justify-content-between px-0 mx-0">
        <div className="ps-2"><strong>{autorPost}</strong> agregó</div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
        {description}
        </Card.Text>
        <ComentsCard content={commentsOfPost}/> 
      </Card.Body>
      <Card.Footer className="text-muted align-items-center d-flex justify-content-between">
        <div className=''>
          {datePost}
        </div>
      {isAuthenticated?(
          <div className='d-grid gap-2'>
          <Button className='mx-1' variant="primary"  size="sm" onClick={handleShow}>Comentar</Button>
          <Link className='mx-1 btn btn-secondary btn-sm' to={`post/${postId}`}>ver el post Completo</Link>
          </div>
        ):(
          
          <Link className='mx-1 btn btn-secondary btn-sm' to={`/post/${postId}`}>ver el post Completo</Link>
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
          {errCreateComment?(
          <>
          {errCreateComment.map((err,i)=>(
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
      </>
  )
}

export default Post