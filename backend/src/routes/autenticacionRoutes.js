const autenticacionRouter = require("express").Router();
const { validErrorManager} = require("../middlewares/fieldsValidation.middleware.js");
const { userFieldValidations } = require("../middlewares/user.middleware.js");

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
//logout
autenticacionRouter.get("/logout", logout);

//verificar token
autenticacionRouter.post("/verificar-token", verifyToken);

module.exports = autenticacionRouter;
