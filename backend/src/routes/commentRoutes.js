const commentRoutes = require("express").Router();
const {
  paramsValidator,
  validErrorManager,
} = require("../middlewares/validation.middleware.js");
const {
  commentFieldValidations,
} = require("../middlewares/comment.middleware.js");
const auth = require("../middlewares/auth.middleware.js");
const {
  getCommentsOfPost,
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
//crea un comentario
commentRoutes.post(
  "/create-comment",auth,
  commentFieldValidations,
  validErrorManager,
  createComment
);
//edita un comentario
commentRoutes.put("/edit-comments",auth, editComment);
//borra un comentario
commentRoutes.delete("/delete-comments",auth, deleteComment);

module.exports = commentRoutes;
