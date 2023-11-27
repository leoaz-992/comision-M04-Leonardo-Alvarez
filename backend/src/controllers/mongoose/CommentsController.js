const CommentModel = require("../../models/mongoose/comentarioModel.js");

const CommentsController = {};

// get ListComments de un post
CommentsController.getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const listaComments = await CommentModel.find({ post: postId });

    return res.json(listaComments);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno",
      error: error,
    });
  }
};

//get Comments de un autor
CommentsController.getCommentsOfAutor = async (req, res) => {
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

// get Comment
CommentsController.getComment = async (req, res) => {
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
CommentsController.createComment = async (req, res) => {
  try {
    const { comment, post, autor } = req.body;

    const newComment = new CommentModel({
      post: post,
      comment: comment,
      autor: autor,
    });

    await newComment.save();

    return res.json({ mensaje: "comentario creado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar crear el comentario.",
      error: error,
    });
  }
};

// Editar Comment
CommentsController.editComment = async (req, res) => {
  try {
    const { id, comment } = req.body;

    await CommentModel.findByIdAndUpdate(id, {
      comment: comment,
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
CommentsController.deleteComment = async (req, res) => {
  try {
    const { id } = req.body;

    await CommentModel.findByIdAndDelete(id);

    return res.json({ mensaje: "Comment eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar eliminar el comentario.",
      error: error,
    });
  }
};

module.exports = CommentsController;
