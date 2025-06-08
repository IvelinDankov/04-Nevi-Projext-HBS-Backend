import { Router } from "express";
import shopService from "../services/shopService.js";
import { authGuard } from "../middlewares/authMiddleware.js";

const shopController = Router();

shopController.get("/shop", async (req, res) => {
  const products = await shopService.getAllProducts();

  res.render("products/shop", { products });
});

shopController.get("/create", authGuard, (req, res) => {
  res.render("products/create");
});
shopController.post("/create", authGuard, async (req, res) => {
  const productData = req.body;

  await shopService.create(productData);

  res.redirect("/shop");
});

shopController.get("/:productId/details", async (req, res) => {
  const productId = req.params.productId;

  const product = await shopService.getOne(productId);

  res.render("products/details", { product });
});

export default shopController;
