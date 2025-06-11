import express from "express";
import routes from "./routes.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/authMiddleware.js";
import { shopCart } from "./middlewares/cartMiddleware.js";

const port = 5000;

const app = express();

mongoose.connect("mongodb://localhost:27017/", { dbName: "Nevi" });

app.use("/static", express.static("src/public"));

app.use(cookieParser());
app.use(express.urlencoded());
app.use(auth);
app.use(shopCart);

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      totalItems: (shopCart) =>
        shopCart.reduce((sum, item) => sum + item.quantity, 0),
      eq: (a, b) => a === b,
      ifRole: (expectedRole, options) => {
        if (this.role === expectedRole) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      plus: function (add, value) {
        return value + add;
      },
      setMainImage: function (images) {
        return images.length > 0 ? images[0] : "";
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(routes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
