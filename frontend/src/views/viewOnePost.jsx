import { useParams} from "react-router-dom"
import { Card, Button,Modal,Form, Alert} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { usePost } from "../context/postContext";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useForm } from "react-hook-form";
import ComentsCard from "../components/ComentsCard";
import { Link } from "react-router-dom";

function ViewOnePost() {
  const params =useParams();
  const { user, isAuthenticated} =useAuth();
  const {postList, getPosts, getAllComments, comments,createComment} = usePost();

  const [show, setShow] = useState(false);
  const [errCreateComment,setErrCreateComment]= useState([])
  
  useEffect(()=>{
    getPosts();
    getAllComments();
  },[])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const postId= params.id;

  const post = postList.find(p => p._id === postId);

  let datePost, title, description, autorPost;

  const sendComment=async(data)=>{
    const res = await createComment(data);
    res ==="comentario creado con éxito"?setShow(false):setErrCreateComment(res)
  }
  
  const {
    register,
    handleSubmit,
  } = useForm();
  //los datos del post
  
  const commentsOfPost = comments.filter(item => item.post && item.post._id === postId);

  if (post) {
   datePost =
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
   title= post.title;
  // eslint-disable-next-line react/prop-types
   description= post.description;

  // eslint-disable-next-line react/prop-types
   autorPost= post?.autorData?.userName;
  }

  return (
    <>
    {post?(
      <div className="row pt-5 justify-content-center">
        <div className='col-8 px-3 py-2'>
    <Card>
      <Card.Header className="d-flex justify-content-between px-0 mx-0">
        <div className="ps-2"><strong>{autorPost}</strong> agregó</div>
      </Card.Header>
      <Card.Body>
        <Image className="p-2" src={post.imageURL} fluid />
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
          </div>
        ):(
          <>
          para comentar
          <Link className='' to={`/login`}>inicia sesión</Link></>
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
      </div>
        </div>
    ):(
      <h1 className="text-center">No se encontro el post</h1>
    )}
    </>
  )
}

export default ViewOnePost