const { Schema, model, Types } = require("mongoose");

const PostSchema = new Schema(
  {
    autor: { type: Types.ObjectId, Ref: "usuario" },
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
  },
  { timestamps: true }
);

const PostModel = model("post", PostSchema);

module.exports = PostModel;
