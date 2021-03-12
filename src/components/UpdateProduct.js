import { useState } from "react";
import axios from "axios";
import { loadProducts } from "./GetProducts.js";
import host_port from "./apiConfig.js";

let fillUpdateForm = () => {};

const UpdateProduct = () => {
  const [pId, setPId] = useState(Number);
  const [pName, setPName] = useState(String);
  const [pOldName, setPOldName] = useState("[nothing selected]");
  const [pPrice, setPPrice] = useState(Number);
  const [pDescription, setPDescription] = useState(String);
  const [productLoading, setProductLoading] = useState(false);
  const [productMessage, setProductMessage] = useState(String);
  const [updateDisabled, setUpdateDisabled] = useState(true);

  const updateProduct = (event) => {
    event.preventDefault();
    setProductLoading(true);
    axios
      .put(`http://${host_port}/products/update-product`, {
        pId: pId,
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

  fillUpdateForm = (pId, pName, pPrice, pDescription) => {
    setPId(pId);
    setPName(pName);
    setPPrice(pPrice);
    setPDescription(pDescription);
    setPOldName(pName);
    setUpdateDisabled(false);
  };

  return (
    <form>
      <h1>Update product</h1>
      <label htmlFor="p_id">
        Product old name: <b>{pOldName}</b>
      </label>
      <br />
      <label htmlFor="p_name">Product name: </label>
      <input
        type="text"
        id="p_name"
        value={pName}
        onChange={(event) => setPName(event.target.value)}
        disabled={updateDisabled}
        required
      />
      <br />
      <label htmlFor="p_price">Product price: </label>
      <input
        type="number"
        min="0"
        id="p_price"
        value={pPrice}
        onChange={(event) => setPPrice(event.target.value)}
        disabled={updateDisabled}
        required
      />
      <br />
      <label htmlFor="p_description">Product description: </label>
      <textarea
        rows="4"
        cols="40"
        type="text"
        id="p_description"
        value={pDescription}
        onChange={(event) => setPDescription(event.target.value)}
        disabled={updateDisabled}
        required
      />
      <br />
      <br />
      <button
        style={{ display: "block", margin: "0 auto" }}
        onClick={(event) => updateProduct(event)}
      >
        Update Product
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

export { UpdateProduct, fillUpdateForm };
