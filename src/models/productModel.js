import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imageOne: {
    type: String,
  },
  imageTwo: {
    type: String,
  },
  imageTreee: {
    type: String,
  },
  descripion: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  owner: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
});

const Product = model("Product", productSchema);

export default Product;
