const postRoutes = require("express").Router();

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
postRoutes.get("/post/:id", getPost);

//obtiene todos los post de un autor
postRoutes.get("/:autorId/posts", getAllPostsOfAutor);

//crea un nuevo post
postRoutes.post("/post", createPost);

//edita un post
postRoutes.put("/post", editPost);

//elimina un post
postRoutes.delete("/post", deletePost);

module.exports = postRoutes;
