const { body } = require("express-validator");
const User = require("../models/mongoose/UsuarioModel.js");
const Post = require("../models/mongoose/postModel.js");
const Comment = require("../models/mongoose/comentarioModel.js");
const numberOfValidCharacters = {
  MIN: 3,
  DESCRIPTION_MAX: 1500,
};

const commentFieldValidations = [
  body("autor")
    .isMongoId()
    .withMessage("el autor no es un id valido.")
    .bail()
    .custom((value) => {
      return User.findById(value).then((user) => {
        if (!user) {
          return Promise.reject("El autor no existe.");
        }
      });
    }),
  body("post")
    .isMongoId()
    .withMessage("El post no es un id valido.")
    .bail()
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
    .withMessage("El comentario no puede estar vacio.")
    .isLength({ min: numberOfValidCharacters.MIN })
    .withMessage(
      `EL comentario debe tener al menos ${numberOfValidCharacters.MIN} caracteres.`
    )
    .isLength({ max: numberOfValidCharacters.DESCRIPTION_MAX })
    .withMessage(
      `El comentario no puede tener mas de ${numberOfValidCharacters.DESCRIPTION_MAX} caracteres.`
    )
    .custom((value, { req }) => {
      const isValidObjectId = (id) => id.match(/^[0-9a-fA-F]{24}$/);
      if (isValidObjectId(req.body.autor) && isValidObjectId(req.body.post)) {
        return Comment.findOne({
          autor: req.body.autor,
          post: req.body.post,
          comment: value,
        }).then((post) => {
          if (post) {
            return Promise.reject("EL comentario del post ya existe.");
          }
        });
      } else {
        return;
      }
    }),
];

//valida al editar un comentario
const editcommentFieldValidations = [
  body("id")
    .isMongoId()
    .withMessage("no es un id valido.")
    .custom((value) => {
      return User.findById(value).then((user) => {
        if (!user) {
          return Promise.reject("No se encontro al autor.");
        }
      });
    }),
  body("comment")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("El comentario es obligatorio.")
    .isLength({ min: numberOfValidCharacters.MIN })
    .withMessage(
      `EL comentario debe tener al menos ${numberOfValidCharacters.MIN} caracteres.`
    )
    .isLength({ max: numberOfValidCharacters.DESCRIPTION_MAX })
    .withMessage(
      `El comentario no puede tener mas de ${numberOfValidCharacters.DESCRIPTION_MAX} caracteres.`
    )
    .custom((value, { req }) => {
      return Comment.findOne({ autor: req.body.autor, comment: value }).then(
        (post) => {
          if (post) {
            return Promise.reject("El comentario ya existe.");
          }
        }
      );
    }),
];

const deletecommentValidation = [
  body("id")
    .isMongoId()
    .withMessage("no existe el comentario.")
    .custom((value) => {
      return Comment.findById(value).then((comment) => {
        if (!comment) {
          return Promise.reject("No se encontro el comentario.");
        }
      });
    }),
];

module.exports = {
  commentFieldValidations,
  editcommentFieldValidations,
  deletecommentValidation,
};
