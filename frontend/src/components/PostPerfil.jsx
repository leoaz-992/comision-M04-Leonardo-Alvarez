import { Card, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import ComentsCard from './ComentsCard';
import { Link } from "react-router-dom";
import { usePost } from'../context/postContext'

// eslint-disable-next-line react/prop-types
function PostPerfil({post , deletePostid}) {
  const { comments} =usePost();

  //los datos del post
  // eslint-disable-next-line react/prop-types
  const postId = post._id;
  // eslint-disable-next-line react/prop-types
  const commentsOfPost = comments.filter(item => item.post && item.post._id === postId);

  const deletePost=()=>{
    deletePostid(postId)
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
  //const autorPost= post?.autorData?.userName;

  // eslint-disable-next-line react/prop-types
  const imagePost = post?.imageURL

  return (
    
    <Card className='my-2 postCard'>
      <Card.Body>
        <Card.Title className='fw-bolder fs-3'>{title}</Card.Title>
        <Image className="p-2" src={imagePost} fluid />
        <Card.Text className='fw-lighter ps-2 postText'>
        {description}
        </Card.Text>
        <ComentsCard content={commentsOfPost}/> 
      </Card.Body>
      <Card.Footer className="text-muted align-items-center d-flex justify-content-between">
        <div className='postText'>
          {datePost}
        </div>
        <div className='d-grid gap-2'>
          <Link className='mx-1 btn btn-info btn-sm' to={`/editar-post/${postId}`}>Editar</Link>
          <Button className='mx-1' variant="danger"  size="sm" onClick={deletePost}>Borrar</Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default PostPerfil