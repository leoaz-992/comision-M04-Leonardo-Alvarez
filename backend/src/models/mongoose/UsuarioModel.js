const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 60,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 60,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 60,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  avatarURL: String,
});

const UsuarioModel = model("usuario", UsuarioSchema);

module.exports = UsuarioModel;
