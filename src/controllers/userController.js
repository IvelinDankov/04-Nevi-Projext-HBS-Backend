import { Router } from "express";

const userController = Router();

userController.get("/users/register", (req, res) => {
  res.render("users/register");
});
userController.get("/users/login", (req, res) => {
  res.render("users/login");
});

export default userController;
