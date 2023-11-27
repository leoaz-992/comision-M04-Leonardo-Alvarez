const { body } = require("express-validator");
const User = require("../models/mongoose/UsuarioModel.js");

const numberOfValidCharacters = {
  MIN: 3,
  MAX: 60,
  PASS_MIN: 6,
};
//valida los campos al crear usuario
const userFieldValidations = [
  //fistname
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: numberOfValidCharacters.MIN })
    .withMessage(
      `El nombre debe tener al menos ${numberOfValidCharacters.MIN} caracteres.`
    )
    .isLength({ max: numberOfValidCharacters.MAX })
    .withMessage(
      `El nombre debe tener como MAX ${numberOfValidCharacters.MAX}  caracteres.`
    ),
  //lastname
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isLength({ min: numberOfValidCharacters.MIN })
    .withMessage(
      `El apellido debe tener al menos ${numberOfValidCharacters.MIN} caracteres.`
    )
    .isLength({ max: numberOfValidCharacters.MAX })
    .withMessage(
      `El apellido debe tener como MAX ${numberOfValidCharacters.MAX}  caracteres.`
    ),
  //username
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({ min: numberOfValidCharacters.MIN })
    .withMessage(
      `El nombre debe tener al menos ${numberOfValidCharacters.MIN} caracteres.`
    )
    .isLength({ max: numberOfValidCharacters.MAX })
    .withMessage(
      `El nombre de usuario debe tener como MAX ${numberOfValidCharacters.MAX}  caracteres.`
    )
    .custom((value) => {
      return User.findOne({ userName: value }).then((user) => {
        if (user) {
          return Promise.reject("el nombre de usuario ya esta en uso");
        }
      });
    }),
  //email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("El email no es valido.")
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("el email ya esta en uso");
        }
      });
    }),
  //password
  body("password")
    .trim()
    .notEmpty()
    .withMessage("la contraseña no puede estar vacia.")
    .isLength({ min: numberOfValidCharacters.PASS_MIN })
    .withMessage(
      `La contraseña debe tener como MIN ${numberOfValidCharacters.PASS_MIN} caracteres.`
    ),
  //avatar url
  body("avatarURL")
    .trim()
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("invalid url"),
];

//valida los campos al editar usuario

//valida al cambiar la conraseña de un usuario

module.exports = {
  userFieldValidations,
};
