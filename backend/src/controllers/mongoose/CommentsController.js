const CommentModel = require("../../models/mongoose/comentarioModel.js");

const CommentsController = {};

// Ver ListComments de un post
CommentsController.verCommentsPorPost = async (req, res) => {
  try {
    const postId = req.params.postId; // o como sea que obtengas el ID del autor
    const listaComments = await CommentModel.find({ post: postId });

    return res.json(listaComments);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno",
      error: error,
    });
  }
};

//ver Comments de un autor
CommentsController.verCommentsPorAutor = async (req, res) => {
  try {
    const autorId = req.params.autorId; // o como sea que obtengas el ID del autor
    const listaComments = await CommentModel.find({ autor: autorId });

    return res.json(listaComments);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno",
      error: error,
    });
  }
};

// Ver Comment
CommentsController.verComment = async (req, res) => {
  try {
    const { id } = req.params;

    const CommentEncontrado = await CommentModel.findById(id);

    return res.json(CommentEncontrado);
  } catch (error) {
    let mensaje = "Ocurrió un error interno al intentar obtener el Comment";

    if (error.kind === "ObjectId") {
      mensaje = "No se pudo obtener el Comment";
    }

    return res.status(500).json({
      mensaje: mensaje,
      error: error,
    });
  }
};

// Crear Comment
CommentsController.crearComment = async (req, res) => {
  try {
    const { description, post, autor } = req.body;

    const newComment = new CommentModel({
      post: post,
      description: description,
      autor: autor,
    });

    await newComment.save();

    return res.json({ mensaje: "Comment creado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar crear el Comment",
      error: error,
    });
  }
};

// Editar Comment
CommentsController.editarComment = async (req, res) => {
  try {
    const { id, description } = req.body;

    await CommentModel.findByIdAndUpdate(id, {
      description: description,
    });

    return res.json({ mensaje: "Comment actualizado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar editar el Comment",
      error: error,
    });
  }
};

// Eliminar Comment
CommentsController.eliminarComment = async (req, res) => {
  try {
    const { id } = req.body;

    await CommentModel.findByIdAndDelete(id);

    return res.json({ mensaje: "Comment eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar eliminar el Comment",
      error: error,
    });
  }
};

module.exports = CommentsController;
