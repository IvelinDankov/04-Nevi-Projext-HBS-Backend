import Cart from "../models/cartModel.js";

export default {
  getOne(cartId, productId) {
    return Cart.findOne({ cartId, product: productId });
  },
  getAll() {
    return Cart.find();
  },
  create(cartId, product) {
    return Cart.create({ cartId, product, quantity: 1 });
  },
  getCart(id) {
    return Cart.find({ cartId: id }).populate("product");
  },
  update(id, updatedQuantity) {
    return Cart.findByIdAndUpdate(id, { quantity: updatedQuantity });
  },
};
