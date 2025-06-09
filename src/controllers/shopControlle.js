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
  const userId = req.user?.id;

  await shopService.create(userId, productData);

  res.redirect("/products/shop");
});

shopController.get("/:productId/details", async (req, res) => {
  const productId = req.params.productId;

  const product = await shopService.getOne(productId);

  res.render("products/details", { product });
});
shopController.get("/:productId/edit", authGuard, async (req, res) => {
  const productId = req.params.productId;

  const product = await shopService.getOne(productId);

  res.render("products/edit", { product });
});
shopController.post("/:productId/edit", authGuard, async (req, res) => {
  const productId = req.params.productId;

  const productData = req.body;

  await shopService.update(productId, productData);

  res.redirect(`/products/${productId}/details`);
});

shopController.get("/:productId/delete", async (req, res) => {
  const productId = req.params.productId;

  console.log(productId);

  await shopService.delete(productId);

  res.redirect("/products/shop");
});
shopController.get("/shopping-card", async (req, res) => {
  res.render("products/shopping-card");
});

shopController.post("/add-to-cart", async (req, rest) => {
  const productId = req.body;
  const product = await shopService.getOne(productId);
});

export default shopController;
