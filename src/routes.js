import { Router } from "express";
import homeController from "./controllers/homeController.js";
import shopController from "./controllers/shopControlle.js";
import userController from "./controllers/userController.js";

const routes = Router();

routes.use(homeController);
routes.use(shopController);
routes.use(userController);
routes.use((req, res, next) => {
  res.status(404).send("Page Not found!");
});

export default routes;
