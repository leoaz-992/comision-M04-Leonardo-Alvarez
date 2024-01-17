import { createContext, useContext, useState } from "react";
import {getPostRequest, createPostRequest,
getAllPostsOfAutorRequest,
getAllPostsRequest,
deletePostRequest,
editPostRequest} from "../api/post";
import { getAllCommentsRequest,
  getAllCommentOfPostRequest,
  createCommentRequest,
  deleteCommentRequest,
  editCommentRequest } from "../api/coment"

const PostContext = createContext();

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePost must be used within a PostProvider");
  return context;
};

// eslint-disable-next-line react/prop-types
export function PostProvider({ children }) {
  const [postList, setPostList]       = useState([]);
  const [post, setPost]               = useState({})
  const [errorPost, setErrorPost]     = useState([]);
  const [comments, setComments]       = useState([]);
  const [errorComment,setErrorComment]= useState([]);

  const getPosts = async () => {
    try {
      const resp = await getAllPostsRequest();
      setPostList(resp);
    } catch (error) {
      setErrorPost(error)
    }
  };

  const getPostsOfAuthor = async (username) => {
    try {
      const resp = await getAllPostsOfAutorRequest(username);
    setPostList(resp)
    } catch (error) {
      setErrorPost(error)
    }
    
  };

  const getOnePost =async(id)=>{
    try {
      const onePost = await getPostRequest(id);
      if(onePost.data){
        setPost(onePost.data);
      }
      return onePost.data
    } catch (error) {
      setErrorPost(error.response.data.mensaje)
    }
  }

  
  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post);
      return res;
    } catch (error) {
      console.log(error.response);
      setErrorPost(error.response.data.mensaje)
      return error.response.data.mensaje;
    }
  };


  const updatePost = async (postedit) => {
    try {
      const  resp = await editPostRequest(postedit)
      return resp
    } catch (error) {
      setErrorPost(error)
    }
  };

  const deletePost = async (id) => {
    try {
      const resp =await deletePostRequest(id)
      if(resp){
        const newListPost= postList.filter(post=>{
          return post._id !== id
        })
        setPostList(newListPost)
      }
      return resp
    } catch (error) {
      setErrorPost(error)
    }
  };

//!-----comments request-----


  const getAllComments=()=>{
    getAllCommentsRequest().then((response)=>setComments(response)).catch((error)=>setErrorComment(error))
  }

  const getCommentsOfPost=(postId)=>{
    getAllCommentOfPostRequest(postId).then((response)=>setComments(response)).catch((error)=>setErrorComment(error));
  }

  const createComment=async (content)=>{
    try{
      const res = await createCommentRequest(content);
      return res;
    } catch (error) {
      console.log(error.response);
      setErrorComment(error.response.data.mensaje)
      return error.response.data.mensaje;
    }
  }

  const editComment = async (content)=>{
    try {
     const res= await editCommentRequest(content)
     console.log(res)
    } catch (error) {
      setErrorComment(error)
    }
  }

  const deleteComment = async (id)=>{
    try {
     const res= await deleteCommentRequest(id)
     if(res){
       const listComments = comments.filter(comment=>{
         return comment._id !== id
       })
      setComments(listComments)
     }
    } catch (error) {
      setErrorComment(error)
    }
  }


  return (
    <PostContext.Provider
      value={{
        post,
        postList,
        errorPost,
        comments,
        errorComment,
        getOnePost,
        getPosts,
        getPostsOfAuthor,
        deletePost,
        createPost,
        updatePost,
        getAllComments,
        getCommentsOfPost,
        createComment,
        editComment,
        deleteComment
      }}
    >
      {children}
    </PostContext.Provider>
  );
}