import express from "express";
import routes from "./routes.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/authMiddleware.js";

const port = 5000;

const app = express();

mongoose.connect("mongodb://localhost:27017/", { dbName: "Nevi" });

app.use("/static", express.static("src/public"));

app.use(cookieParser());
app.use(express.urlencoded());
app.use(auth);

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(routes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
