import e, { Router } from "express";
import shopService from "../services/shopService.js";
import { authGuard, requiredAdmin } from "../middlewares/authMiddleware.js";
import cartService from "../services/cartService.js";
import { errorMsg } from "../utils/errorMessage.js";

function sizeController(size) {
  let options = [
    { value: "XXL", label: "Biger Size" },
    { value: "XL", label: "Big Size" },
    { value: "L", label: "Normal Size" },
    { value: "M", label: "Middle Size" },
    { value: "S", label: "Small Size" },
    { value: "XS", label: "Smaller Size" },
  ];

  const option = options.map((option) => ({
    ...option,
    value: option.value,
    selected: option.value === size ? "selected" : "",
  }));

  return option;
}

const shopController = Router();

shopController.get("/shop", async (req, res) => {
  const products = await shopService.getAllProducts();

  res.render("products/shop", { products });
});
shopController.post("/shop", async (req, res) => {});

shopController.get("/create", requiredAdmin, (req, res) => {
  const size = sizeController();

  res.render("products/create", { sizeOptions: sizeController(size) });
});
shopController.post("/create", requiredAdmin, async (req, res) => {
  const productData = req.body;
  const userId = req.user?.id;

  /* 
   <option value="xxl">xxl</option>
          <option value="xl">xl</option>
          <option value="l">l</option>
          <option value="m">m</option>
          <option value="s">s</option>
          <option value="xs">xs</option>
  */

  try {
    await shopService.create(userId, productData);

    res.redirect("/products/shop");
  } catch (err) {
    console.log(err.name);

    const error = errorMsg(err);
    res.render("products/create", { error, productData });
  }
});

shopController.get("/:productId/details", async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await shopService.getOne(productId);

    const cartId = req.cookies.cartId;
    const cart = await cartService.getOne(cartId, productId);

    let cartQuantity = cart?.quantity;

    res.render("products/details", { product, cartQuantity });
  } catch (err) {}
});
shopController.get("/:productId/edit", authGuard, async (req, res) => {
  const productId = req.params.productId;

  const product = await shopService.getOne(productId);

  let size = product.size;

  res.render("products/edit", { product, sizeOptions: sizeController(size) });
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
    id: item.id,
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
  res.redirect("/products/shop");
});

shopController.get("/:cartId/remove", async (req, res) => {
  const cartId = req.params.cartId;

  await cartService.remove(cartId);

  res.redirect("/products/shopping-card");
});

shopController.post("/update", async (req, res) => {
  const { productId, action } = req.body;
  const cartId = req.cookies.cartId;

  try {
    const cartItem = await cartService.getOne(cartId, productId);

    const product = await shopService.getOne(productId);

    if (!cartItem) {
      if (action === "increase") {
        await shopService.create(req.user?.id, product);
      }
    } else {
      if (action === "increase") {
        cartItem.quantity += 1;
      } else if (action === "decrease" && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else if (action === "decrease") {
        await cartService.delete(cartItem);
        return res.redirect(`/products/shop`);
      }
      await cartItem.save();
      res.redirect(`/products/${productId}/details`);
    }
  } catch (err) {
    const error = errorMsg(err);
    res.render("products/details", { error });
  }
});

export default shopController;
