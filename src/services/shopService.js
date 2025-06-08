import Product from "../models/productModel.js";

export default {
  getAllProducts() {
    return Product.find();
  },

  create(data) {
    return Product.create(data);
  },

  getOne(id) {
    return Product.findById(id);
  },
};
