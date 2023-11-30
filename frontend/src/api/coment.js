import axios from "./axios.js";

export const getAllCommentOfPost = async (user,postId) => axios.get(`/post/${postId}/comments`, user);

export const createComment = async (content) => {
  try {
    const res = await axios.post(`/create-comment`, content);
    return res.data.mensaje;
  } catch (error) {
    return error.response.data.mensaje
  }
}
export const editComment = async (content) => axios.put(`/edit-comment`, content);

export const deleteComment = async (id) => axios.delete(`/delete-comment`,id);

