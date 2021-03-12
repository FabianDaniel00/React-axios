const addProduct = (app, connection) => {
  app.post("/products/add-product", (req, res) => {
    const { pName, pPrice, pDescription } = req.body;

    if (
      pName.length === 0 ||
      pName.length > 200 ||
      isNaN(pPrice) ||
      pPrice <= 0 ||
      pDescription.length === 0 ||
      pDescription.length > 500
    ) {
      return res.send("Insert: Wrong data or too long or empty data!");
    }

    const ADD_PRODUCT =
      "INSERT INTO products (p_name, p_price, p_description) VALUES (?, ?, ?)";

    connection.query(
      ADD_PRODUCT,
      [pName, pPrice, pDescription],
      (err, result) => {
        if (err) {
          console.log(
            "\x1b[31m",
            `Insert: Product name: ${pName}, ${err.message}`
          );
          return res.send(
            `Something went wrong during adding the product, name : ${pName}!`
          );
        } else if (!result.affectedRows) {
          console.log(
            "\x1b[31m",
            `Something went wrong during adding the product, name: ${pName}!`
          );
          return res.send(
            `Something went wrong during adding the product, name: ${pName}!`
          );
        } else {
          console.log(
            "\x1b[33m",
            `Inserted product ID: ${result.insertId}, name: ${pName}`
          );
          return res.send(`Successfully added product, name: ${pName}!`);
        }
      }
    );
  });
};

export default addProduct;
