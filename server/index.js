import express from "express";
import cors from "cors";
import connection from "./db-config.js";
import bodyParser from "body-parser";

import getProducts from "./getProducts.js";
import addProduct from "./addProduct.js";
import updateProduct from "./updateProduct.js";
import deleteProduct from "./deleteProduct.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.connect((err) => {
  if (err) {
    console.log(err);
    return err;
  }
});

app.get("/", (req, res) => {
  return res.send("Hello from the Products API!");
});

getProducts(app, connection);

addProduct(app, connection);

updateProduct(app, connection);

deleteProduct(app, connection);

const port = 4000;
app.listen(
  port,
  console.log("\x1b[36m", `Products server listening on port ${port}`)
);
