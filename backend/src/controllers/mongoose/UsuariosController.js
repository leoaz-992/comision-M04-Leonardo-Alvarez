const UsuarioModel = require("./../../models/mongoose/UsuarioModel.js");

const UsuariosController = {};

// Ver usuarios
UsuariosController.getUsers = async (req, res) => {
  try {
    const listaUsuarios = await UsuarioModel.find();

    return res.json(listaUsuarios);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno",
      error: error,
    });
  }
};

// busca un usuario por su username
UsuariosController.getOneUser = async (req, res) => {
  try {
    const { username } = req.params;

    const usuarioEncontrado = await UsuarioModel.findOne({
      userName: username,
    });
    if (!usuarioEncontrado) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado.",
      });
    }

    return res.json(usuarioEncontrado);
  } catch (error) {
    let mensaje = "Ocurrió un error interno al intentar obtener el usuario";

    return res.status(500).json({
      mensaje: mensaje,
      error: error,
    });
  }
};

//busca un usuario por su id
UsuariosController.getOneUserforId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioEncontrado = await UsuarioModel.findById(id);

    return res.json(usuarioEncontrado);
  } catch (error) {
    let mensaje = "Ocurrió un error interno al intentar obtener el usuario";

    if (error.kind === "ObjectId") {
      mensaje = "No se pudo obtener el usuario";
    }

    return res.status(500).json({
      mensaje: mensaje,
      error: error,
    });
  }
};

// Crear usuario
UsuariosController.createUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, avatarURL } =
      req.body;

    const nuevoUsuario = new UsuarioModel({
      firstName: firstname,
      lastName: lastname,
      userName: username,
      email: email,
      password: password,
      avatarURL: avatarURL,
    });

    await nuevoUsuario.save();

    return res.json({ mensaje: "Usuario creado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar crear el usuario",
      error: error,
    });
  }
};

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
