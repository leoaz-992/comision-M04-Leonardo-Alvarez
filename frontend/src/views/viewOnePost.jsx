import { useParams} from "react-router-dom"
import{getPostRequest} from "../api/post"
import { useEffect, useState } from "react";
import Post from "../components/PostCard";

function ViewOnePost() {
  const params =useParams();
  const [post,setPost]= useState(null);
  const id= params.id;

  
  /* getPostRequest(id).then(data=>{
    setPost(data);
    return console.log(post);
  })
  .catch(e=> console.log(e)) */

  
  


  return (
    <>
    {post?(
      <div className="row pt-5 justify-content-center">
        <Post post={post} />
        </div>
    ):(
      <h1 className="text-center">No se encontro el post</h1>
    )}
    </>
  )
}

export default ViewOnePost