import { useState } from "react";
import axios from "axios";
import { loadProducts } from "./GetProducts.js";
import host_port from "./apiConfig.js";

const DeleteProduct = ({ pId, pName }) => {
  const [productLoading, setProductLoading] = useState(false);

  const deleteProduct = (event) => {
    event.preventDefault();
    let c = window.confirm(
      `Are you sure want to delete this product, name: ${pName}?`
    );

    if (c) {
      setProductLoading(true);
      axios
        .delete(`http://${host_port}/products/delete-product`, {
          data: { pId: pId, pName: pName },
        })
        .then((response) => {
          loadProducts();
          setProductLoading(false);
          alert(response.data);
        })
        .catch((err) => {
          setProductLoading(false);
          alert(err.message);
        });
    }
  };

  return (
    <button className="delete" onClick={(event) => deleteProduct(event)}>
      {productLoading ? <i className="fa fa-spinner fa-spin" /> : "Delete"}
    </button>
  );
};

export default DeleteProduct;
