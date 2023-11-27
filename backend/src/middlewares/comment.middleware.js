const { body } = require("express-validator");
const User = require("../models/mongoose/UsuarioModel.js");
const Post = require("../models/mongoose/postModel.js");
const Comment = require("../models/mongoose/comentarioModel.js");
const numberOfValidCharacters = {
  MIN: 3,
  DESCRIPTION_MAX: 500,
};

const commentFieldValidations = [
  body("autor")
    .isMongoId()
    .withMessage("no es un id valido.")
    .custom((value) => {
      return User.findById(value).then((user) => {
        if (!user) {
          return Promise.reject("El autor no existe.");
        }
      });
    }),
  body("post")
    .isMongoId()
    .withMessage("no es un id valido.")
    .custom((value) => {
      return Post.findById(value).then((user) => {
        if (!user) {
          return Promise.reject("El Post no existe.");
        }
      });
    }),
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Elcomentario no puede estar vacio.")
    .isLength({ min: numberOfValidCharacters.MIN })
    .withMessage(
      `EL comentario debe tener al menos ${numberOfValidCharacters.MIN} caracteres.`
    )
    .isLength({ max: numberOfValidCharacters.DESCRIPTION_MAX })
    .withMessage(
      `El comentario no puede tener mas de ${numberOfValidCharacters.DESCRIPTION_MAX} caracteres.`
    )
    .custom((value, { req }) => {
      return Comment.findOne({
        autor: req.body.autor,
        post: req.body.post,
        comment: value,
      }).then((post) => {
        if (post) {
          return Promise.reject("EL comentario del post ya existe.");
        }
      });
    }),
];

//valida al editar un comentario

module.exports = {
  commentFieldValidations,
};
