const { body } = require("express-validator");
const User = require("../models/mongoose/UsuarioModel.js");
const Post = require("../models/mongoose/postModel.js");

const numberOfValidCharacters = {
  MIN: 3,
  MAX: 60,
  DESCRIPTION_MAX: 500,
};

//valida los campoos al crear un post
const postFieldValidations = [
  body("autor")
    .isMongoId()
    .withMessage("no existe el autor.")
    .custom((value) => {
      return User.findById(value).then((user) => {
        if (!user) {
          return Promise.reject("El autor no existe.");
        }
      });
    }),
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El titulo del post es obligatorio.")
    .isLength({ min: numberOfValidCharacters.MIN })
    .withMessage("El titulo deb tener al menos 3 caracteres.")
    .isLength({ max: numberOfValidCharacters.MAX })
    .withMessage(
      `El titulo no puede tener mas de ${numberOfValidCharacters.MAX} caracteres.`
    )
    .custom((value, { req }) => {
      return Post.findOne({ autor: req.body.autor, title: value }).then(
        (post) => {
          if (post) {
            return Promise.reject(
              "Ya existe un post con ese titulo del mismo autor."
            );
          }
        }
      );
    }),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion del post es obligatorio.")
    .isLength({ min: numberOfValidCharacters.MIN })
    .withMessage(
      `EL post debe tener al menos ${numberOfValidCharacters.MIN} caracteres.`
    )
    .isLength({ max: numberOfValidCharacters.DESCRIPTION_MAX })
    .withMessage(
      `El post no puede tener mas de ${numberOfValidCharacters.DESCRIPTION_MAX} caracteres.`
    )
    .custom((value, { req }) => {
      return Post.findOne({ autor: req.body.autor, description: value }).then(
        (post) => {
          if (post) {
            return Promise.reject("La descripcion del post ya existe.");
          }
        }
      );
    }),
  body("imageURL")
    .trim()
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("invalid url"),
];

//valida al editar un post
const editPostFieldValidations = [
  body("title")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("El titulo del post es obligatorio.")
    .isLength({ min: numberOfValidCharacters.MIN })
    .withMessage("El titulo deb tener al menos 3 caracteres.")
    .isLength({ max: numberOfValidCharacters.MAX })
    .withMessage(
      `El titulo no puede tener mas de ${numberOfValidCharacters.MAX} caracteres.`
    )
    .custom((value, { req }) => {
      return Post.findOne({ autor: req.body.autor, title: value }).then(
        (post) => {
          if (post) {
            return Promise.reject(
              "Ya existe un post con ese titulo del mismo autor."
            );
          }
        }
      );
    }),
  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("La descripcion del post es obligatorio.")
    .isLength({ min: numberOfValidCharacters.MIN })
    .withMessage(
      `EL post debe tener al menos ${numberOfValidCharacters.MIN} caracteres.`
    )
    .isLength({ max: numberOfValidCharacters.DESCRIPTION_MAX })
    .withMessage(
      `El post no puede tener mas de ${numberOfValidCharacters.DESCRIPTION_MAX} caracteres.`
    )
    .custom((value, { req }) => {
      return Post.findOne({ autor: req.body.autor, description: value }).then(
        (post) => {
          if (post) {
            return Promise.reject("La descripcion del post ya existe.");
          }
        }
      );
    }),
  body("imageURL")
    .trim()
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("invalid url"),
];

const deletePostValidation = [
  body("id")
    .isMongoId()
    .withMessage("no existe el post.")
    .custom((value) => {
      return Post.findById(value).then((post) => {
        if (!post) {
          return Promise.reject("No se encontro el post.");
        }
      });
    }),
];

module.exports = {
  postFieldValidations,
  editPostFieldValidations,
  deletePostValidation,
};
