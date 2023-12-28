import { Card, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import ComentsCard from './ComentsCard';
import { Link } from "react-router-dom";
import { usePost } from'../context/postContext'

function PostPerfil({post}) {
  const { comments, deletePost } =usePost();

  //los datos del post
  // eslint-disable-next-line react/prop-types
  const postId = post._id;
  // eslint-disable-next-line react/prop-types
  const commentsOfPost = comments.filter(item => item.post && item.post._id === postId);


  const deletePostid =()=>{
    console.log(typeof(postId))
    deletePost(postId)
  }

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
    
    <Card className='my-2'>
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
      
          <div className='d-grid gap-2'>
          <Link className='mx-1 btn btn-info btn-sm' to={`/editar-post/${postId}`}>Editar</Link>
          <Button className='mx-1' variant="danger"  size="sm" onClick={deletePostid}>Borrar</Button>
          </div>
        
      </Card.Footer>
    </Card>
  )
}

export default PostPerfil