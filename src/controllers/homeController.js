import { Router } from "express";

const homeController = Router();

homeController.get("/", (req, res) => {
  res.render("home");
});
homeController.get("/about", (req, res) => {
  res.render("about");
});
homeController.get("/contact", (req, res) => {
  res.render("contact");
});

export default homeController;
