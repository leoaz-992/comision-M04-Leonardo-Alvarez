import axios from "./axios.js";

export const getPostRequest = (postId) => axios.get(`/post/${postId}`);

export const getAllPostsRequest = async () => {
  try {
    const res = await axios.get(`/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllPostsOfAutorRequest = async (username) =>
  axios.get(`/${username}/posts`);

export const createPostRequest = (content) => {
  return axios.post(`/post`, content);
};

export const editPostRequest = (content) => axios.put(`/post`, content);

export const deletePostRequest = (id) => axios.delete(`/post`, id);
