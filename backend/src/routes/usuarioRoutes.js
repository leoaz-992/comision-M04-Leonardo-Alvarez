const usuarioRouter = require("express").Router();
const {
  getUsers,
  getOneUser,
  getOneUserforId,
  createUser,
  editUser,
  editPasswordUser,
  deleteUser,
} = require("./../controllers/mongoose/UsuariosController.js");

// Ver usuarios
usuarioRouter.get("/usuarios", getUsers);

// Ver usuario
usuarioRouter.get("/usuario/:username", getOneUser);

usuarioRouter.get("/usuario/:id", getOneUserforId);

// Crear usuario
usuarioRouter.post("/usuario", createUser);

// Editar usuario
usuarioRouter.patch("/usuario", editPasswordUser);

usuarioRouter.put("/usuario", editUser);

// Eliminar usuario
usuarioRouter.delete("/usuario", deleteUser);

module.exports = usuarioRouter;
