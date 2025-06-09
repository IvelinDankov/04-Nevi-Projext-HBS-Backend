import { Router } from "express";
import shopService from "../services/shopService.js";
import { authGuard } from "../middlewares/authMiddleware.js";
import cartService from "../services/cartService.js";

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

  await shopService.delete(productId);

  res.redirect("/products/shop");
});
shopController.get("/shopping-card", async (req, res) => {
  const cartId = req.cookies.cartId;

  let cartItems = await cartService.getCart(cartId);

  const cart = cartItems.map((item) => ({
    name: item.product.title,
    price: item.product.price,
    imageUrl: item.product.imageUrl,
    quantity: item.quantity,
    totalPrice: item.quantity * item.product.price,
  }));

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  res.render("products/shopping-card", { cart, total });
});

shopController.post("/:productId/details", async (req, res) => {
  const productId = req.params.productId;

  const product = await shopService.getOne(productId);

  const cartId = req.cookies.cartId;
  let cartItem = await cartService.getOne(cartId, productId);

  if (cartItem) {
    const updatedQuantity = (cartItem.quantity += 1);

    await cartService.update(cartItem.id, updatedQuantity);
  } else {
    cartItem = await cartService.create(cartId, product);
  }
  res.redirect("/products/shopping-card");
});

export default shopController;
