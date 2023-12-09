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
  password: {
    type: String,
    required: true,
  },
  avatarURL: String,
});

const UsuarioModel = model("Usuario", UsuarioSchema);

module.exports = UsuarioModel;
