import {useAuth} from "../context/authContext";
import Post from '../components/PostCard';
import { useEffect, useState } from "react";
import {getAllPostsRequest} from "../api/post"
import { Link } from "react-router-dom";




const Inicio = () => {
  const { isAuthenticated, user } = useAuth();
  const[posts, setPosts] =useState([])

  
  useEffect(() => {
    getAllPostsRequest().then((res)=>{
    setPosts(res) 
    }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
      <>
      {isAuthenticated?(
        <strong className='text-secondary'>hola {user.username}</strong>
      ):("")}
      <h1 className='text-center'>Todas las publicaciones</h1>
      <div className='row g-3 my-2 '>
      {posts.length===0?(
        <>
        <h2 className="text-center my-3">No hay publicaciones para mostrar.</h2>
        <Link to={"/crear-post"}>crea una publicacion</Link>
        </>
        
      ):(posts.map((post,i)=>(
        <Post post={post} user={user} auth={isAuthenticated} key={i}/>
      )))}
    </div>
    </>
  )
}

export default Inicio;