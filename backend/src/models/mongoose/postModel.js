const { Schema, model, Types } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 60,
    },
    description: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 500,
    },
    imageURL: String,
    autor: {
      type: Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
