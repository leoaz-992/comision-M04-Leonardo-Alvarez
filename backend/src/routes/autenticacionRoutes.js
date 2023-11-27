const autenticacionRouter = require("express").Router();
const {
  loginUsuario,
  registrarUsuario,
  logout,
  verifyToken,
} = require("../controllers/AuthController.js");
//registra un usuario
autenticacionRouter.post("/registrar", registrarUsuario);
//login usuario
autenticacionRouter.post("/login", loginUsuario);

autenticacionRouter.get("/logout", logout);

autenticacionRouter.post("/verificar-token", verifyToken)

module.exports = autenticacionRouter;
