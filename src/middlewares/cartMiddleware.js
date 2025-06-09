import { v4 as uuidv4 } from "uuid";
import cartService from "../services/cartService.js";

export const shopCart = async (req, res, next) => {
  let cartId = req.cookies.cartId;
  if (!cartId) {
    res.cookie("cartId", uuidv4(), { httpOnly: true });
  }
  const items = await cartService.getAll();

  res.locals.cartItemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  next();
};
