import Post from '../components/PostCard';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePost } from "../context/postContext";

const Inicio = () => {
  const {postList, getPosts,getAllComments} = usePost();

  useEffect(()=>{
  getPosts();
  getAllComments()
  },[])


  postList.forEach(post => {
    post.createdAt = new Date(post.createdAt);
  });

// Ordena los objetos por fecha de creación
  postList.sort((a, b) => b.createdAt - a.createdAt);

  return (
      <>
      <h1 className='text-center'>Todas las publicaciones</h1>
      <div className='row my-2 '>
      {postList?.length===0?(
        <>
        <h2 className="text-center my-3">No hay publicaciones para mostrar.</h2>
        <Link className="btn btn-info btn-sm" to={"/crear-post"}>crea una publicacion</Link>
        </>
        
      ):( postList.map((post,i)=>(
        <div key={i} className='col-lg-6 px-3 py-2'>
        <Post post={post} />
        </div>
      )) )}
    </div>
    </>
  )
}

export default Inicio;