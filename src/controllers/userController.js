import { Router } from "express";
import userService from "../services/userService.js";
import { authGuard, guard } from "../middlewares/authMiddleware.js";

const userController = Router();

userController.get("/users/register", guard, (req, res) => {
  res.render("users/register");
});

userController.post("/users/register", guard, async (req, res) => {
  const userData = req.body;

  await userService.createUser(userData);

  const token = await userService.login(userData);

  // set cookie to token
  res.cookie("auth", token);

  res.redirect("/");
});
userController.get("/users/login", guard, (req, res) => {
  res.render("users/login");
});
userController.post("/users/login", guard, async (req, res) => {
  const userData = req.body;

  const token = await userService.login(userData);

  // set cookie to token
  res.cookie("auth", token);

  res.redirect("/shop");
});
userController.get("/users/logout", authGuard, async (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

export default userController;
