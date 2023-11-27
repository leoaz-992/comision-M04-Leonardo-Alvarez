const autenticacionRouter = require("express").Router();
const {
  validErrorManager,
  userFieldValidations,
} = require("../middlewares/fieldsValidation.middleware.js");

const {
  loginUsuario,
  registrarUsuario,
  logout,
  verifyToken,
} = require("../controllers/AuthController.js");
//registra un usuario
autenticacionRouter.post(
  "/registrar",
  userFieldValidations,
  validErrorManager,
  registrarUsuario
);
//login usuario
autenticacionRouter.post("/login", loginUsuario);

autenticacionRouter.get("/logout", logout);

autenticacionRouter.post("/verificar-token", verifyToken);

module.exports = autenticacionRouter;
