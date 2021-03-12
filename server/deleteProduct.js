const deleteProduct = (app, connection) => {
  app.delete("/products/delete-product", (req, res) => {
    const { pId, pName } = req.body;

    if (isNaN(pId) || pId <= 0) {
      return res.send("Delete: ID type!");
    }

    const DELETE_PRODUCT = "DELETE FROM products WHERE p_id = ?";

    connection.query(DELETE_PRODUCT, pId, (err, result) => {
      if (err) {
        console.log(
          "\x1b[31m",
          `Delete: Product ID: ${pId}, name: ${pName} ${err.message}`
        );
        return res.send(
          `Something went wrong during deleting the product, name: ${pName}!`
        );
      } else if (!result.affectedRows) {
        console.log(
          "\x1b[31m",
          `Delete: Product ID: ${pId}, name: ${pName} ${result.message}`
        );
        return res.send(`Delete: Product not found, name: ${pName}!`);
      } else {
        console.log(
          "\x1b[33m",
          `Delete: Product ID: ${pId}, name: ${pName} ${result.message}`
        );
        return res.send(`Successfully deleted product, name: ${pName}!`);
      }
    });
  });
};

export default deleteProduct;
