const { Schema, model, Types } = require("mongoose");

const ComentarioSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 500,
    },
    post: { type: Types.ObjectId, Ref: "post", required: true },
    autor: { type: Types.ObjectId, Ref: "usuario", required: true },
  },
  { timestamps: true }
);

const ComentarioModel = model("comment", ComentarioSchema);

module.exports = ComentarioModel;
