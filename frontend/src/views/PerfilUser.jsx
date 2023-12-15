import { usePost } from "../context/postContext";
import {useAuth} from "../context/authContext";
import Post from '../components/PostCard';
import { Link } from "react-router-dom";
import { useEffect } from "react";

function PerfilUser() {

  const {postList, getPosts,getAllComments} = usePost();
  const { user } = useAuth();

  useEffect(()=>{
    getPosts();
    getAllComments()
    },[])

  let filteredPosts = postList.filter(post => post.autorData._id === user.id);

  return (
    <div className="row justify-content-evenly mt-3">
      <div className="col-7">
        <h2 className="text-center">Tus publicaciones</h2>
        <div>
        {filteredPosts?.length===0?(
        <>
        <h2 className="text-center my-3">No hay publicaciones para mostrar.</h2>
        <Link className="btn btn-info btn-sm" to={"/crear-post"}>crea una publicacion</Link>
        </>
        
      ):( filteredPosts.map((post,i)=>(

        <Post post={post} key={i}/>
      )) )}
        </div>
      </div>
      <div className="col-5 border-start">
        <h2 className="text-center">Tus comentarios</h2>
      </div>
    </div>
  )
}

export default PerfilUser