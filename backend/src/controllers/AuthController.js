const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/mongoose/UsuarioModel.js");
const createAccessToken = require("../config/jwt.js");

const AutenticacionController = {};

const TOKEN_SECRET_KEY = process.env.JWT_SECRET_KEY;

AutenticacionController.registrarUsuario = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, avatarURL } =
      req.body;

    // verifica q el email no exista en la base de datos
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(409).json({
        message: "El email ya fue registrado con otro usuario.",
      });
    }
    //encripta la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    //crea un nuevo usuario
    const newUser = new User({
      firstName: firstname,
      lastName: lastname,
      userName: username,
      email: email,
      password: passwordHash,
      avatarURL: avatarURL,
    });
    //lo guarda en la base de datos
    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id,
      username: userSaved.userName,
    });
    //crea una coockie y guarda el token
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      message: "usuario registrado correctamente.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

AutenticacionController.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    //busca un usuario con el email
    const userFound = await User.findOne({ email });

    if (!userFound) {
      //respuesta en caso que no exista el email
      return res.status(401).json({
        message: "The email does not exist",
      });
    }
    //verifica la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      //respuesta en caso de que no coincida la conttraseña
      return res.status(401).json({
        message: "The password is incorrect",
      });
    }
    // crea un token
    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.userName,
    });
    //crea un coockie con el token
    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.userName,
      email: userFound.email,
      message: "usuario logueado exitosamente.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//verifica el token
AutenticacionController.verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET_KEY, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) {
      return res.sendStatus(401);
    }

    return res.json({
      id: userFound._id,
      username: userFound.userName,
      email: userFound.email,
    });
  });
};
//cierra sesiontoken
AutenticacionController.logout = async (req, res) => {
  res.cookie("token", "");
  return res.sendStatus(200);
};
module.exports = AutenticacionController;
