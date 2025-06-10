import jwt from "jsonwebtoken";
import { SECRET } from "../utils/authUtils.js";

export const auth = (req, res, next) => {
  const token = req.cookies["auth"];

  if (!token) return next();

  try {
    const { email, id, role } = jwt.verify(token, SECRET);

    req.user = {
      id,
      email,
      role,
    };
    res.locals.user = {
      id,
      email,
      role,
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

export const requiredAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }
  res.send("Access denied");
};
