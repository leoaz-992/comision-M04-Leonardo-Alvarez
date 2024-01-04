import axios from "./axios.js";

export const getPostRequest = async (postId) => {
  try {
    const res = await axios.get(`/post/${postId}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const getAllPostsRequest = async () => {
  try {
    const res = await axios.get(`/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllPostsOfAutorRequest = async (username) => {
  try {
    const res = await axios.get(`/${username}/posts`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createPostRequest = async (content) => {
  try {
    const res = await axios.post(`/post`, content);
    return res;
  } catch (error) {
    return error;
  }
};

export const editPostRequest = (content) => axios.put(`/post`, content);

export const deletePostRequest = (id) => {
  return axios.delete(`/post/${id}`);
};
