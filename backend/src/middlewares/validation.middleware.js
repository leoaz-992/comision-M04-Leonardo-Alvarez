const { body, param, validationResult } = require("express-validator");
const User = require("../models/mongoose/UsuarioModel.js");

//validar login
const loginFieldValidations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("El email no es valido."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("la contraseña no puede estar vacia."),
];

const paramsValidator = [
  param("username")
    .optional()
    .custom(async (value) => {
      const user = await User.findOne({ userName: value });
      if (!user) {
        return Promise.reject("no existe el usuario");
      }
    }),
  param("postId").optional().isMongoId().withMessage("no es un id valido"),
];

const validErrorManager = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log(errores);
    return res
      .status(400)
      .json({ mensaje: errores.errors.map((error) => error.msg) });
  }
  next();
};

module.exports = {
  loginFieldValidations,
  paramsValidator,
  validErrorManager,
};
