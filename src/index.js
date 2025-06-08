import express from "express";
import routes from "./routes.js";
import handlebars from "express-handlebars";

const port = 5000;

const app = express();

app.use(express.static("public"));

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(routes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
