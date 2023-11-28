const PostModel = require("../../models/mongoose/postModel.js");
const User = require("../../models/mongoose/UsuarioModel.js");

const PostsController = {};

// get Listposts
PostsController.getAllPosts = async (req, res) => {
  try {
    const listaPosts = await PostModel.find();

    return res.json(listaPosts);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno",
      error: error,
    });
  }
};

//obtener posts de un autor
PostsController.getAllPostsOfAutor = async (req, res) => {
  try {
    const userName = req.params.username;
    const userFind = await User.findOne({ userName: userName });
    const listaPosts = await PostModel.find({ autor: userFind._id });

    return res.json(listaPosts);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno",
      error: error,
    });
  }
};

// obtener post
PostsController.getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const postEncontrado = await PostModel.findById(postId);

    return res.json(postEncontrado);
  } catch (error) {
    let mensaje = "Ocurrió un error interno al intentar obtener el post";

    if (error.kind === "ObjectId") {
      mensaje = "No se pudo obtener el post";
    }

    return res.status(500).json({
      mensaje: mensaje,
      error: error,
    });
  }
};

// Crear Post
PostsController.createPost = async (req, res) => {
  try {
    const { title, description, imageURL, autor } = req.body;

    const newPost = new PostModel({
      autor: autor,
      title: title,
      description: description,
      imageURL: imageURL,
    });

    await newPost.save();

    return res.json({ mensaje: "Post creado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar crear el post",
      error: error,
    });
  }
};

// Editar Post
PostsController.editPost = async (req, res) => {
  try {
    const { id, title, description, imageURL } = req.body;

    await PostModel.findByIdAndUpdate(id, {
      title: title,
      description: description,
      imageURL: imageURL,
    });

    return res.json({ mensaje: "Post actualizado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar editar el Post",
      error: error,
    });
  }
};

// Eliminar Post
PostsController.deletePost = async (req, res) => {
  try {
    const { id } = req.body;

    await PostModel.findByIdAndDelete(id);

    return res.json({ mensaje: "Post eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar eliminar el Post",
      error: error,
    });
  }
};

module.exports = PostsController;
