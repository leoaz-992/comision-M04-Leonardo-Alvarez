const { Schema, model } = require("mongoose");

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
      minLength: 3,
      maxLength: 500,
    },
    imageURL: String,
    autor: { type: Types.ObjectId, Ref: "usuario" },
  },
  { timestamps: true }
);

const PostModel = model("post", PostSchema);

module.exports = PostModel;
