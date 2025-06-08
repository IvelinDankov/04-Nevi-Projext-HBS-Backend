import { Schema, model } from "mongoose";

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
  price: {
    type: Number,
    required: true,
  },
});


const Product = model('Product', productSchema)

export default Product