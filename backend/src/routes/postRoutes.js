const postRoutes = require("express").Router();
const {
  validErrorManager,

  paramsValidator,
} = require("../middlewares/validation.middleware.js");
const { postFieldValidations } = require("../middlewares/post.middleware.js");

const {
  getAllPosts,
  getPost,
  getAllPostsOfAutor,
  createPost,
  editPost,
  deletePost,
} = require("../controllers/mongoose/PostsController.js");
//obtiene todo los post
postRoutes.get("/posts", getAllPosts);

//obtiene un post por su id
postRoutes.get("/post/:id", paramsValidator, validErrorManager, getPost);

//obtiene todos los post de un autor
postRoutes.get(
  "/:autorId/posts",
  paramsValidator,
  validErrorManager,
  getAllPostsOfAutor
);

//crea un nuevo post
postRoutes.post("/post", postFieldValidations, validErrorManager, createPost);

//edita un post
postRoutes.put(
  "/post",
  /* falta validar el editar post */ validErrorManager,
  editPost
);

//elimina un post
postRoutes.delete("/post", deletePost);

module.exports = postRoutes;
