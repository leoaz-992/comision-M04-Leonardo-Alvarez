import { createContext, useContext, useState } from "react";
import {createPostRequest,
getPostRequest,
getAllPostsOfAutorRequest,
getAllPostsRequest,
deletePostRequest,
editPostRequest} from "../api/post"

const PostContext = createContext();

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePost must be used within a PostProvider");
  return context;
};

export function PostProvider({ children }) {
  const [postList, setPostList] = useState([]);
  const [errorPost, setErrorPost]= useState([]);

  const getPosts = async () => {
    const resp = await getAllPostsRequest();
    setPostList(resp);
  };
  const getPostsOfAuthor = async () => {
    const resp = await getAllPostsOfAutorRequest;
    setPostList(resp.data);
  };

  
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

  const getPost = async (id) => {
   
  };

  const updatePost = async (id, post) => {
    
  };

  const deletePost = async (id) => {
    
  };


  return (
    <PostContext.Provider
      value={{
        postList,
        errorPost,
        getPosts,
        getPostsOfAuthor,
        deletePost,
        createPost,
        getPost,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}