const UsuarioModel = require("./../../models/mongoose/UsuarioModel.js");

const UsuariosController = {};

// Editar usuario
UsuariosController.editUser = async (req, res) => {
  try {
    const { id, firstname, lastname, username, email, avatarURL } = req.body;

    await UsuarioModel.findByIdAndUpdate(id, {
      firstName: firstname,
      lastName: lastname,
      userName: username,
      email: email,
      avatarURL: avatarURL,
    });

    return res.json({ mensaje: "Usuario actualizado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar editar el usuario",
      error: error,
    });
  }
};

//editar contraseña
UsuariosController.editPasswordUser = async (req, res) => {
  try {
    const { id, password } = req.body;

    await UsuarioModel.findByIdAndUpdate(id, {
      password: password,
    });

    return res.json({ mensaje: "contraseña modificada con exito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar editar la contraseña",
      error: error,
    });
  }
};

// Eliminar usuario
UsuariosController.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    await UsuarioModel.findByIdAndDelete(id);

    return res.json({ mensaje: "Usuario eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar eliminar el usuario",
      error: error,
    });
  }
};

module.exports = UsuariosController;
