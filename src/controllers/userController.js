import { Router } from "express";
import userService from "../services/userService.js";
import { authGuard, guard } from "../middlewares/authMiddleware.js";
import { errorMsg } from "../utils/errorMessage.js";

const userController = Router();

userController.get("/users/register", guard, (req, res) => {
  res.render("users/register");
});

userController.post("/users/register", guard, async (req, res) => {
  const { email, password, rePass } = req.body;

  try {
    if (password !== rePass) {
      throw new Error("Password mismatch!");
    }
    await userService.createUser(email, password, rePass);

    const token = await userService.login(email, password);

    // set cookie to token
    res.cookie("auth", token);
    res.redirect("/products/shop");
  } catch (err) {
    const error = errorMsg(err);
    res.render("users/register", { email, error });
  }
});
userController.get("/users/login", guard, (req, res) => {
  res.render("users/login");
});
userController.post("/users/login", guard, async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Email and Password are required!");
    }

    const token = await userService.login(email, password);

    // set cookie to token
    res.cookie("auth", token);

    res.redirect("/products/shop");
  } catch (err) {
    const error = errorMsg(err);

    res.render("users/login", { email, error });
  }
});
userController.get("/users/logout", authGuard, async (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

export default userController;
