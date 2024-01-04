import axios from "./axios.js";

export const getAllCommentsRequest = () => {
  return axios
    .get(`/all-comments`)
    .then((response) => response.data)
    .catch((error) => error.response.data.mensaje);
};

export const getAllCommentOfPostRequest = (postId) => {
  return axios
    .get(`/post/${postId}/comments`)
    .then((response) => response.data.result)
    .catch((error) => error.response.data.mensaje);
};

export const createCommentRequest = (content) => {
  return axios
    .post(`/create-comment`, content)
    .then((response) => response.data.mensaje)
    .catch((error) => error.response.data.mensaje);
};
export const editCommentRequest = async (content) => {
  try {
    const res = await axios.put(`/edit-comment`, content);
    return res.data.mensaje;
  } catch (error) {
    return error.response.data.mensaje;
  }
};

export const deleteCommentRequest = async (id) => {
  try {
    const res = await axios.delete(`/delete-comment`, { data: { id: id } });
    return res.data.mensaje;
  } catch (error) {
    return error.response.data;
  }
};
