const getProducts = (app, connection) => {
  app.get("/products", (req, res) => {
    const GET_PRODUCTS = "SELECT * FROM products ORDER BY p_id DESC";

    connection.query(GET_PRODUCTS, (err, result) => {
      if (err) {
        console.log("\x1b[31m", err.message);
        return res.send("Something went wrong during loading the products!");
      } else {
        console.log(
          "\x1b[37m",
          `-Queried ${result.length} items from products.`
        );
        return res.send(result);
      }
    });
  });
};

export default getProducts;
