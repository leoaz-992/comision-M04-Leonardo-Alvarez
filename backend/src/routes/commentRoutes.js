const commentRoutes = require("express").Router();

const {
  getCommentsOfPost,
  getCommentsOfAutor,
  getComment,
  createComment,
  editComment,
  deleteComment,
} = require("./../controllers/mongoose/CommentsController.js");
//obtiene todos los comentarios de un post
commentRoutes.get("/post/:postId/comments", getCommentsOfPost);
//obtiene todos los comentarios de un autor
commentRoutes.get("/usuario/:autorId/comments", getCommentsOfAutor);
//Obtiene todos los comentarios
commentRoutes.get("/comments", getComment);
//crea un comentario
commentRoutes.post("/create-comment", createComment);
//edita un comentario
commentRoutes.put("/edit-comments", editComment);
//borra un comentario
commentRoutes.delete("/delete-comments", deleteComment);

module.exports = commentRoutes;
