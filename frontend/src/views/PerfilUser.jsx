import { useAuth } from "../context/authContext";
import { usePost } from "../context/postContext";
import PostPerfil from "../components/PostPerfil";
import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import CommentInPost from "../components/commentInPost"; 
import DeleteButtom from "../components/DeleteButtom";


function PerfilUser() {
  const { user } = useAuth();
  const {postList,comments, getPosts,getAllComments,deleteComment,deletePost} = usePost();

  useEffect(() => {
    getPosts();
    getAllComments();
  }, []);


  const sortedPosts = useMemo(() => {
    return [...postList].sort((a, b) => b.createdAt - a.createdAt);
  }, [postList]);

  let filteredPosts = useMemo(() => {
    return sortedPosts.filter(post => post.autorData._id === user?.id);
  }, [sortedPosts, user]);

  const filteredComments = useMemo(() => {
    return comments.filter(comm=> comm.autor._id === user?.id);
  }, [comments, user]);

  const deletePostid =async(postId)=>{
    const res= await deletePost(postId)
    if(res){
      alert(res.data.mensaje)
    }
  }

  return (
    <div className="row justify-content-evenly mt-3">
      <div className="col-7">
        <h2 className="text-center textTitle">Tus publicaciones</h2>
        <section className='mb-4'>
        {filteredPosts?.length===0?(
        <>
          <h3 className="text-center my-3">No hay publicaciones para mostrar.</h3>
          <Link className="btn btn-info btn-sm" to={"/crear-post"}>crea una publicacion</Link>
        </>
      ):( filteredPosts.map((post)=>(
        <PostPerfil post={post} deletePostid={deletePostid} key={post._id}/>
      )))}
        </section>
      </div>
      <div className="col-5 border-start">
        <h2 className="text-center textTitle">Tus comentarios</h2>
        {filteredComments && filteredComments.length === 0?("no hiciste comentarios."):(
              filteredComments.map((comment)=>(
                <div className="row align-items-center" key={comment._id}>
                  <div className="col-11">
                    <CommentInPost  comment={comment}/>
                  </div>
                  <div className="col-1">
                    <DeleteButtom idDelete={comment._id} deleteThis={deleteComment}/>
                  </div>
                </div>
              ))
            )}
      </div>
    </div>
  )
}

export default PerfilUser