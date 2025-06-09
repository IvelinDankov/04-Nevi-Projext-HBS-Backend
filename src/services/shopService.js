import Product from "../models/productModel.js";

export default {
  getAllProducts() {
    return Product.find();
  },

  create(userId, data) {
    return Product.create({ ...data, owner: userId });
  },

  getOne(id) {
    return Product.findById(id);
  },

  update(id, data) {
    return Product.findByIdAndUpdate(id, data);
  },
  delete(id) {
    return Product.findByIdAndDelete(id);
  },
};
