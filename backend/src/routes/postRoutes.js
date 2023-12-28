const postRoutes = require("express").Router();
const {
  validErrorManager,
  paramsValidator,
} = require("../middlewares/validation.middleware.js");
const {
  postFieldValidations,
  editPostFieldValidations,
  deletePostValidation,
} = require("../middlewares/post.middleware.js");
const auth = require("../middlewares/auth.middleware.js");

const {
  getAllPosts,
  getPost,
  getAllPostsOfAutor,
  createPost,
  editPost,
  deletePost,
} = require("../controllers/mongoose/PostsController.js");

//obtiene todo los post
postRoutes.get("/", getAllPosts);

//obtiene un post por su id
postRoutes.get("/post/:postId", paramsValidator, validErrorManager, getPost);

//obtiene todos los post de un autor
postRoutes.get(
  "/:username/posts",
  paramsValidator,
  validErrorManager,
  getAllPostsOfAutor
);

//crea un nuevo post
postRoutes.post(
  "/post",
  auth,
  postFieldValidations,
  validErrorManager,
  createPost
);

//edita un post
postRoutes.put(
  "/post",
  auth,
  editPostFieldValidations,
  validErrorManager,
  editPost
);

//elimina un post
postRoutes.delete(
  "/post/:postId",
  auth,
  deletePostValidation,
  validErrorManager,
  deletePost
);

module.exports = postRoutes;
