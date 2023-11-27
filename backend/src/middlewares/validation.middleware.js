const { body, param, validationResult } = require("express-validator");

//validar login

const paramsValidator = [
  param("autorId").optional().isMongoId().withMessage("no es un id valido"),
  param("id").optional().isMongoId().withMessage("no es un id valido"),
  param("postId").optional().isMongoId().withMessage("no es un id valido"),
];

const validErrorManager = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores);
  }
  next();
};

module.exports = {
  paramsValidator,
  validErrorManager,
};
