import { v4 as uuidv4 } from "uuid";

export const shopCart = (req, res, next) => {
  if (!req.cookies.cartId) {
    res.cookie("cartId", uuidv4(), { httpOnly: true });
  }
  next();
};
