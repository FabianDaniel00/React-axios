const updateProduct = (app, connection) => {
  app.put("/products/update-product", (req, res) => {
    const { pName, pPrice, pDescription, pId } = req.body;

    if (
      pName.length === 0 ||
      pName.length > 200 ||
      isNaN(pPrice) ||
      pPrice <= 0 ||
      pDescription.length === 0 ||
      pDescription.length > 500 ||
      isNaN(pId) ||
      pId <= 0
    ) {
      return res.send("Update: Wrong data or too long or empty data!");
    }

    const UPDATE_PRODUCT =
      "UPDATE products SET p_name=?, p_price=?, p_description=? WHERE p_id=?";

    connection.query(
      UPDATE_PRODUCT,
      [pName, pPrice, pDescription, pId],
      (err, result) => {
        if (err) {
          console.log(
            "\x1b[31m",
            `Update: Product ID: ${pId}, name: ${pName}, ${err.message}`
          );
          return res.send(
            `Something went wrong during updating the product name: ${pName}!`
          );
        } else if (!result.changedRows) {
          console.log(
            "\x1b[31m",
            `Update: Product ID: ${pId}, name: ${pName}, ${result.message}`
          );
          return res.send(
            `Update: Product not found or no change name: ${pName}!`
          );
        } else {
          console.log(
            "\x1b[33m",
            `Update: Product ID: ${pId}, name: ${pName}, ${result.message}`
          );
          return res.send(`Successfully updated product name: ${pName}!`);
        }
      }
    );
  });
};

export default updateProduct;
