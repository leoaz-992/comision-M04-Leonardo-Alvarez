import {useAuth} from "../context/authContext";
import Post from '../components/PostCard';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePost } from "../context/postContext";




const Inicio = () => {
  const { isAuthenticated, user } = useAuth();
  const {postList, getPosts } = usePost();

  useEffect(()=>{
  getPosts();
  },[])
 
  return (
      <>
      {isAuthenticated?(
        <strong className='text-secondary'>hola {user.username}</strong>
      ):("")}
      <h1 className='text-center'>Todas las publicaciones</h1>
      <div className='row my-2 '>
      {postList?.length===0?(
        <>
        <h2 className="text-center my-3">No hay publicaciones para mostrar.</h2>
        <Link className="btn btn-info btn-sm" to={"/crear-post"}>crea una publicacion</Link>
        </>
        
      ):( postList.map((post,i)=>(
        <Post post={post} key={i}/>
      )) )}
    </div>
    </>
  )
}

export default Inicio;