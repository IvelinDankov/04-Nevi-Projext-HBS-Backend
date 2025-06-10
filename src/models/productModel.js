import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required, Please add a Title!"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image is required, Put an Image!"],
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
  description: {
    type: String,
    required: [true, "Some Description is required!"],
    minlength: [10, "Description min length is 10 characters!"],
  },
  size: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
    min: [0, "Must be positive number!"],
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
