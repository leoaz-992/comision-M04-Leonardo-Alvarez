import {useAuth} from "../context/authContext";
import { usePosts } from '../context/postContext';
import Post from '../components/PostCard';
import { useEffect } from "react";



const Inicio = () => {
  const { isAuthenticated, user } = useAuth();
  const {getPosts, posts}= usePosts();

  
  useEffect(() => {
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
      <>
      {isAuthenticated?(
        <strong className='text-secondary'>hola {user.username}</strong>
      ):("")}
      <h1 className='text-center'>Todas las publicaciones</h1>
      <div className='row g-3 my-2 '>
      {posts.map((post,i)=>(
        <Post post={post} key={i}/>
      ))}
    </div>
    </>
  )
}

export default Inicio;