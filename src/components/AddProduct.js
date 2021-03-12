import { useState } from "react";
import axios from "axios";
import { loadProducts } from "./GetProducts.js";

const AddProduct = () => {
  const [pName, setPName] = useState(String);
  const [pPrice, setPPrice] = useState(Number);
  const [pDescription, setPDescription] = useState(String);
  const [productLoading, setProductLoading] = useState(false);
  const [productMessage, setProductMessage] = useState(String);

  const addProduct = (event) => {
    event.preventDefault();
    setProductLoading(true);
    axios
      .post("http://localhost:4000/products/add-product", {
        pName: pName,
        pPrice: pPrice,
        pDescription: pDescription,
      })
      .then((response) => {
        loadProducts();
        setProductMessage(response.data);
        setProductLoading(false);
      })
      .catch((err) => {
        setProductMessage(err.message);
        setProductLoading(false);
      });
  };

  return (
    <form>
      <h1>Add product</h1>
      <label htmlFor="p_name">Product name: </label>
      <input
        type="text"
        id="p_name"
        onChange={(event) => setPName(event.target.value)}
        required
      />
      <br />
      <label htmlFor="p_price">Product price: </label>
      <input
        type="number"
        min="0"
        id="p_price"
        onChange={(event) => setPPrice(event.target.value)}
        required
      />
      <br />
      <label htmlFor="p_description">Product description: </label>
      <textarea
        rows="4"
        cols="40"
        type="text"
        id="p_description"
        onChange={(event) => setPDescription(event.target.value)}
        required
      />
      <br />
      <br />
      <button
        style={{ display: "block", margin: "0 auto" }}
        onClick={(event) => addProduct(event)}
      >
        Add Product
      </button>
      <br />
      {productLoading ? (
        <div style={{ textAlign: "center" }}>
          <i className="fa fa-spinner fa-spin" />
        </div>
      ) : (
        productMessage && (
          <span
            style={{
              textAlign: "center",
              padding: "10px 15px",
              border: "1px solid #000",
              borderRadius: "10px",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            {productMessage}
          </span>
        )
      )}
      <hr />
    </form>
  );
};

export default AddProduct;
