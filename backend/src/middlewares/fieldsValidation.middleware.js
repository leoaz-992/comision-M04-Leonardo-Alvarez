const { body, validationResult } = require("express-validator");
const User = require("../models/mongoose/UsuarioModel.js");
const numeberValid = {
  MINIMO: 3,
  MAXIMO: 60,
  PASS_MIN: 6,
};
//valida los campos del modelo usuario
const userFieldValidations = [
  //fistname
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: numeberValid.MINIMO })
    .withMessage(
      `El nombre debe tener al menos ${numeberValid.MINIMO} caracteres.`
    )
    .isLength({ max: numeberValid.MAXIMO })
    .withMessage(
      `El nombre debe tener como maximo ${numeberValid.MAXIMO}  caracteres.`
    ),
  //lastname
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isLength({ min: numeberValid.MINIMO })
    .withMessage(
      `El apellido debe tener al menos ${numeberValid.MINIMO} caracteres.`
    )
    .isLength({ max: numeberValid.MAXIMO })
    .withMessage(
      `El apellido debe tener como maximo ${numeberValid.MAXIMO}  caracteres.`
    ),
  //username
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({ min: numeberValid.MINIMO })
    .withMessage(
      `El nombre debe tener al menos ${numeberValid.MINIMO} caracteres.`
    )
    .isLength({ max: numeberValid.MAXIMO })
    .withMessage(
      `El nombre de usuario debe tener como maximo ${numeberValid.MAXIMO}  caracteres.`
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
    .isLength({ min: numeberValid.PASS_MIN })
    .withMessage(
      `La contraseña debe tener como minimo ${numeberValid.PASS_MIN} caracteres.`
    ),
  //avatar url
  body("avatarURL")
    .trim()
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("invalid url"),
];

const validErrorManager = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores);
  }
  next();
};

module.exports = {
  userFieldValidations,
  validErrorManager,
};
