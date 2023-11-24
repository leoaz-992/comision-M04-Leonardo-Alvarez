const PostModel = require("../../models/mongoose/postModel.js");

const PostsController = {};

// Ver Listposts
PostsController.verPosts = async (req, res) => {
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

//ver posts de un autor
PostsController.verPostsPorAutor = async (req, res) => {
  try {
    const autorId = req.params.autorId; // o como sea que obtengas el ID del autor
    const listaPosts = await PostModel.find({ autor: autorId });

    return res.json(listaPosts);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno",
      error: error,
    });
  }
};

// Ver post
PostsController.verpost = async (req, res) => {
  try {
    const { id } = req.params;

    const postEncontrado = await PostModel.findById(id);

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
PostsController.crearPost = async (req, res) => {
  try {
    const { title, description, imageURL, autor } = req.body;

    const newPost = new PostModel({
      title: title,
      description: description,
      imageURL: imageURL,
      autor: autor,
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
PostsController.editarPost = async (req, res) => {
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
PostsController.eliminarPost = async (req, res) => {
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
