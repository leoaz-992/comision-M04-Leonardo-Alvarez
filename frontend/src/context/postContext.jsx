import { createContext, useContext, useState } from "react";
import {
  createPostRequest,
  getAllPostsRequest,
  getAllPostsOfAutorRequest,
  getPostRequest,
  editPostRequest,
  deletePostRequest
} from "../api/post";

const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePosts must be used within a PostProvider");
  return context;
};
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [errrorPost,setErrorPost]=useState([]);

  const getPosts = async () => {
    const res = await getAllPostsRequest();
    setPosts(res.data);
  };

  const getPostsOfAutor = async (username) => {
    const res = await getAllPostsOfAutorRequest(username);
    setPosts(res.data);
  };

  const deletePost = async (id) => {
    try {
      const res = await deletePostRequest(id);
      if (res.status === 204) setPosts(posts.filter((Post) => Post._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (Post) => {
    try {
      const res = await createPostRequest(Post);
      return res.data;
    } catch (error) {
      console.log(error);
      setErrorPost(error)
    }
  };

  const getPost = async (id) => {
    try {
      const res = await getPostRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async (id, Post) => {
    try {
      await editPostRequest(id, Post);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        getPostsOfAutor,
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
