const commentRoutes = require("express").Router();
const {
  paramsValidator,
  validErrorManager,
} = require("../middlewares/validation.middleware.js");
const {
  commentFieldValidations,
} = require("../middlewares/comment.middleware.js");

const {
  getCommentsOfPost,
  getCommentsOfAutor,
  getComment,
  createComment,
  editComment,
  deleteComment,
} = require("./../controllers/mongoose/CommentsController.js");

//obtiene todos los comentarios de un post
commentRoutes.get(
  "/post/:postId/comments",
  paramsValidator,
  validErrorManager,
  getCommentsOfPost
);
//obtiene todos los comentarios de un autor
commentRoutes.get(
  "/usuario/:autorId/comments",
  paramsValidator,
  validErrorManager,
  getCommentsOfAutor
);
//Obtiene todos los comentarios
commentRoutes.get("/comments", getComment);
//crea un comentario
commentRoutes.post(
  "/create-comment",
  commentFieldValidations,
  validErrorManager,
  createComment
);
//edita un comentario
commentRoutes.put("/edit-comments", editComment);
//borra un comentario
commentRoutes.delete("/delete-comments", deleteComment);

module.exports = commentRoutes;
