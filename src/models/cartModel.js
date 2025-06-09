import { Schema, model, Types } from "mongoose";

const cartSchema = new Schema({
  cartId: String,
  product: {
    type: Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
});

const Cart = model("Cart", cartSchema);

export default Cart;
