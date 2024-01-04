import {Button,Modal,Form, Alert} from 'react-bootstrap';
import { useState} from 'react';
import{ useAuth } from '../context/authContext';
import { useForm } from "react-hook-form";
import { usePost } from'../context/postContext';


// eslint-disable-next-line react/prop-types
function ModalComment({title, postId}) {
  const [show, setShow] = useState(false);
  const [errCreateComment,setErrCreateComment]= useState([])
  const { user, isAuthenticated} =useAuth();
  const {createComment,getAllComments} =usePost();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
  } = useForm();

  const sendComment=async(data)=>{
    const res = await createComment(data);
    res ==="comentario creado con éxito"?setShow(false):setErrCreateComment(res)
    getAllComments()
  }

  return (
    <>
    <Button className='mx-1' variant="primary"  size="sm" onClick={handleShow}>Comentar</Button>
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

export default ModalComment