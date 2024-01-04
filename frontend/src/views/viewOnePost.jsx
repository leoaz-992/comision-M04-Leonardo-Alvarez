import { useParams} from "react-router-dom"
import { Card} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { usePost } from "../context/postContext";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import ComentsCard from "../components/ComentsCard";
import { Link } from "react-router-dom";
import ModalComment from "../components/ModalComment";

function ViewOnePost() {
  const params =useParams();
  const { isAuthenticated} =useAuth();
  const {postList, getPosts, getAllComments, comments} = usePost();

  
  useEffect(()=>{
    getPosts();
    getAllComments();
  },[])

  const postId= params.id;

  const post = postList.find(p => p._id === postId);

  let datePost, title, description, autorPost;

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
        <Card.Title className='fw-bolder fs-3'>{title}</Card.Title>
        <Card.Text className='fw-lighter ps-2 mb-0'>
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
          <ModalComment title={title} postId={postId}/>
          </div>
        ):(
          <>
          para comentar
          <Link className='' to={`/login`}>inicia sesión</Link></>
        )}
      </Card.Footer>
    </Card>
      </div>
    </div>
    ):(
      <h1 className="text-center">No se encontro el post</h1>
    )}
    </>
  )
}

export default ViewOnePost