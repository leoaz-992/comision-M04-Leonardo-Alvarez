import axios from "./axios.js";

export const getPostRequest = async (postId) => axios.get(`/post/${postId}/comments`);

export const getAllPostsRequest = async () => axios.get(`/`);
export const getAllPostsOfAutorRequest = async (username) => axios.get(`/${username}/posts`);

export const createPostRequest = async (content) => axios.post(`/post`, content);

export const editPostRequest = async (content) => axios.put(`/post`, content);

export const deletePostRequest = async (id) => axios.delete(`/post`,id);