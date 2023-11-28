const userRoutes = require("express").Router();
const auth = require("../middlewares/auth.middleware.js");
const {
  editUser,
  editPasswordUser,
  deleteUser,
} = require("./../controllers/mongoose/UsuariosController.js");

// Editar password usuario
userRoutes.patch("/usuario",auth, editPasswordUser);
//edit usuario
userRoutes.put("/usuario",auth, editUser);
// Eliminar usuario
userRoutes.delete("/usuario",auth,deleteUser);

module.exports = userRoutes;
