import jwt from "jsonwebtoken";
import { SECRET } from "../utils/authUtils.js";

export const auth = (req, res, next) => {
  const token = req.cookies["auth"];

  if (!token) return next();

  try {
    const { email, id } = jwt.verify(token, SECRET);

    req.user = {
      id,
      email,
    };
    res.locals.user = {
      id,
      email,
    };

    next();
  } catch (err) {
    res.clearCookie("auth");
    res.redirect("/");
  }
};

export const authGuard = (req, res, next) => {
  if (!req.user) {
    new Error("You don't have permission!");
    res.redirect("/users/register");
  }
  next();
};

export const guard = (req, res, next) => {
  if (req.user) {
    return new Error("This is not allowed!");
  }

  next();
};
