const userRoutes = require("express").Router();
const {
  getUsers,
  getOneUser,
  getOneUserforId,
  editUser,
  editPasswordUser,
  deleteUser,
} = require("./../controllers/mongoose/UsuariosController.js");

// Ver usuarios
userRoutes.get("/usuarios", getUsers);

// Ver usuario
userRoutes.get("/usuario/:username", getOneUser);

userRoutes.get("/usuario/:id", getOneUserforId);

// Editar usuario
userRoutes.patch("/usuario", editPasswordUser);

userRoutes.put("/usuario", editUser);

// Eliminar usuario
userRoutes.delete("/usuario", deleteUser);

module.exports = userRoutes;
