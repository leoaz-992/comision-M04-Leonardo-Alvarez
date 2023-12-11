import axios from "./axios.js";

export const getAllCommentOfPostRequest = async (postId) => {
  try {
    const res = await axios.get(`/post/${postId}/comments`);
    return res.data;
  } catch (error) {
    return error.response.data.mensaje;
  }
};

export const createCommentRequest = async (content) => {
  try {
    const res = await axios.post(`/create-comment`, content);
    return res.data.mensaje;
  } catch (error) {
    return error.response.data.mensaje;
  }
};
export const editCommentRequest = async (content) => {
  try {
    const res = await axios.put(`/edit-comment`, content);
    return res.data.mensaje;
  } catch (error) {
    return error.response.data.mensaje;
  }
};

export const deleteCommentRequest = (id) => axios.delete(`/delete-comment`, id);
