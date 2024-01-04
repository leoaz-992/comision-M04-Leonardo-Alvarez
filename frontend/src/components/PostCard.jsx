import { Card} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import{ useAuth } from '../context/authContext';
import { usePost } from'../context/postContext';
import ComentsCard from './ComentsCard';
import ModalComment from './ModalComment';

// eslint-disable-next-line react/prop-types
function Post({post}) {
  const {isAuthenticated} =useAuth();
  const {comments} =usePost();
  


  
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
  const imagePost = post?.imageURL

  // eslint-disable-next-line react/prop-types
  const autorPost= post?.autorData?.userName;

  return (
    <>
    <Card className='postCard'>
      <Card.Header className="d-flex justify-content-between px-0 mx-0">
        <div className="ps-2"><strong>{autorPost}</strong> agregó</div>
      </Card.Header>
      <Card.Body>
        <Card.Title className='titlePost'>{title}</Card.Title>
        <Card.Text className='fw-lighter ps-2 mb-0'>
          
        {description}
        </Card.Text>
        <Image className="p-2" src={imagePost} fluid />
        <ComentsCard content={commentsOfPost}/> 
      </Card.Body>
      <Card.Footer className="text-muted align-items-center d-flex justify-content-between">
        <div className=''>
          {datePost}
        </div>
      {isAuthenticated?(
          <div className='d-grid gap-2'>
          <ModalComment title={title} postId={postId}/>
          <Link className='mx-1 btn btn-secondary btn-sm' to={`post/${postId}`}>ver el post Completo</Link>
          </div>
        ):(
          
          <Link className='mx-1 btn btn-secondary btn-sm' to={`/post/${postId}`}>ver el post Completo</Link>
        )}
      </Card.Footer>
    </Card>
    </>
  )
}

export default Post