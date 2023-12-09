const { Schema, model, Types } = require("mongoose");

const ComentarioSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 500,
    },
    post: { type: Types.ObjectId, ref: "Post", required: true },
    autor: { type: Types.ObjectId, ref: "Usuario", required: true },
  },
  { timestamps: true }
);

const ComentarioModel = model("Comment", ComentarioSchema);

module.exports = ComentarioModel;
